const HF_TOKEN = import.meta.env.VITE_HF_TOKEN || "";
const MODEL_ID = "Linaqruf/animagine-xl-3.1"; 

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const generateImage = async (params, retryCount = 0) => {
  // If no token, we can't do real generation, but we should let the UI know why
  if (!HF_TOKEN) {
    throw new Error("NEURAL_LINK_MISSING: Hugging Face API token is not configured in environment variables.");
  }

  const { prompt, negative_prompt, width, height, guidance_scale = 7 } = params;

  // Animagine XL 3.1 specific quality tags
  const qualityTags = "masterpiece, best quality, highres, ultra-detailed, 8k wallpaper";
  const enhancedPrompt = `${prompt}, ${qualityTags}`;
  const enhancedNegative = `${negative_prompt || ""}, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${MODEL_ID}`,
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
          "x-wait-for-model": "true"
        },
        method: "POST",
        body: JSON.stringify({
          inputs: enhancedPrompt,
          parameters: {
            negative_prompt: enhancedNegative,
            width: parseInt(width),
            height: parseInt(height),
            guidance_scale: parseFloat(guidance_scale),
            num_inference_steps: 28, // Optimized for speed/quality balance
          },
        }),
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (response.status === 503 || response.status === 429) {
      const errorData = await response.json().catch(() => ({}));
      // If model is loading, retry after estimated time
      if (errorData.estimated_time && retryCount < 3) {
        const waitTime = Math.min(errorData.estimated_time * 1000, 10000);
        console.log(`Model loading, waiting ${waitTime}ms...`);
        await sleep(waitTime);
        return generateImage(params, retryCount + 1);
      }
      throw new Error(`FORGE_BUSY: The neural forge is currently over capacity (${response.status}).`);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `FORGE_ERROR: API Error ${response.status}`);
    }

    const blob = await response.blob();
    if (blob.type.startsWith('application/json')) {
        // Sometimes HF returns JSON even with 200 OK if there's a specific internal error
        const text = await blob.text();
        const json = JSON.parse(text);
        throw new Error(json.error || "FORGE_UNSTABLE: Received invalid response from neural engine.");
    }

    return URL.createObjectURL(blob);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error("FORGE_TIMEOUT: Neural synthesis took too long. Try a simpler prompt.");
    }
    console.error("AI Generation Error:", error);
    throw error;
  }
};

export const PROMPT_SUGGESTIONS = [
  "1girl, cyber ronin, techwear, neon city background, rainy night, katana, glowing eyes",
  "mecha suit, gundam style, space station, cinematic lighting, detailed mechanical parts",
  "fantasy priestess, crystal forest, magical particles, soft lighting, ethereal atmosphere",
  "samurai, traditional armor, cherry blossoms, sunset, ukiyo-e style influence",
  "cyberpunk street, holographic advertisements, futuristic vehicles, high contrast",
  "dark knight, gothic castle, moonlit sky, red eyes, detailed armor, cape blowing in wind"
];

export const SAFETY_FILTER = (prompt) => {
  const bannedKeywords = ["nsfw", "naked", "nude", "gore", "explicit", "porn", "hentai", "sex"];
  const lowerPrompt = prompt.toLowerCase();
  return bannedKeywords.some(keyword => lowerPrompt.includes(keyword));
};
