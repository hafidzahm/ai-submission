require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const express = require("express");
const database = require("./src/db");
const {
  promptLibraryAssistant,
  extractText,
  handleGeminiResponse,
  handleHistoryChat,
} = require("./src/helper");
const app = express();
const port = 3000;
const GEMINI_URI = process.env.GEMINI_URI;
const ai = new GoogleGenAI({ apiKey: GEMINI_URI });
const stringDb = database;
const prompt = promptLibraryAssistant(stringDb);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  return res.status(200).json({ message: "Hello World!" });
});
app.post("/api/chat", async (req, res) => {
  try {
    const { messageRequestFromClient, history } = await req.body;
    if (!messageRequestFromClient) {
      return res
        .status(400)
        .json({ message: "messageRequestFromClient required" });
    }

    const historyFromUser = await handleHistoryChat(history);

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: historyFromUser || [],
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // AI time allocation for unlimited thinking
        },
        systemInstruction: prompt,
        responseMimeType: "application/json",
      },
    });

    const response = await chat.sendMessage({
      message: messageRequestFromClient,
    }); // multimodal chat configuration

    const parsedResponse = await handleGeminiResponse(response);

    return res.status(200).json({ response: parsedResponse });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: error });
  }
});

app.listen(port, () => {
  console.log(`AI Chatbot app listening on port ${port}`);
});
