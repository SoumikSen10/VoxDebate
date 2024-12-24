import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaMicrophoneAlt, FaStop, FaPaperPlane } from "react-icons/fa";
import WavEncoder from "wav-encoder";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"; // Import motion from framer-motion

const PlaygroundCard = () => {
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [liveTranscription, setLiveTranscription] = useState("");
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef(null);
  const speechRecognitionRef = useRef(null);
  const theme = useSelector((state) => state.theme.theme);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo(
      0,
      chatContainerRef.current.scrollHeight
    );
  }, [messages]);

  const startRecording = () => {
    if (isRecording) return;

    setIsRecording(true);
    setError("");
    setLiveTranscription("");

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm",
        });
        mediaRecorderRef.current = mediaRecorder;

        const chunks = [];
        mediaRecorder.ondataavailable = (event) => chunks.push(event.data);

        mediaRecorder.onstop = () => {
          const webmBlob = new Blob(chunks, { type: "audio/webm" });
          setAudioBlob(webmBlob);
        };

        mediaRecorder.start();

        // Start live transcription
        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
              .map((result) => result[0].transcript)
              .join("");
            setLiveTranscription(transcript);
          };
          recognition.start();
          speechRecognitionRef.current = recognition;
        }
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

    // Stop media recorder
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current = null;

    // Stop speech recognition
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
      speechRecognitionRef.current = null;
    }

    // Preserve live transcription
    if (liveTranscription) {
      setMessages((prev) => [
        ...prev,
        { sender: "User", text: liveTranscription },
      ]);
    }
  };

  const handleUpload = async () => {
    if (!audioBlob) {
      setError("Please record audio before submitting.");
      return;
    }

    try {
      const wavBlob = await convertWebMToWav(audioBlob);

      const formData = new FormData();
      formData.append("audio", wavBlob, "recorded-audio.wav");

      const res = await fetch("http://localhost:8000/api/v1/services/debate", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) throw new Error(`Error: ${res.statusText}`);

      const data = await res.json();
      const aiResponse = data.data.reply || "No reply available.";

      simulateTypingEffect(aiResponse, "AI");
      setAudioBlob(null); // Clear audio blob after submission
    } catch (err) {
      console.error("Error submitting audio:", err);
      setError("Failed to submit audio. Please try again later.");
    }
  };

  const convertWebMToWav = async (webmBlob) => {
    const arrayBuffer = await webmBlob.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const wavData = await WavEncoder.encode({
      sampleRate: audioBuffer.sampleRate,
      channelData: [audioBuffer.getChannelData(0)], // Mono audio
    });

    return new Blob([wavData], { type: "audio/wav" });
  };

  const simulateTypingEffect = (fullText, sender) => {
    const words = fullText.split(" ");
    let currentText = "";

    words.forEach((word, index) => {
      setTimeout(() => {
        currentText += `${word} `;
        setMessages((prev) => {
          // Check if the last message is already the AI's response in progress
          const updatedMessages = [...prev];
          const lastMessage = updatedMessages[updatedMessages.length - 1];

          if (lastMessage && lastMessage.sender === sender) {
            // Update the last AI message with new text
            updatedMessages[updatedMessages.length - 1] = {
              sender,
              text: currentText.trim(),
            };
          } else {
            // Add a new AI message if none exists
            updatedMessages.push({ sender, text: currentText.trim() });
          }

          return updatedMessages;
        });

        // On the final word, ensure the full text is present
        if (index === words.length - 1) {
          setTimeout(() => {
            setMessages((prev) => {
              const updatedMessages = [...prev];
              const lastMessage = updatedMessages[updatedMessages.length - 1];

              if (lastMessage && lastMessage.sender === sender) {
                updatedMessages[updatedMessages.length - 1] = {
                  sender,
                  text: fullText.trim(),
                };
              }
              return updatedMessages;
            });
          }, 500); // Small delay to finalize the response
        }
      }, index * 100); // Adjust typing speed
    });
  };

  return (
    <motion.div
      className={`w-full max-w-[900px] h-[85vh] flex flex-col rounded-2xl shadow-lg mx-auto p-4 transition-all duration-300 ease-in-out ${
        theme === "dark" ? "bg-[#1e1e2f] text-white" : "bg-gray-100 text-black"
      }`}
      initial={{ opacity: 0 }} // Initial state (invisible)
      animate={{ opacity: 1 }} // Final state (fully visible)
      transition={{ duration: 1 }} // Fade-in duration
    >
      <h1 className="text-3xl font-bold text-center mb-4 text-orange-500">
        Vox Debate Playground
      </h1>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#29293d] rounded-lg"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "User" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] p-4 rounded-lg ${
                msg.sender === "User"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="flex items-center space-x-4 mt-4">
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          className="flex-shrink-0 p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-full"
        >
          {isRecording ? <FaStop /> : <FaMicrophoneAlt />}
        </Button>
        <Button
          onClick={handleUpload}
          className="flex-grow p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
        >
          <FaPaperPlane />
        </Button>
      </div>
    </motion.div>
  );
};

export default PlaygroundCard;
