import React, { useEffect, useRef, useState } from 'react';
import { Copy, Check, Download, Share, AlertTriangle, RefreshCw, Loader, ExpandIcon } from 'lucide-react';

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
  const [isEnlarged, setIsEnlarged] = useState(false);
  
  useEffect(() => {
    if (outputEndRef.current && output) {
      outputEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [output]);

  // Function to copy image to clipboard
  const copyImageToClipboard = async () => {
    if (!output || output.type !== 'image') return;
    
    try {
      const img = new Image();
      
      const imageLoaded = new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.crossOrigin = 'anonymous';
        img.src = output.content;
      });
      
      await imageLoaded;
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      if (navigator.clipboard && navigator.clipboard.write) {
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const data = new ClipboardItem({
          [blob.type]: blob
        });
        await navigator.clipboard.write([data]);
      } else {
        await navigator.clipboard.writeText(output.content);
      }
      
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy image: ', err);
      
      try {
        await navigator.clipboard.writeText(output.content);
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
      
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
      
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
        const response = await fetch(output.content);
        const blob = await response.blob();
        const file = new File([blob], `ai-generated-image.jpg`, { type: blob.type });
        
        await navigator.share({
          title: 'AI Generated Image',
          text: `Check out this AI-generated image based on the prompt: ${output.prompt}`,
          files: [file]
        });
      } catch (err) {
        try {
          await navigator.share({
            title: 'AI Generated Image',
            text: `Check out this AI-generated image based on the prompt: ${output.prompt}`,
            url: output.content
          });
        } catch (fallbackErr) {
          setShareModalOpen(true);
        }
      }
    } else {
      setShareModalOpen(true);
    }
  };

  // Share modal
  const ShareModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 max-w-md w-full mx-4 shadow-xl border border-indigo-900/30 backdrop-blur-md">
        <h3 className="text-xl font-medium text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">Share your creation</h3>
        <p className="text-gray-300 mb-6">Copy this link to share your image:</p>
        
        <div className="flex mb-4">
          <input 
            type="text" 
            value={output?.content || ''} 
            className="flex-1 bg-gray-900 border border-gray-700 rounded-l-lg px-3 py-2 text-white"
            readOnly
          />
          <button 
            onClick={() => {
              navigator.clipboard.writeText(output?.content || '');
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 2000);
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-r-lg transition-colors"
          >
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={() => setShareModalOpen(false)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  // Enlarged image view
  const EnlargedImageView = () => (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fadeIn">
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <button 
          onClick={() => setIsEnlarged(false)}
          className="absolute top-4 right-4 bg-gray-800/70 hover:bg-gray-700 p-2 rounded-full text-white"
        >
          ✕
        </button>
        
        <img
          src={output.content}
          alt={`AI generated: ${output.prompt}`}
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = FALLBACK_IMAGE;
          }}
        />
      </div>
    </div>
  );

  return (
    <>
      {error && (
        <div className="flex items-start bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-5 mb-6 text-yellow-300 animate-fadeIn">
          <AlertTriangle className="mt-1 mr-3 flex-shrink-0" />
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
        <div className="flex flex-col items-center justify-center p-16 bg-gradient-to-br from-gray-900 via-indigo-950/30 to-purple-900/20 rounded-xl mb-6 border border-indigo-900/30 shadow-lg animate-fadeIn">
          <div className="relative mb-6">
            <Loader className="animate-spin text-5xl text-blue-400" />
            <div className="absolute inset-0 rounded-full blur-xl bg-blue-500/20 animate-pulse"></div>
          </div>
          <p className="text-xl text-gray-300 font-medium">Creating your masterpiece...</p>
          <p className="text-sm text-gray-400 mt-2 mb-6">This may take 20-30 seconds</p>
          <div className="w-full max-w-xs bg-gray-800/50 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-progressBar"></div>
          </div>
        </div>
      )}

      {output && (
        <div className="bg-gradient-to-br from-gray-900 via-indigo-950/30 to-purple-900/20 rounded-xl p-6 mb-6 border border-indigo-900/40 shadow-lg transform transition-all duration-500 animate-fadeIn">
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
              {copied ? <Check className="text-green-500" /> : <Copy />}
            </button>
          </div>

          {output.type === 'image' && (
            <div className="mb-6 rounded-xl overflow-hidden bg-black/40 p-1 shadow-lg shadow-indigo-500/10 group relative">
              <img
                src={output.content}
                alt={`AI generated: ${output.prompt}`}
                className="w-full h-auto max-h-[70vh] object-contain mx-auto rounded-lg transition-all duration-700 group-hover:scale-[1.01]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_IMAGE;
                }}
                crossOrigin="anonymous"
              />
              
              {/* Quick actions overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsEnlarged(true)}
                  className="bg-gray-900/70 hover:bg-gray-800 p-3 rounded-full text-white transition-all hover:scale-110"
                  title="View full size"
                >
                  <ExpandIcon className="w-5 h-5" />
                </button>
                
                <button
                  onClick={downloadImage}
                  className="bg-green-800/70 hover:bg-green-700 p-3 rounded-full text-white transition-all hover:scale-110"
                  title="Download image"
                >
                  {isDownloaded ? <Check className="w-5 h-5" /> : <Download className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={copyImageToClipboard}
                  className="bg-blue-800/70 hover:bg-blue-700 p-3 rounded-full text-white transition-all hover:scale-110"
                  title="Copy image"
                >
                  {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={shareImage}
                  className="bg-purple-800/70 hover:bg-purple-700 p-3 rounded-full text-white transition-all hover:scale-110"
                  title="Share image"
                >
                  <Share className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-end gap-3">
            <button
              onClick={downloadImage}
              className="flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-4 py-2.5 rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-green-500/30 transform hover:-translate-y-0.5"
            >
              {isDownloaded ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Downloaded
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" /> Download
                </>
              )}
            </button>
            <button 
              onClick={shareImage}
              className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-2.5 rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-purple-500/30 transform hover:-translate-y-0.5"
            >
              <Share className="mr-2 h-4 w-4" /> Share
            </button>
            <button
              onClick={copyImageToClipboard}
              className="flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2.5 rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
            >
              {isCopied ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </>
              )}
            </button>
            <button
              onClick={() => onReusePrompt(output.prompt)}
              className="flex items-center bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2.5 rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-gray-700/50 transform hover:-translate-y-0.5"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
            </button>
          </div>
        </div>
      )}
      
      {shareModalOpen && <ShareModal />}
      {isEnlarged && <EnlargedImageView />}
      
      <div ref={outputEndRef} />
    </>
  );
};

export default OutputDisplay;