import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Send, Loader } from 'lucide-react';
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
        'http://localhost:5005/api/image/enhence',
        { prompt },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      const data = await response.data.data.prompt;
      if (data) {
        onChange({ target: { value: data } });
      }
    } catch (error) {
      console.error('Error enhancing prompt:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900/90 via-indigo-950/30 to-purple-900/20 border border-indigo-900/30 rounded-xl p-4 sticky bottom-0 shadow-lg backdrop-blur-md transition-all duration-300">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={onChange}
          placeholder="Describe the image you want to create..."
          className="w-full pr-50 bg-gray-900/80 border border-indigo-800/50 rounded-xl p-4 outline-none resize-none min-h-[45px] max-h-[120px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 text-gray-200 overflow-hidden scrollbar-hide text-sm"
          maxLength={maxChars}
          disabled={isLoading || isEnhancing}
          aria-label="Prompt input"
        />
        <div className="absolute top-1/2 right-3 transform -translate-y-1/2 flex space-x-2">
          <button
            onClick={enhancePrompt}
            disabled={isLoading || isEnhancing || !prompt.trim()}
            className={`flex items-center bg-gradient-to-r from-purple-600 to-pink-600 
              hover:from-purple-500 hover:to-pink-500 text-white px-3 py-2 rounded-lg text-sm
              transition-all duration-300 shadow-md hover:shadow-purple-500/40 
              disabled:opacity-50 disabled:cursor-not-allowed 
              ${isEnhancing ? 'animate-pulse' : ''}`}
            title="Enhance prompt with AI"
          >
            <Sparkles className={`mr-1.5 h-4 w-4 ${isEnhancing ? 'animate-spin' : ''}`} />
            {isEnhancing ? 'Enhancing...' : 'Enhance'}
          </button>
          
          <button
            onClick={onGenerate}
            disabled={isLoading || isEnhancing || !prompt.trim()}
            className={`flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 
              hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg text-sm
              transition-all duration-300 shadow-md hover:shadow-blue-500/40 
              disabled:opacity-50 disabled:cursor-not-allowed 
              ${isLoading ? 'animate-pulse' : ''}`}
          >
            {isLoading ? (
              <><Loader className="mr-1.5 h-4 w-4 animate-spin" /> Creating...</>
            ) : (
              <><Send className="mr-1.5 h-4 w-4" /> Create</>
            )}
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2 text-xs text-indigo-300 px-1">
        <span>
          <span className={`${prompt.length > maxChars * 0.8 ? 'text-orange-400' : 'text-blue-400'}`}>{prompt.length}</span>
          <span className="text-gray-500"> /{maxChars} characters</span>
        </span>
        {prompt.length > 0 && (
          <button 
            onClick={() => onChange({ target: { value: '' } })}
            className="text-gray-400 hover:text-gray-200 transition-colors text-xs"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default PromptInput;