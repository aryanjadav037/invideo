import React, { useEffect, useRef, useState } from 'react';
import {
  FaSpinner,
  FaCopy,
  FaCheck,
  FaDownload,
  FaShare,
  FaExclamationTriangle,
  FaRedo,
} from 'react-icons/fa';

const OutputDisplay = ({
  error,
  isLoading,
  output,
  copied,
  copyToClipboard,
  onReusePrompt,
  FALLBACK_IMAGE,
}) => {
  const outputEndRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  
  useEffect(() => {
    if (outputEndRef.current && output) {
      outputEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [output]);

  // Function to copy image to clipboard - using Canvas approach for better compatibility
  const copyImageToClipboard = async () => {
    if (!output || output.type !== 'image') return;
    
    try {
      // Create a temporary canvas element
      const img = new Image();
      
      // Set up a promise to wait for the image to load
      const imageLoaded = new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.crossOrigin = 'anonymous'; // Important for CORS
        img.src = output.content;
      });
      
      await imageLoaded;
      
      // Create canvas and draw the image
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      // Get blob from canvas
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      
      // Copy to clipboard
      if (navigator.clipboard && navigator.clipboard.write) {
        // Modern approach - ClipboardItem
        const data = new ClipboardItem({
          [blob.type]: blob
        });
        await navigator.clipboard.write([data]);
      } else {
        // Fallback - create an offscreen input with image URL
        const urlInput = document.createElement('input');
        urlInput.value = output.content;
        document.body.appendChild(urlInput);
        urlInput.select();
        document.execCommand('copy');
        document.body.removeChild(urlInput);
        
        console.warn('Using fallback clipboard method - copied URL instead of image');
      }
      
      // Show success state
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy image: ', err);
      
      // Fallback to copying just the URL if everything else fails
      try {
        await navigator.clipboard.writeText(output.content);
        alert('Image URL copied to clipboard (image copy not supported in this browser)');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (clipErr) {
        alert('Failed to copy image. Your browser may not support this feature.');
      }
    }
  };

  // Function to download image
  const downloadImage = async () => {
    if (!output || output.type !== 'image') return;
    
    try {
      const response = await fetch(output.content);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-generated-${new Date(output.timestamp || Date.now()).getTime()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
      
      // Show success state
      setIsDownloaded(true);
      setTimeout(() => setIsDownloaded(false), 2000);
    } catch (err) {
      console.error('Failed to download image: ', err);
      alert('Failed to download image. Please try again.');
    }
  };

  // Function to share image
  const shareImage = async () => {
    if (!output || output.type !== 'image') {
      setShareModalOpen(true);
      return;
    }
    
    if (navigator.share) {
      try {
        // Try to use Web Share API with file
        const response = await fetch(output.content);
        const blob = await response.blob();
        const file = new File([blob], `ai-generated-image.jpg`, { type: blob.type });
        
        await navigator.share({
          title: 'AI Generated Image',
          text: `Check out this AI-generated image based on the prompt: ${output.prompt}`,
          files: [file]
        });
      } catch (err) {
        console.error('Error sharing with file:', err);
        
        // Fallback to sharing without file if that fails
        try {
          await navigator.share({
            title: 'AI Generated Image',
            text: `Check out this AI-generated image based on the prompt: ${output.prompt}`,
            url: output.content
          });
        } catch (fallbackErr) {
          console.error('Error sharing URL:', fallbackErr);
          // If both fail, show the share modal
          setShareModalOpen(true);
        }
      }
    } else {
      // Browser doesn't support Web Share API
      setShareModalOpen(true);
    }
  };

  // Share modal for browsers that don't support Web Share API
  const ShareModal = () => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 shadow-xl border border-indigo-900/30">
        <h3 className="text-xl font-medium text-white mb-4">Share your image</h3>
        <p className="text-gray-300 mb-6">Copy this link to share your image:</p>
        
        <div className="flex mb-4">
          <input 
            type="text" 
            value={output?.content || ''} 
            className="flex-1 bg-gray-700 border border-gray-600 rounded-l-lg px-3 py-2 text-white"
            readOnly
          />
          <button 
            onClick={() => {
              navigator.clipboard.writeText(output?.content || '');
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 2000);
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-r-lg"
          >
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        
        <div className="flex justify-end mt-4">
          <button 
            onClick={() => setShareModalOpen(false)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {error && (
        <div className="flex items-start bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-5 mb-6 text-yellow-300 animate-fadeIn">
          <FaExclamationTriangle className="mt-1 mr-3 flex-shrink-0 text-lg" />
          <div>
            <p className="font-medium text-yellow-200">Notice:</p>
            <p>{error}</p>
            {output?.isFallback && (
              <p className="text-xs mt-2 text-yellow-400/70">This is a fallback demonstration image.</p>
            )}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12 bg-gradient-to-br from-gray-800 to-indigo-900/30 rounded-xl mb-6 border border-indigo-900/20 shadow-lg animate-fadeIn">
          <div className="relative">
            <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
            <div className="absolute inset-0 rounded-full blur-xl bg-blue-500/20 animate-pulse"></div>
          </div>
          <p className="text-lg text-gray-300 font-medium">Generating your content...</p>
          <p className="text-sm text-gray-400 mt-2">This may take 20-30 seconds</p>
          <div className="w-full max-w-xs bg-gray-800/50 h-2 mt-6 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-progressBar"></div>
          </div>
        </div>
      )}

      {output && (
        <div className="bg-gradient-to-br from-gray-800 to-indigo-900/20 rounded-xl p-5 mb-6 border border-indigo-900/30 shadow-lg transform transition-all duration-500 animate-fadeIn">
          <div className="mb-4 text-sm text-gray-300 flex justify-between items-start">
            <div className="flex-1 mr-2">
              <span className="font-medium text-blue-400">Prompt:</span> {output.prompt}
            </div>
            <button
              onClick={() => copyToClipboard(output.prompt)}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-gray-700/50"
              title="Copy prompt"
              aria-label="Copy prompt"
            >
              {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
            </button>
          </div>

          {output.type === 'image' && (
            <div className="mb-5 rounded-xl overflow-hidden bg-black/40 p-1 shadow-lg shadow-indigo-500/10 group relative">
              <img
                src={output.content}
                alt={`AI generated: ${output.prompt}`}
                className="w-full h-auto max-h-[70vh] object-contain mx-auto rounded-lg transition-transform duration-700 group-hover:scale-[1.02]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_IMAGE;
                }}
                crossOrigin="anonymous"
              />
              
              {/* Quick actions overlay that appears on hover */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                <button
                  onClick={copyImageToClipboard}
                  className="bg-gray-800/80 hover:bg-gray-700 p-2 rounded-full text-white transition-all"
                  title="Copy image"
                >
                  {isCopied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-end gap-3">
            <button
              onClick={downloadImage}
              className="flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-green-500/30 transform hover:-translate-y-0.5"
            >
              {isDownloaded ? (
                <>
                  <FaCheck className="mr-2" /> Downloaded
                </>
              ) : (
                <>
                  <FaDownload className="mr-2" /> Download
                </>
              )}
            </button>
            <button 
              onClick={shareImage}
              className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-purple-500/30 transform hover:-translate-y-0.5"
            >
              <FaShare className="mr-2" /> Share
            </button>
            <button
              onClick={copyImageToClipboard}
              className="flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
            >
              {isCopied ? (
                <>
                  <FaCheck className="mr-2" /> Copied
                </>
              ) : (
                <>
                  <FaCopy className="mr-2" /> Copy
                </>
              )}
            </button>
            <button
              onClick={() => onReusePrompt(output.prompt)}
              className="flex items-center bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-gray-700/50 transform hover:-translate-y-0.5"
            >
              <FaRedo className="mr-2" /> Reuse Prompt
            </button>
          </div>
        </div>
      )}
      
      {shareModalOpen && <ShareModal />}
      
      <div ref={outputEndRef} />
    </>
  );
};

export default OutputDisplay;