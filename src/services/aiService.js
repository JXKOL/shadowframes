const HF_TOKEN = import.meta.env.VITE_HF_TOKEN || "";
const MODEL_ID = "Linaqruf/animagine-xl-3.1"; 

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const generateImage = async (params, retryCount = 0) => {
  const { prompt, negative_prompt, width, height, guidance_scale = 7 } = params;

  // Fallback to Pollinations AI if no HF Token is provided (Free, No Token Required)
  if (!HF_TOKEN) {
    console.info("Hugging Face token missing. Engaging Pollinations Neural Bridge...");
    
    // Construct Pollinations URL with anime modifiers
    const encodedPrompt = encodeURIComponent(`${prompt}, masterpiece, best quality, highres, anime style`);
    const seed = Math.floor(Math.random() * 1000000);
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true`;
    
    // Simulate a bit of "processing" for the UI feel, then return the URL
    await sleep(3000); 
    return pollinationsUrl;
  }

  // Real Hugging Face Logic
  const qualityTags = "masterpiece, best quality, highres, ultra-detailed, 8k wallpaper";
  const enhancedPrompt = `${prompt}, ${qualityTags}`;
  const enhancedNegative = `${negative_prompt || ""}, lowres, bad anatomy, bad hands, text, error, blurry`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

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
            num_inference_steps: 28,
          },
        }),
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (response.status === 503 || response.status === 429) {
      const errorData = await response.json().catch(() => ({}));
      if (errorData.estimated_time && retryCount < 2) {
        const waitTime = Math.min(errorData.estimated_time * 1000, 5000);
        await sleep(waitTime);
        return generateImage(params, retryCount + 1);
      }
      throw new Error(`FORGE_BUSY: Model is currently loading.`);
    }

    if (!response.ok) {
      throw new Error(`FORGE_ERROR: API status ${response.status}`);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') throw new Error("FORGE_TIMEOUT");
    throw error;
  }
};

export const PROMPT_SUGGESTIONS = [
  "1girl, cyber ronin, techwear, neon city, katana",
  "mecha suit, gundam style, space station, cinematic",
  "fantasy priestess, crystal forest, magical, ethereal",
  "samurai, traditional armor, cherry blossoms, sunset",
  "cyberpunk street, holographic ads, futuristic",
  "dark knight, gothic castle, moonlit sky, red eyes"
];

export const SAFETY_FILTER = (prompt) => {
  const bannedKeywords = ["nsfw", "naked", "nude", "gore", "porn", "hentai", "sex"];
  const lowerPrompt = prompt.toLowerCase();
  return bannedKeywords.some(keyword => lowerPrompt.includes(keyword));
};
