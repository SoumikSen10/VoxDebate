import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaMicrophoneAlt, FaStop, FaPaperPlane } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const PlaygroundCard = () => {
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [editableTranscription, setEditableTranscription] = useState("");
  const [emotion, setEmotion] = useState("");
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const theme = useSelector((state) => state.theme.theme);
  const chatContainerRef = useRef(null);
  const [audioBlob, setAudioBlob] = useState(null); // Store the recorded audio blob

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    chatContainerRef.current?.scrollTo(
      0,
      chatContainerRef.current.scrollHeight
    );
  }, [messages]);

  useEffect(() => {
    setEditableTranscription(transcript);
  }, [transcript]);

  const startRecording = async () => {
    if (isRecording) return;

    if (!browserSupportsSpeechRecognition) {
      setError("Your browser does not support speech recognition.");
      return;
    }

    setIsRecording(true);
    setError("");
    resetTranscript();
    setEditableTranscription("");

    SpeechRecognition.startListening({ continuous: true });

    try {
      // Start capturing the audio as well
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(blob); // Store the recorded audio blob
      };

      mediaRecorder.start();

      // Stop recording after a certain time (optional)
      setTimeout(() => {
        mediaRecorder.stop();
      }, 10000); // Record for 10 seconds (you can adjust the time)
    } catch (err) {
      setError("Failed to access your microphone.");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    SpeechRecognition.stopListening();

    if (editableTranscription) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "User", text: editableTranscription },
      ]);
    }
  };

  const speakText = (text) => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis not supported in this browser.");
    }
  };

  const handleUpload = async () => {
    if (!editableTranscription || !audioBlob) {
      setError("Please don't hurry!");
      return;
    }

    // 1. Call Emotion Detection API
    const formData = new FormData();
    formData.append("file", audioBlob, "userAudio.wav"); // Send audio blob

    try {
      const emotionRes = await fetch(
        "http://localhost:8000/api/v1/services/emotion-detection",
        {
          method: "POST",
          body: formData,
          credentials: "include", // Ensure cookies are sent if necessary
        }
      );

      let detectedEmotion = "neutral";
      if (emotionRes.ok) {
        const emotionData = await emotionRes.json();
        detectedEmotion = emotionData.data.emotion;
      } else {
        console.warn("Emotion API response error: Defaulting to neutral.");
      }

      setEmotion(detectedEmotion);

      // Hide the emotion message after 4 seconds
      setTimeout(() => {
        setEmotion("");
      }, 4000);

      // 2. Call Debate Service API after Emotion is detected
      const debateFormData = new FormData();
      debateFormData.append("transcription", editableTranscription);
      debateFormData.append("emotion", detectedEmotion);

      const typingPhrases = [
        // typing phrases here...
      ];

      const shuffleArray = (array) => {
        let shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };

      const shuffledPhrases = shuffleArray(typingPhrases);

      // Show typing effect
      setIsTyping(true);
      for (let i = 0; i < 4; i++) {
        setTypingText(shuffledPhrases[i]);
        chatContainerRef.current?.scrollTo(
          0,
          chatContainerRef.current.scrollHeight
        ); // Ensure scrolling
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
      setIsTyping(false);

      // Update the last user message with the final transcription
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1].text =
          editableTranscription;
        return updatedMessages;
      });

      const debateRes = await fetch(
        "http://localhost:8000/api/v1/services/debate",
        {
          method: "POST",
          body: debateFormData,
          credentials: "include", // Ensure cookies are sent if necessary
        }
      );

      if (!debateRes.ok) throw new Error(`Error: ${debateRes.statusText}`);

      const debateData = await debateRes.json();
      const aiResponse = debateData.data.reply || "No reply available.";

      // 3. Speak AI response
      speakText(aiResponse);

      setMessages((prev) => [...prev, { sender: "AI", text: "" }]);

      let index = 0;
      const typingSpeed = 65;
      const typingInterval = setInterval(() => {
        if (index < aiResponse.length) {
          setMessages((prev) => {
            const updatedMessages = [...prev];
            updatedMessages[updatedMessages.length - 1] = {
              sender: "AI",
              text: aiResponse.slice(0, index + 1),
            };
            return updatedMessages;
          });
          chatContainerRef.current?.scrollTo(
            0,
            chatContainerRef.current.scrollHeight
          );
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, typingSpeed);

      setEditableTranscription(""); // Reset transcription
    } catch (err) {
      console.error("Error submitting text:", err);
      setError("Failed to submit text. Please try again later.");
      setIsTyping(false);
    }
  };

  return (
    <motion.div
      className={`w-full max-w-[900px] h-[85vh] flex flex-col rounded-2xl shadow-2xl mx-auto p-6 transition-all duration-300 ease-in-out ${
        theme === "dark"
          ? "bg-gradient-to-br from-[#1e1e2f] to-[#29293d] text-white"
          : "bg-gradient-to-br from-gray-100 to-white text-black"
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-4xl font-bold text-center mb-6 text-orange-500 drop-shadow-md">
        Vox Debate Playground
      </h1>
      <div
        ref={chatContainerRef}
        className={`flex-1 overflow-y-auto p-4 space-y-4 rounded-lg bg-opacity-50 shadow-inner transition-all duration-300 ease-in-out ${
          theme === "dark" ? "bg-[#2e2e3e]" : "bg-gray-200"
        }`}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "User" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] p-4 rounded-xl shadow ${
                msg.sender === "User"
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                  : "bg-gradient-to-br from-gray-300 to-gray-400 text-black"
              }`}
            >
              {msg.text} {/* Render the message text */}
            </div>
          </div>
        ))}

        {/* Typing Effect */}
        {isTyping && (
          <motion.div
            className="text-sm italic text-gray-500 transition-opacity duration-1000"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {typingText}
          </motion.div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {emotion && (
        <div className="mt-4 text-center text-xl font-semibold text-green-500">
          <p>
            User's emotion detected:{" "}
            {emotion === "Unknown" ? "Neutral" : emotion}
          </p>
        </div>
      )}

      <div className="flex items-center space-x-4 mt-6">
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          className="flex-shrink-0 p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          {isRecording ? <FaStop /> : <FaMicrophoneAlt />}
        </Button>

        <textarea
          value={editableTranscription}
          onChange={(e) => setEditableTranscription(e.target.value)}
          className={`flex-grow p-4 rounded-md transition-all duration-300 ease-in-out resize-none shadow-md border-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            theme === "dark"
              ? "bg-[#2b2b3d] text-white placeholder-gray-400 border-[#3c3c4d]"
              : "bg-gray-100 text-black placeholder-gray-600 border-gray-300"
          }`}
          placeholder="Yes, we type what you say..."
          rows={3}
        />

        <Button
          onClick={handleUpload}
          className="flex-shrink-0 p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          <FaPaperPlane />
        </Button>
      </div>
    </motion.div>
  );
};

export default PlaygroundCard;
