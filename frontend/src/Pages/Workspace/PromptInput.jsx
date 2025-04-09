import React, { useRef, useEffect, useState } from 'react';
import { FaMagic } from 'react-icons/fa';
import { Sparkles } from 'lucide-react';
import axios from 'axios';

const PromptInput = ({ prompt, onChange, onGenerate, isLoading, maxChars }) => {
  const textareaRef = useRef(null);
  const [isEnhancing, setIsEnhancing] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [prompt]);

  const enhancePrompt = async () => {
    if (!prompt.trim() || isEnhancing) return;
    
    setIsEnhancing(true);
    try {
      const response = await axios.post(
        'https://e2df-106-213-27-70.ngrok-free.app/api/image/enhence',
        { prompt }, // body
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // if cookies or credentials are required
        }
      );
      console.log('Response:', response);
      const data = await response;
      if (data.enhancedPrompt) {
        onChange({ target: { value: data.enhancedPrompt } });
      }
    } catch (error) {
      console.error('Error enhancing prompt:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="bg-gray-900/80 border border-indigo-900/30 rounded-xl p-3 sticky bottom-0 shadow-lg backdrop-blur-md transition-all duration-300">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={onChange}
          placeholder="Describe what you want to create..."
          className="w-full pr-24 bg-gray-900 border border-indigo-800/50 rounded-xl p-3 outline-none resize-none min-h-[45px] max-h-[120px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 text-gray-200 overflow-hidden scrollbar-hide text-sm"
          maxLength={maxChars}
          disabled={isLoading || isEnhancing}
          aria-label="Prompt input"
        />
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2 flex space-x-2">
          <button
            onClick={enhancePrompt}
            disabled={isLoading || isEnhancing || !prompt.trim()}
            className={`flex items-center bg-gradient-to-r from-purple-600 to-pink-600 
              hover:from-purple-500 hover:to-pink-500 text-white px-3 py-1.5 rounded-lg text-sm
              transition-all duration-300 shadow hover:shadow-purple-500/40 
              disabled:opacity-50 disabled:cursor-not-allowed 
              ${isEnhancing ? 'animate-pulse' : ''}`}
            title="Enhance prompt"
          >
            <Sparkles className={`mr-1 h-4 w-4 ${isEnhancing ? 'animate-spin' : ''}`} />
            {isEnhancing ? '...' : 'Enhance'}
          </button>
          
          <button
            onClick={onGenerate}
            disabled={isLoading || isEnhancing || !prompt.trim()}
            className={`flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 
              hover:from-blue-500 hover:to-indigo-500 text-white px-3 py-1.5 rounded-lg text-sm
              transition-all duration-300 shadow hover:shadow-blue-500/40 
              disabled:opacity-50 disabled:cursor-not-allowed 
              ${isLoading ? 'animate-pulse' : ''}`}
          >
            <FaMagic className={`mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? '...' : 'Go'}
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mt-1 text-xs text-indigo-300 px-1">
        <span>
          <span className="text-blue-400">{prompt.length}</span>
          <span className="text-gray-500"> /{maxChars}</span>
        </span>
      </div>
    </div>
  );
};

export default PromptInput;