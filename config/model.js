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
          text: "Write a script to generate a 30-second video on the topic: Interesting historical story along with AI image prompt in Realistic format for each scene and give the result in JSON format with image_prompt, content_text, and timestamp  as fields",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "timestamp": "0:00-0:03",\n    "image_prompt": "A hyperrealistic oil painting of a bustling street in ancient Alexandria, Egypt, around 300 BC. The Great Library is visible in the background, its facade grand and imposing. Scholars debate and read scrolls in the foreground, while merchants sell their wares. Golden light illuminates the scene, casting long shadows. Ultra detailed, 8k resolution.",\n    "content_text": "Imagine ancient Alexandria, home to the Great Library, a beacon of knowledge attracting scholars from across the globe."\n  },\n  {\n    "timestamp": "0:03-0:06",\n    "image_prompt": "A photorealistic digital painting of a Greek scholar, Apollonius of Rhodes, meticulously copying a rare manuscript scroll by candlelight in the Great Library of Alexandria. His face is illuminated by the warm glow, showing intense concentration. Bookshelves filled with scrolls stretch into the background. Realistic textures, dramatic lighting, 8k resolution.",\n    "content_text": "Here, Apollonius of Rhodes, later head librarian, meticulously preserved ancient texts."\n  },\n  {\n    "timestamp": "0:06-0:09",\n    "image_prompt": "A realistic recreation, using modern archaeological findings, of the interior of the Great Library. Showing rows and rows of papyrus scrolls neatly organized in their containers, alongside writing desks. The scene is lit by natural light coming through high windows. Ultra-detailed, clean and pristine, 8k resolution.",\n    "content_text": "Think of the sheer volume of knowledge contained within those walls, a repository of human understanding."\n  },\n  {\n    "timestamp": "0:09-0:12",\n    "image_prompt": "A dramatic, photorealistic painting of a fire breaking out within the Great Library. Scholars and workers frantically try to put out the flames, chaos ensues. Thick smoke billows through the halls. Deep shadows and intense colors create a sense of urgency and destruction. 8k resolution.",\n    "content_text": "Tragically, the library faced devastating fires, slowly eroding its invaluable collection."\n  },\n  {\n    "timestamp": "0:12-0:15",\n    "image_prompt": "A hyperrealistic close-up of a charred papyrus scroll fragment. The text is barely legible, but hints of ancient Greek writings can still be discerned. Ash and soot cover the surface. Macro photography, highly detailed texture, 8k resolution.",\n    "content_text": "Imagine the countless works lost forever, only fragments remaining as a reminder of what once was."\n  },\n  {\n    "timestamp": "0:15-0:18",\n    "image_prompt": "A photorealistic depiction of Julius Caesar ordering a fire to be set near ships, with the accidental spread to nearby areas of Alexandria depicted. Soldiers are visible, while smoke rises and flames spread near the harbor, hinting at the Library\'s doom. 8k resolution.",\n    "content_text": "Though the exact details are debated, some attribute its destruction to accidental fires during times of conflict, potentially started by Caesar\'s forces."\n  },\n    {\n    "timestamp": "0:18-0:21",\n    "image_prompt": "A realistic, solemn scene depicting a small group of late-era scholars sitting amongst the ruins of a library hall, possibly associated with the Serapeum. They discuss the surviving fragments, aware of the vast amount of lost knowledge. 8k resolution, photorealistic painting.",\n    "content_text": "Even after its main destruction, remnants of the Library and its related institutions continued to exist, but in a diminished state..."\n  },\n  {\n    "timestamp": "0:21-0:24",\n    "image_prompt": "A realistic painting depicting the burning of a library in Alexandria during Roman or early Christian unrest, perhaps the Serapeum itself. Mob violence is visible in the background. Dark and smoky atmosphere. 8k resolution, dramatic lighting.",\n    "content_text": "...until further destruction by fires during religious and political upheavals extinguished its last flames."\n  },\n  {\n    "timestamp": "0:24-0:27",\n    "image_prompt": "A photorealistic rendering of archaeologists working on a modern dig site in Alexandria, uncovering fragments of ancient pottery and possibly even remnants of scrolls. Intense sunlight and dusty environment. High detail, 8k resolution.",\n    "content_text": "Today, archaeologists continue to search for clues, hoping to piece together the story of this lost wonder."\n  },\n  {\n    "timestamp": "0:27-0:30",\n    "image_prompt": "A digital artwork depicting a glowing, ethereal representation of the Great Library rising from the ruins, superimposed over a modern cityscape of Alexandria. A symbol of knowledge and learning triumphing over destruction. Hopeful and inspiring tone. 8k resolution.",\n    "content_text": "The legacy of the Great Library lives on, reminding us of the enduring power and importance of knowledge."\n  }\n]\n```\n',
        },
      ],
    },
  ],
});
