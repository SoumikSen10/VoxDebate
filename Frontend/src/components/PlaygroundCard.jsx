import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { FaMicrophoneAlt, FaStop, FaTimes } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import WavEncoder from "wav-encoder"; // Import wav-encoder library

const PlaygroundCard = () => {
  const [response, setResponse] = useState(""); // To store the backend response
  const [isRecording, setIsRecording] = useState(false); // Track recording status
  const [audioBlob, setAudioBlob] = useState(null); // Store the recorded audio blob
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef(null);
  const theme = useSelector((state) => state.theme.theme);

  const startRecording = () => {
    if (isRecording) return;

    setIsRecording(true);
    setError("");

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm",
        }); // Default type
        mediaRecorderRef.current = mediaRecorder;

        const chunks = [];
        mediaRecorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const webmBlob = new Blob(chunks, { type: "audio/webm" });
          setAudioBlob(webmBlob);
          console.log("Audio Blob:", webmBlob); // Debugging
        };

        mediaRecorder.start();
      })
      .catch((err) => {
        console.error("Error accessing microphone:", err);
        setError("Unable to access microphone. Please check permissions.");
        setIsRecording(false);
      });
  };

  const stopRecording = () => {
    if (!isRecording || !mediaRecorderRef.current) return;

    setIsRecording(false);
    mediaRecorderRef.current.stop();
  };

  const cancelRecording = () => {
    if (!isRecording) return;

    stopRecording();
    setAudioBlob(null);
    setError("");
    console.log("Recording canceled");
  };

  const convertWebMToWav = async (webmBlob) => {
    const arrayBuffer = await webmBlob.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Convert the decoded audio data to WAV format using wav-encoder
    const wavData = await WavEncoder.encode({
      sampleRate: audioBuffer.sampleRate,
      channelData: [audioBuffer.getChannelData(0)], // Mono audio
    });

    return new Blob([wavData], { type: "audio/wav" });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError("");

    if (!audioBlob) {
      setError("Please record audio before submitting.");
      return;
    }

    try {
      const wavBlob = await convertWebMToWav(audioBlob); // Convert to WAV

      const formData = new FormData();
      formData.append("audio", wavBlob, "recorded-audio.wav");

      const res = await fetch("http://localhost:8000/api/v1/services/debate", {
        method: "POST",
        body: formData,
        credentials: "include", // Sends cookies with the request
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      setResponse(
        data.data.transcription ||
          "Response received, but no message available."
      );
      console.log("Backend Response:", data); // Debugging
    } catch (err) {
      console.error("Error submitting audio:", err);
      setError("Failed to submit audio. Please try again later.");
    }
  };

  return (
    <div
      className={`w-full max-w-[600px] space-y-6 p-10 rounded-lg shadow-lg mx-auto transition-all duration-300 ease-in-out ${
        theme === "dark" ? "bg-[#2a1a3e]" : "bg-[#f7f7f7]"
      }`}
    >
      <h1 className="text-3xl font-semibold text-center text-orange-500 mb-6">
        Ready to clone your voice?
      </h1>

      <form onSubmit={handleUpload} className="space-y-6">
        <div className="flex flex-col space-y-4">
          <Label htmlFor="message" className="text-sm mb-2 text-gray-600">
            Record your voice and send it to the server
          </Label>
          <div className="flex items-center space-x-4">
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
            {isRecording && (
              <Button
                type="button"
                onClick={cancelRecording}
                className="bg-red-500 text-white rounded-full p-4 hover:bg-red-600 transition-all duration-300 ease-in-out"
              >
                <FaTimes className="w-6 h-6" />
              </Button>
            )}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-semibold transition-all duration-300 ease-in-out"
        >
          Send
        </Button>
      </form>

      <div className="mt-6 p-4 bg-[#eea047] rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">User :</h3>
        <textarea
          readOnly
          value={response}
          className="w-full h-20 p-4 bg-[#eea047] rounded-lg border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
        />
      </div>

      <div className="mt-6 p-4 bg-[#eea047] rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Response:</h3>
        <textarea
          readOnly
          value="Coming soon..."
          className="w-full h-20 p-4 bg-[#eea047] rounded-lg border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
        />
      </div>

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
