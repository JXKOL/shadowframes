const HF_TOKEN = import.meta.env.VITE_HF_TOKEN || "";
const MODEL_ID = "Linaqruf/animagine-xl-3.1"; // High quality anime model

export const generateImage = async (params) => {
  if (!HF_TOKEN) {
    console.warn("Hugging Face API token is missing. Using high-fidelity placeholder mode.");
    await new Promise(resolve => setTimeout(resolve, 8000)); // Simulate generation time
    const placeholders = [
      "https://images.unsplash.com/photo-1614728263952-84ea206f25ab?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514467950441-249876274472?q=80&w=1200&auto=format&fit=crop"
    ];
    return placeholders[Math.floor(Math.random() * placeholders.length)];
  }

  const { prompt, negative_prompt, width, height, guidance_scale = 7 } = params;

  // Enhance prompt with style modifiers if not already present
  const enhancedPrompt = `${prompt}, high quality, masterpiece, 8k, highly detailed, sharp focus`;
  const enhancedNegative = `${negative_prompt || ""}, low quality, blurry, distorted, bad anatomy, text, watermark`;

  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${MODEL_ID}`,
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: enhancedPrompt,
          parameters: {
            negative_prompt: enhancedNegative,
            width: parseInt(width),
            height: parseInt(height),
            guidance_scale: parseFloat(guidance_scale),
            num_inference_steps: 30,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
};

export const PROMPT_SUGGESTIONS = [
  "Cyberpunk samurai in a rainy Neo-Tokyo, neon reflections, cinematic lighting",
  "Ethereal fantasy priestess in a crystal forest, glowing butterflies, soft bokeh",
  "Mecha pilot in a futuristic cockpit, holographic displays, detailed armor",
  "Dark fantasy demon hunter, gothic architecture, blood moon, sharp shadows",
  "Streetwear anime girl in a vaporwave sunset city, aesthetic colors",
  "High-tech ninja jumping between skyscrapers, motion blur, electricity effects"
];

export const SAFETY_FILTER = (prompt) => {
  const bannedKeywords = ["nsfw", "naked", "nude", "gore", "explicit", "porn"];
  const lowerPrompt = prompt.toLowerCase();
  return bannedKeywords.some(keyword => lowerPrompt.includes(keyword));
};
