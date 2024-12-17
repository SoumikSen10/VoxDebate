import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaVolumeUp } from "react-icons/fa"; // Importing the audio icon

const PlaygroundCard = () => {
  const [audioFile, setAudioFile] = useState(null);

  // Get current theme from Redux
  const theme = useSelector((state) => state.theme.theme);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!audioFile) {
      alert("Please select an audio file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile);

    /* Write code for API calling */
  };

  return (
    <div
      className={`w-full max-w-[600px] space-y-6 p-10 rounded-lg shadow-xl mx-auto ${
        theme === "dark" ? "bg-[#2a1a3e]" : "bg-[#f3f3f3]" // Light/dark background based on theme
      }`}
    >
      {/* Title */}
      <h1 className="text-3xl font-bold text-orange-500 text-center mb-6">
        Ready for cloning?
      </h1>

      {/* Form */}
      <form onSubmit={handleUpload} className="space-y-6">
        {/* File Input */}
        <div className="flex flex-col">
          <Label htmlFor="audio" className="text-sm mb-2 text-white">
            Upload your audio file
          </Label>
          <div className="relative">
            <input
              id="audio"
              accept="audio/*"
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Button
              type="button"
              className="w-full bg-[#3b2a55] text-white rounded-full py-3 font-bold flex items-center justify-center space-x-2 hover:bg-[#4a3b6d] transition-all duration-300 ease-in-out"
            >
              <FaVolumeUp className="w-5 h-5 text-white" />{" "}
              {/* FaVolumeUp icon */}
              <span>Choose file</span>
            </Button>
          </div>
        </div>

        {/* Upload Button without icon */}
        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-bold transition-all duration-300 ease-in-out"
        >
          Upload
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-xs text-gray-400 mt-6">
        By uploading, you agree to our{" "}
        <span className="underline">Terms and Conditions</span>.
      </p>
    </div>
  );
};

export default PlaygroundCard;
