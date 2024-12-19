import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

// Debate service to handle audio file upload and send it to FastAPI for transcription
const debateService = asyncHandler(async (req, res) => {
  console.log(req.file); // Debugging line to check if the file is being uploaded

  const audioPath = req.file?.path;

  if (!audioPath) {
    return res.status(400).json({
      success: false,
      message: "No audio file uploaded",
    });
  }

  try {
    const formData = new FormData();
    formData.append("audio", fs.createReadStream(audioPath));

    // Send audio to FastAPI for transcription
    const response = await axios.post(
      "http://localhost:5000/transcribe", // FastAPI server URL
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    // Assuming the FastAPI server returns the transcription result in the response
    const transcription = response.data; // Adjust based on the actual response structure from FastAPI

    // Send the transcription result back to the client
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          transcription,
          "Debate Response from app successful"
        )
      );
  } catch (error) {
    console.error("Error during transcription:", error);

    // Send a structured error response if transcription fails
    const errorMessage =
      error.response?.data || error.message || "Unknown error";

    return res.status(500).json({
      success: false,
      message: "Failed to transcribe audio",
      errors: errorMessage,
    });
  } finally {
    // Clean up uploaded file only if it exists
    if (audioPath && fs.existsSync(audioPath)) {
      fs.unlinkSync(audioPath);
    }
  }
});

export { debateService };
