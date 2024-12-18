import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { FaMicrophoneAlt, FaStop } from "react-icons/fa"; // Importing the microphone and stop icons
import { Label } from "@/components/ui/label";

const PlaygroundCard = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(""); // To store the response from the app
  const [isRecording, setIsRecording] = useState(false); // Track recording status
  const [audioBlob, setAudioBlob] = useState(null); // Store the recorded audio blob

  // Get current theme from Redux
  const theme = useSelector((state) => state.theme.theme);

  let mediaRecorder;
  let audioChunks = [];

  // Start recording
  const startRecording = () => {
    if (isRecording) return;

    setIsRecording(true);
    audioChunks = [];

    // Get user media (audio)
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);

        // Push audio data to the chunks array as it is recorded
        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        // When recording stops, create a blob from the audio data
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          setAudioBlob(audioBlob);
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioFile(audioUrl); // Set the audio file URL
        };

        mediaRecorder.start();
      })
      .catch((err) => {
        console.error("Error accessing microphone:", err);
      });
  };

  // Stop recording
  const stopRecording = () => {
    if (!isRecording) return;

    setIsRecording(false);
    mediaRecorder.stop();
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!audioFile && !message) {
      alert("Please enter a message or select an audio file!");
      return;
    }

    const formData = new FormData();
    if (audioFile) formData.append("audio", audioFile);
    if (message) formData.append("message", message);

    // Simulate an API call to process the input and get a response
    // Example response for now
    setResponse("This is the response from the app based on your input!");
  };

  return (
    <div
      className={`w-full max-w-[600px] space-y-6 p-10 rounded-lg shadow-lg mx-auto transition-all duration-300 ease-in-out ${
        theme === "dark" ? "bg-[#2a1a3e]" : "bg-[#f7f7f7]" // Light/dark background based on theme
      }`}
    >
      {/* Title */}
      <h1 className="text-3xl font-semibold text-center text-orange-500 mb-6">
        Ready to clone your voice?
      </h1>

      {/* Form */}
      <form onSubmit={handleUpload} className="space-y-6">
        {/* Message Input */}
        <div className="flex flex-col space-y-4">
          <Label htmlFor="message" className="text-sm mb-2 text-gray-600">
            Upload audio file or send a message
          </Label>
          <div className="flex items-center space-x-4">
            {/* Microphone Icon (Record Audio Button) */}
            <Button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className="bg-[#4e3b8e] text-white rounded-full p-4 hover:bg-[#6a4fbb] transition-all duration-300 ease-in-out"
            >
              {isRecording ? (
                <FaStop className="w-6 h-6" />
              ) : (
                <FaMicrophoneAlt className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-semibold transition-all duration-300 ease-in-out"
        >
          Send
        </Button>
      </form>

      {/* Response Area (Text Area always visible) */}
      <div className="mt-6 p-4 bg-[#eea047] rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Response:</h3>
        <textarea
          readOnly
          value={response}
          className="w-full h-20 p-4 bg-[#eea047] rounded-lg border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
        />
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-500 mt-6">
        By uploading, you agree to our{" "}
        <span className="underline text-blue-500 cursor-pointer">
          Terms and Conditions
        </span>
        .
      </p>
    </div>
  );
};

export default PlaygroundCard;
