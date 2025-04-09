import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Add this import
import Header from "./Header";
import ProfileDropdown from "./ProfileDropdown";
import OutputDisplay from "./OutputDisplay";
import QuickActions from "./QuickActions";
import History from "./History";
import PromptInput from "./PromptInput";
import { FaImage, FaFilm, FaLightbulb, FaScroll } from "react-icons/fa";

const Workspace = () => {
  const { user, logout } = useContext(AuthContext); // Get logout function from context
  const navigate = useNavigate(); // Add navigation hook
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const outputRef = useRef(null);
  const maxChars = 32000;

  const API_ENDPOINT = "http://localhost:5005/api/image/generate";
  const HISTORY_API = "http://localhost:5005/api/image/history";
  const FALLBACK_IMAGE =
    "https://res.cloudinary.com/dcu9peqwj/image/upload/v1744020286/uploads/f7mhyra5jqojqcavpi8c.jpg";

  // Check authentication on mount and redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Scroll to bottom of output when it updates
  useEffect(() => {
    if (outputRef.current && output) {
      outputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [output]);

  const historyEndRef = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(HISTORY_API, { withCredentials: true });
        if (res.data?.success) {
          const reversedHistory = res.data.images.reverse();
          setHistory(reversedHistory);
          setTimeout(() => {
            historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      } catch (err) {
        console.error("Failed to fetch history:", err);
        // Check if error is due to authentication
        if (err.response?.status === 401) {
          logout(); // Call logout to clear auth state
          navigate("/login");
        }
      }
    };
    
    if (user) { // Only fetch if user is authenticated
      fetchHistory();
    }
  }, [user, navigate, logout]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      setError("Failed to copy text");
    }
  };

  const generateOutput = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }
    
    // Check authentication before proceeding
    if (!user) {
      navigate("/login");
      return;
    }
    
    setIsLoading(true);
    setOutput(null);
    setError(null);

    try {
      const response = await axios.post(
        API_ENDPOINT,
        { prompt },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          timeout: 30000,
        }
      );
      if (!response.data?.data) {
        throw new Error("Invalid response from server");
      }
      const newOutput = {
        type: "image",
        content: response.data.data || FALLBACK_IMAGE,
        prompt,
        timestamp: new Date().toISOString(),
      };
      setOutput(newOutput);
      setHistory((prev) => [newOutput, ...prev]);
      setPrompt("");
    } catch (error) {
      console.error("API Error:", error);
      
      // Handle authentication error
      if (error.response?.status === 401) {
        logout(); // Call logout to clear auth state
        navigate("/login");
        return;
      }
      
      if (error.code === "ECONNABORTED") {
        setError("Request timed out. Using fallback image.");
      } else {
        setError(
          error.response?.data?.message || "API Error. Using fallback image."
        );
      }
      const fallbackOutput = {
        type: "image",
        content: FALLBACK_IMAGE,
        prompt,
        isFallback: true,
      };
      setOutput(fallbackOutput);
      setHistory((prev) => [fallbackOutput, ...prev]);
    } finally {
      setIsLoading(false);
    }
  };

  const onReusePrompt = (promptText) => {
    setPrompt(promptText);
  };

  const quickPrompts = [
    "Futuristic city at sunset with floating islands",
    "Fantasy forest with glowing mushrooms",
    "Cyberpunk street scene with neon lights",
    "Underwater temple with ancient statues",
  ];

  // If not authenticated, don't render the workspace
  if (!user) {
    return null; // Return null as we're redirecting in the useEffect
  }

  return (
    <div className="fixed inset-0 bg-gray-900 text-gray-200 flex flex-col h-full">
      <Header
        user={user}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
      />
      {showProfile && <ProfileDropdown user={user} />}

      <main className="flex-1 flex flex-col p-2 md:p-4 overflow-hidden">
        <div className="max-w-5xl mx-auto w-full flex flex-col h-full">
          {/* Quick Prompt Suggestions */}
          <div className="flex overflow-x-auto gap-2 pb-1 md:pb-2 scrollbar-thin">
            {quickPrompts.map((text, index) => (
              <button
                key={index}
                onClick={() => setPrompt(text)}
                className="whitespace-nowrap px-4 py-2 bg-gradient-to-r from-gray-800 to-indigo-900/30 border border-indigo-900/20 rounded-full hover:border-indigo-500/40 transition-all duration-300 text-sm hover:from-gray-700 hover:to-indigo-800/40 flex-shrink-0"
              >
                {text}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            <History history={history} FALLBACK_IMAGE={FALLBACK_IMAGE} />
            <div ref={historyEndRef} />
            <OutputDisplay
              error={error}
              isLoading={isLoading}
              output={output}
              copied={copied}
              copyToClipboard={copyToClipboard}
              onReusePrompt={onReusePrompt}
              FALLBACK_IMAGE={FALLBACK_IMAGE}
            />
            <div ref={outputRef} />
          </div>
          <PromptInput
            prompt={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onGenerate={generateOutput}
            isLoading={isLoading}
            maxChars={maxChars}
          />
        </div>
      </main>
    </div>
  );
};

export default Workspace;