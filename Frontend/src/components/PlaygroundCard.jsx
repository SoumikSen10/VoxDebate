import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FaMicrophoneAlt,
  FaStop,
  FaPaperPlane,
  FaSpinner,
} from "react-icons/fa";
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
  const [isUploading, setIsUploading] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const chatContainerRef = useRef(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecordingInProgress, setIsRecordingInProgress] = useState(false);

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

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/wav" });
      setAudioBlob(blob);
      setIsRecordingInProgress(false);
    };

    mediaRecorder.start();

    setIsRecordingInProgress(true);

    setTimeout(() => {
      mediaRecorder.stop();
    }, 10000);
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

    if (!audioBlob) {
      return;
    }

    setError("");
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
      return;
    }

    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", audioBlob, "userAudio.wav");

    try {
      const emotionRes = await fetch(
        "http://localhost:8000/api/v1/services/emotion-detection",
        {
          method: "POST",
          body: formData,
          credentials: "include",
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

      setTimeout(() => {
        setEmotion("");
      }, 4000);

      const debateFormData = new FormData();
      debateFormData.append("transcription", editableTranscription);
      debateFormData.append("emotion", detectedEmotion);

      setIsTyping(true);
      const typingPhrases = [
        "Analyzing your argument...",
        "Formulating a logical response...",
        "Processing your thoughts...",
      ];
      for (let phrase of typingPhrases) {
        setTypingText(phrase);
        chatContainerRef.current?.scrollTo(
          0,
          chatContainerRef.current.scrollHeight
        );
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
      setIsTyping(false);

      const debateRes = await fetch(
        "http://localhost:8000/api/v1/services/debate",
        {
          method: "POST",
          body: debateFormData,
          credentials: "include",
        }
      );

      if (!debateRes.ok) throw new Error(`Error: ${debateRes.statusText}`);

      const debateData = await debateRes.json();
      const aiResponse = debateData.data.reply || "No reply available.";

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

      setEditableTranscription("");
    } catch (err) {
      console.error("Error submitting text:", err);
      setError("Failed to submit text. Please try again later.");
      setIsTyping(false);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-[900px] h-[85vh] flex flex-col rounded-2xl shadow-2xl mx-auto p-4 space-y-4 sm:p-8 ${
        theme === "dark"
          ? "bg-gradient-to-br from-[#1e1e2f] to-[#29293d] text-white"
          : "bg-gradient-to-br from-gray-100 to-white text-black"
      } lg:mx-auto sm:w-[95%]`}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl font-bold text-center mb-6 text-orange-500 drop-shadow-md"
      >
        Vox Debate Playground
      </motion.h1>
      <motion.div
        ref={chatContainerRef}
        className={`flex-1 overflow-y-auto p-4 space-y-4 rounded-lg shadow-inner ${
          theme === "dark" ? "bg-[#2e2e3e]" : "bg-gray-200"
        } lg:w-full sm:mx-auto`}
      >
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`flex ${
              msg.sender === "User" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] p-4 rounded-xl shadow ${
                msg.sender === "User"
                  ? "bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 text-white"
                  : "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            className="text-sm italic text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {typingText}
          </motion.div>
        )}
      </motion.div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {emotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 text-center text-xl font-semibold text-green-500"
        >
          User's emotion detected: {emotion}
        </motion.div>
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
          className={`flex-grow p-4 rounded-md resize-none shadow-md border-2 focus:outline-none transition-transform sm:w-[90%] sm:ml-2 md:w-[85%] lg:w-[80%] xl:w-[75%] 2xl:w-[70%] ${
            theme === "dark"
              ? "bg-[#2b2b3d] text-white placeholder-gray-400 border-[#3c3c4d]"
              : "bg-gray-100 text-black placeholder-gray-600 border-gray-300"
          } `}
          placeholder="Type or speak your message..."
          rows={3}
        />

        <Button
          onClick={handleUpload}
          className={`flex-shrink-0 p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg ${
            isUploading ? "cursor-not-allowed" : ""
          }`}
          disabled={isRecordingInProgress}
        >
          {isUploading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaPaperPlane />
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default PlaygroundCard;
