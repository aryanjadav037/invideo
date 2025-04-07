import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { 
  FaSpinner, FaUser, FaCrown, FaImage, FaFilm, 
  FaLightbulb, FaScroll, FaProjectDiagram, FaPlug,
  FaCopy, FaCheck
} from 'react-icons/fa';

const Workspace = () => {
  const { logout, user } = useContext(AuthContext);
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);
  const outputRef = useRef(null);
  const maxChars = 32000;

  // Handle prompt changes with validation
  const handlePromptChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setPrompt(value);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight, 
        150
      )}px`;
    }
  }, [prompt]);

  // Scroll to bottom when new output appears
  useEffect(() => {
    if (outputRef.current && output) {
      outputRef.current.scrollTop = 0;
    }
  }, [output]);

  // Copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate output (mock implementation)
  const generateOutput = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setOutput(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response - replace with actual API call
      setOutput({
        type: 'image', // could be 'text', 'video', etc.
        content: 'https://via.placeholder.com/800x450?text=AI+Generated+Image',
        prompt: prompt
      });
      
      // Clear the input field after submission
      setPrompt('');
    } catch (error) {
      console.error('Error generating output:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 text-gray-200 flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center">
          <div className="mr-2 text-blue-400">
            <FaImage className="inline-block" />
          </div>
          <span className="text-xl font-bold">invideo AI</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            <FaCrown className="mr-1" /> Upgrade
          </button>
          <button 
            onClick={() => setShowProfile(!showProfile)} 
            className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center"
          >
            {user?.profilePic ? (
              <img src={user.profilePic} alt="Profile" className="w-8 h-8 rounded-full" />
            ) : (
              <span>{user?.username?.charAt(0) || 'P'}</span>
            )}
          </button>
        </div>
      </header>

      {/* Profile Dropdown */}
      {showProfile && (
        <div className="absolute right-4 top-16 bg-gray-800 rounded-lg shadow-lg p-4 w-64 z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center">
              {user?.profilePic ? (
                <img src={user.profilePic} alt="Profile" className="w-12 h-12 rounded-full" />
              ) : (
                <span className="text-xl">{user?.username?.charAt(0) || 'P'}</span>
              )}
            </div>
            <div>
              <h3 className="font-bold">{user?.username || 'User'}</h3>
              <p className="text-sm text-gray-400">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-3">
            <button 
              onClick={logout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden">
        <div className="max-w-4xl mx-auto w-full flex flex-col h-full">
          {/* Output Display - Scrollable area */}
          <div 
            ref={outputRef}
            className="flex-1 overflow-y-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
          >
            {isLoading && (
              <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-lg mb-4">
                <FaSpinner className="animate-spin text-3xl text-blue-500 mb-3" />
                <p className="text-gray-400">Generating your output...</p>
              </div>
            )}

            {output && (
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <div className="mb-3 text-sm text-gray-400 flex justify-between items-start">
                  <div>
                    <span className="font-medium">Prompt:</span> {output.prompt}
                  </div>
                  <button 
                    onClick={() => copyToClipboard(output.prompt)}
                    className="text-gray-400 hover:text-white ml-2"
                    title="Copy prompt"
                  >
                    {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                  </button>
                </div>
                
                {output.type === 'image' && (
                  <img 
                    src={output.content} 
                    alt="Generated content" 
                    className="w-full h-auto rounded-lg mb-3"
                  />
                )}
                
                <div className="flex justify-end space-x-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                    Download
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm">
                    Share
                  </button>
                  <button 
                    onClick={() => setPrompt(output.prompt)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Reuse Prompt
                  </button>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <button className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg p-3 text-sm">
                <FaImage className="mr-2 text-red-400" />
                Image
              </button>
              <button className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg p-3 text-sm">
                <FaFilm className="mr-2 text-blue-400" />
                Video
              </button>
              <button className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg p-3 text-sm">
                <FaLightbulb className="mr-2 text-purple-400" />
                Animation
              </button>
              <button className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg p-3 text-sm">
                <FaScroll className="mr-2 text-green-400" />
                Script
              </button>
            </div>
          </div>

          {/* Prompt Input - Fixed at bottom */}
          <div className="bg-gray-800 rounded-lg p-4 sticky bottom-0">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={handlePromptChange}
              placeholder="Give me a topic, premise and detailed instructions in any language"
              className="w-full bg-transparent border-none outline-none resize-none min-h-[60px] max-h-[150px]"
              maxLength={maxChars}
            />
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-gray-500">
                {prompt.length}/{maxChars}
              </div>
              <button
                onClick={generateOutput}
                disabled={isLoading || !prompt.trim()}
                className={`flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg ${
                  (isLoading || !prompt.trim()) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Generating...
                  </>
                ) : (
                  'Generate'
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-3 text-center text-gray-500 text-xs border-t border-gray-800">
        invideo AI can make mistakes. Check important info.
      </footer>
    </div>
  );
};

export default Workspace;