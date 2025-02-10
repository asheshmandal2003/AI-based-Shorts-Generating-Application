import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Write a script to generate a 30-second video on the topic: Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with image Prompt and Content text as field",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "scene": 1,\n    "image_prompt": "A photorealistic ancient Egyptian papyrus scroll unfurled, showing hieroglyphs depicting a stylized cat. Soft, diffused light. Background: sandstone walls of a tomb. Depth of field.",\n    "content_text": "(0-3 seconds) **Narrator:**  Ever heard of a cat saving a kingdom? In Ancient Egypt, they weren\'t just pets, they were revered."\n  },\n  {\n    "scene": 2,\n    "image_prompt": "Photorealistic depiction of the Battle of Pelusium (525 BC) as it might have appeared from the Egyptian side.  Persian soldiers (with beards and tunics) charging towards the Egyptian lines. Attached to the Persian soldiers\' shields are highly visible, scared cats. Egyptian soldiers look hesitant and fearful. A chaotic battlefield with dust and sand. Bright, harsh sunlight.",\n    "content_text": "(3-8 seconds) **Narrator:**  The Battle of Pelusium in 525 BC saw the Persian King Cambyses II use a bizarre tactic: cats."\n  },\n  {\n    "scene": 3,\n    "image_prompt": "Ultra realistic close-up of an Egyptian soldier\'s face, showing fear and hesitation.  He is holding a spear loosely. In the out-of-focus background, Persian soldiers are advancing, some with cats clearly visible on their shields. The Egyptian soldier has dark hair, a sun-tanned face, and wears linen clothing. Depth of field.",\n    "content_text": "(8-13 seconds) **Narrator:** The Egyptians, religiously devoted to cats, couldn\'t bring themselves to harm the animals on the Persian shields."\n  },\n  {\n    "scene": 4,\n    "image_prompt": "Photorealistic bird\'s-eye view of the Battle of Pelusium, showing the Persian army advancing and the Egyptian army in disarray, some soldiers dropping their weapons. Many cats are visible on the shields of the Persian warriors. Wide view. Dust and smoke fill the air. Bright daylight.",\n    "content_text": "(13-18 seconds) **Narrator:** Faced with the prospect of harming a feline, they surrendered rather than fight."\n  },\n  {\n    "scene": 5,\n    "image_prompt": "Photorealistic image of King Cambyses II, looking arrogant and triumphant, seated on an Egyptian throne after the battle. He is wearing Persian royal attire, but also holds a small, well-groomed cat in his lap. The throne room is grand but slightly damaged from the battle. Soft, dramatic lighting.",\n    "content_text": "(18-23 seconds) **Narrator:**  Cambyses II exploited this religious devotion, securing victory and control of Egypt."\n  },\n  {\n    "scene": 6,\n    "image_prompt": "Photorealistic close-up shot of a modern domesticated Egyptian Mau cat, looking directly at the camera. The cat has striking green eyes and a spotted coat. The background is blurred. The lighting is soft and flattering.",\n    "content_text": "(23-28 seconds) **Narrator:** So, a cat, revered and weaponized, changed the course of history."\n  },\n  {\n    "scene": 7,\n    "image_prompt": "A photorealistic image of an open history book laying on a table in a library. The book is open to a page that tells the story of the Battle of Pelusium and the Persian cats. The camera focuses on the book\'s pages, with the library in the background being slightly blurred. The lighting is warm and inviting.",\n    "content_text": "(28-30 seconds) **Narrator:**  Remember, even the smallest creatures can play a big role.  (Text on screen: Subscribe for more history!)"\n  }\n]\n```\n',
        },
      ],
    },
  ],
});
