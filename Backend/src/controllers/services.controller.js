import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Configure Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use the correct model

// Store conversation history in memory
let conversationHistory = [];

// Helper function to preprocess user prompts
const preprocessPrompt = (prompt) => {
  prompt = prompt.trim();
  if (!prompt.endsWith("?")) {
    prompt += "?";
  }
  return prompt;
};

// Helper function to filter AI responses and make them concise
const filterResponse = (responseText) => {
  return responseText.trim().replace(/\*\*/g, "").replace(/\*/g, "");
};

// Function to summarize older history if it gets too long
const summarizeHistory = (history) => {
  if (history.length > 10) {
    const summarized =
      "Summary of earlier discussion: " + history.slice(0, -10).join(" ");
    return [summarized].concat(history.slice(-10));
  }
  return history;
};

// Detect user's emotion (stub function, replace with actual logic if needed)
const detectEmotion = (text) => {
  // You can integrate a real emotion detection model here.
  // For now, we'll assume the emotion is neutral.
  const emotion = "normal"; // Replace with actual emotion detection logic
  return emotion;
};

// Function to get Gemini response with context
const getGeminiResponse = async (question, emotion) => {
  try {
    // Add the user's question to the history
    conversationHistory.push(`User: ${question}`);

    // Summarize older history if needed
    conversationHistory = summarizeHistory(conversationHistory);

    // Build the context from the conversation history
    const context = conversationHistory.join("\n");

    // Adjust the prompt to focus on debate and conciseness
    const prompt = `Let's debate. The response should be short and precise. Respond with direct counter-argument. Do not add words related to prompts. Make it look like a person's own response. Respond based on user's emotion and currently user's emotion is ${emotion}. So converse in that way. Remove keywords like AI and user and just make it sound like human. Do not make ans too big. Should be mid-sized.
    Here is the conversation so far:\n${context}\n
    User: ${question}\n
    AI:`;

    console.log("Context sent to Gemini:", context); // Log context for debugging

    // Generate the response using Gemini API
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    // Debugging: Log the response data
    console.log("Response from Gemini API:", result);

    // Check if the response contains valid content
    if (
      !result ||
      !result.contents ||
      !result.contents[0].parts ||
      !result.contents[0].parts[0].text
    ) {
      throw new Error("Invalid response from Gemini API");
    }

    const rawResponse = result.contents[0].parts[0].text;
    console.log("Raw Response:", rawResponse); // Log the raw response for debugging

    // Filter and return the response
    const aiResponse = filterResponse(rawResponse);

    // Add the AI's response to the history
    conversationHistory.push(`AI: ${aiResponse}`);

    return aiResponse;
  } catch (error) {
    console.error("Error during Gemini response generation:", error);
    return `Sorry, I couldn't generate a response at the moment on this statement. Please try again with something else. Error: ${error.message}`;
  }
};

// Debate service to handle transcribed text and send it to Gemini API for response
const debateService = asyncHandler(async (req, res) => {
  const { transcription } = req.body;

  if (!transcription) {
    return res.status(400).json({
      success: false,
      message: "No transcription provided",
    });
  }

  try {
    // Detect emotion from the transcription
    const userEmotion = detectEmotion(transcription);

    // Get AI response
    const aiResponse = await getGeminiResponse(transcription, userEmotion);

    // Send the transcription and AI response back to the client
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { transcription, reply: aiResponse },
          "Debate response generated successfully"
        )
      );
  } catch (error) {
    console.error("Error during transcription processing:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process the transcription",
      errors: error.message || "Unknown error",
    });
  }
});

export { debateService };
