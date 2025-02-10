const { TextToSpeechClient } = require("@google-cloud/text-to-speech");

export const client = new TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});
