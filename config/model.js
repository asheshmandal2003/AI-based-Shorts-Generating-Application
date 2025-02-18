// This file contains the model configuration and the chat session
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load the API key from the environment variables
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Load the generative model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

// Define the generation configuration
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Start a chat session with the model
export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Write a script to generate a 60-second video on the topic: Travel in Italy, focusing on tourism, vacation, and Italy. The video should have an Realistic style. For each scene, provide an AI image prompt and content text. Return the result in JSON format with the following fields: image_prompt, content_text and timestamp",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "image_prompt": "A panoramic view of the Amalfi Coast, Italy, at sunset. Dramatic cliffs, colorful houses clinging to the hillside, and the sparkling Tyrrhenian Sea. Warm, golden light. Realistic style, detailed textures, vibrant colors.",\n    "content_text": "Italy. A land of history, art, and breathtaking beauty. Your dream vacation awaits.",\n    "timestamp": "0:00"\n  },\n  {\n    "image_prompt": "Close-up of a steaming plate of pasta carbonara in a rustic Italian trattoria. Focus on the creamy sauce, crispy guanciale, and perfectly cooked pasta. Soft, natural lighting. Realistic style, emphasizing texture and detail.",\n    "content_text": "Indulge in the flavors of Italy. From pasta perfection to regional delicacies, every meal is a celebration.",\n    "timestamp": "0:05"\n  },\n  {\n    "image_prompt": "The Colosseum in Rome, Italy, during the daytime. Tourists milling about, taking pictures. Blue sky with fluffy white clouds. Realistic style, capturing the grandeur and scale of the ancient amphitheater.",\n    "content_text": "Explore ancient ruins and iconic landmarks that whisper tales of empires past.",\n    "timestamp": "0:10"\n  },\n  {\n    "image_prompt": "A gondola gliding through a canal in Venice, Italy. Focus on the reflection of the colorful buildings in the water. Gondolier wearing a striped shirt and hat. Soft, romantic lighting. Realistic style, emphasizing atmosphere and detail.",\n    "content_text": "Lose yourself in the romance of Venice, a city unlike any other.",\n    "timestamp": "0:15"\n  },\n  {\n    "image_prompt": "The Leaning Tower of Pisa, Italy, with tourists posing for humorous photos. Bright sunny day. Realistic style, capturing the iconic tilt and the playful atmosphere.",\n    "content_text": "Discover the whimsical charm of Pisa and capture unforgettable moments.",\n    "timestamp": "0:20"\n  },\n  {\n    "image_prompt": "Rolling hills of Tuscany, Italy, covered in vineyards and olive groves. A cypress-lined road winding through the landscape. Golden hour lighting. Realistic style, emphasizing the natural beauty and tranquility of the countryside.",\n    "content_text": "Escape to the serene beauty of Tuscany, where vineyards meet rolling hills.",\n    "timestamp": "0:25"\n  },\n  {\n    "image_prompt": "Michelangelo\'s David statue in Florence, Italy. Close-up on the detail of the sculpture. Soft, museum-like lighting. Realistic style, capturing the artistic mastery and detail.",\n    "content_text": "Witness masterpieces of art and architecture that have inspired generations.",\n    "timestamp": "0:30"\n  },\n  {\n    "image_prompt": "A vibrant street market in Naples, Italy. Bustling with activity, vendors selling fresh produce, seafood, and local crafts. Focus on the colors and the energy of the scene. Realistic style, emphasizing the authenticity and vibrancy of Italian culture.",\n    "content_text": "Immerse yourself in the vibrant culture and local life of Italy\'s bustling cities.",\n    "timestamp": "0:35"\n  },\n  {\n    "image_prompt": "A gelato shop in Rome, Italy. Wide variety of colorful gelato flavors on display. People enjoying their gelato in the sunshine. Realistic style, emphasizing the textures and colors of the gelato.",\n    "content_text": "Treat yourself to the sweet delights of Italian gelato.",\n    "timestamp": "0:40"\n  },\n  {\n    "image_prompt": "The Trevi Fountain in Rome, Italy, at night. Illuminated with dramatic lighting. Tourists throwing coins into the fountain. Realistic style, capturing the magic and beauty of the scene.",\n    "content_text": "Make a wish at the Trevi Fountain and let the magic of Italy captivate you.",\n    "timestamp": "0:45"\n  },\n  {\n    "image_prompt": "A picturesque coastal town in Cinque Terre, Italy. Colorful houses stacked on the cliffs overlooking the Ligurian Sea. Bright blue sky and clear water. Realistic style, emphasizing the charm and beauty of the coastline.",\n    "content_text": "Discover the charming coastal villages of Cinque Terre, a true Italian gem.",\n    "timestamp": "0:50"\n  },\n  {\n    "image_prompt": "A map of Italy highlighting major tourist destinations like Rome, Venice, Florence, Tuscany, and the Amalfi Coast. Style similar to a vintage travel poster.",\n    "content_text": "Plan your Italian adventure today. Visit Italy. Your dream vacation awaits.",\n    "timestamp": "0:55"\n  }\n]\n```',
        },
      ],
    },
  ],
});
