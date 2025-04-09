"use client"

import { useState } from "react"
import { Clock, ImageIcon, MessageSquare, Download, Share, Copy, Check, Maximize2, X } from "lucide-react"

export default function History({ history, FALLBACK_IMAGE }) {
  const [expandedItem, setExpandedItem] = useState(null)
  const [actionStates, setActionStates] = useState({})

  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 mt-4 rounded-xl border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950">
        <Clock className="w-12 h-12 text-gray-500 mb-3 opacity-75" />
        <h3 className="text-lg font-medium text-gray-400">No history yet</h3>
        <p className="text-gray-500 text-sm mt-1 text-center">Your generation history will appear here</p>
      </div>
    )
  }

  // Function to copy image to clipboard with canvas approach
  const copyImageToClipboard = async (imageUrl, index) => {
    try {
      // Create a temporary canvas element
      const img = new Image();
      
      // Set up a promise to wait for the image to load
      const imageLoaded = new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.crossOrigin = 'anonymous'; // Important for CORS
        img.src = imageUrl;
      });
      
      await imageLoaded;
      
      // Create canvas and draw the image
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      // Try different approaches to copy
      if (navigator.clipboard && navigator.clipboard.write) {
        try {
          // Modern approach - ClipboardItem
          const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
          const data = new ClipboardItem({
            [blob.type]: blob
          });
          await navigator.clipboard.write([data]);
        } catch (clipErr) {
          // If ClipboardItem fails, try dataURL approach
          const dataUrl = canvas.toDataURL('image/png');
          await navigator.clipboard.writeText(dataUrl);
          console.warn('Using fallback clipboard method - copied data URL');
        }
      } else {
        // Last resort fallback - copy just the URL
        await navigator.clipboard.writeText(imageUrl);
        console.warn('Using fallback clipboard method - copied URL');
      }
      
      // Show success state
      setActionStates(prev => ({
        ...prev,
        [`copy-${index}`]: true
      }));
      
      setTimeout(() => {
        setActionStates(prev => ({
          ...prev,
          [`copy-${index}`]: false
        }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy image: ', err);
      
      // Ultimate fallback
      try {
        await navigator.clipboard.writeText(imageUrl);
        alert('Image URL copied to clipboard (image copy not supported in this browser)');
        setActionStates(prev => ({
          ...prev,
          [`copy-${index}`]: true
        }));
        
        setTimeout(() => {
          setActionStates(prev => ({
            ...prev,
            [`copy-${index}`]: false
          }));
        }, 2000);
      } catch (finalErr) {
        alert('Failed to copy image. Your browser may not support this feature.');
      }
    }
  };

  // Function to download image
  const downloadImage = async (imageUrl, prompt, index) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-generated-${new Date().getTime()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
      
      // Show success state
      setActionStates(prev => ({
        ...prev,
        [`download-${index}`]: true
      }));
      
      setTimeout(() => {
        setActionStates(prev => ({
          ...prev,
          [`download-${index}`]: false
        }));
      }, 2000);
    } catch (err) {
      console.error('Failed to download image: ', err);
      alert('Failed to download image. Please try again.');
    }
  };

  // Function to share image
  const shareImage = async (imageUrl, prompt, index) => {
    if (navigator.share) {
      try {
        // Try to use Web Share API with file
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], `ai-generated-image.jpg`, { type: blob.type });
        
        await navigator.share({
          title: 'AI Generated Image',
          text: `Check out this AI-generated image based on the prompt: ${prompt}`,
          files: [file]
        });
      } catch (err) {
        console.error('Error sharing with file:', err);
        
        // Fallback to sharing without file if that fails
        try {
          await navigator.share({
            title: 'AI Generated Image',
            text: `Check out this AI-generated image based on the prompt: ${prompt}`,
            url: imageUrl
          });
        } catch (fallbackErr) {
          console.error('Error sharing URL:', fallbackErr);
          // If both fail, copy to clipboard as last resort
          try {
            await navigator.clipboard.writeText(imageUrl);
            alert('Image URL copied to clipboard for sharing');
            
            setActionStates(prev => ({
              ...prev,
              [`share-${index}`]: true
            }));
            
            setTimeout(() => {
              setActionStates(prev => ({
                ...prev,
                [`share-${index}`]: false
              }));
            }, 2000);
          } catch (clipErr) {
            alert('Unable to share image. Please try downloading it instead.');
          }
        }
      }
    } else {
      // Fallback: copy image URL to clipboard if Web Share API not available
      try {
        await navigator.clipboard.writeText(imageUrl);
        setActionStates(prev => ({
          ...prev,
          [`share-${index}`]: true
        }));
        
        setTimeout(() => {
          setActionStates(prev => ({
            ...prev,
            [`share-${index}`]: false
          }));
        }, 2000);
        
        alert('Image URL copied to clipboard for sharing');
      } catch (err) {
        console.error('Failed to copy image URL: ', err);
        alert('Unable to share image. Please try downloading it instead.');
      }
    }
  };

  // Image viewer modal
  const ImageModal = () => {
    if (!expandedItem) return null;
    
    const item = history[expandedItem];
    const imageUrl = item.imageUrl || item.content;
    
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn">
        <div className="relative bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h3 className="text-lg font-medium text-white">Image Preview</h3>
            <button 
              onClick={() => setExpandedItem(null)}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-auto p-4 relative">
            <img
              src={imageUrl}
              alt={`Generated image: ${item.prompt}`}
              className="max-w-full max-h-[70vh] object-contain mx-auto rounded-md"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_IMAGE;
              }}
              crossOrigin="anonymous"
            />
          </div>
          
          <div className="p-4 border-t border-gray-800 bg-gray-950">
            <p className="text-sm text-gray-300 mb-4">{item.prompt}</p>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => downloadImage(imageUrl, item.prompt, expandedItem)}
                className="flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-green-500/30"
              >
                {actionStates[`download-${expandedItem}`] ? (
                  <>
                    <Check className="w-4 h-4 mr-2" /> Downloaded
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" /> Download
                  </>
                )}
              </button>
              
              <button
                onClick={() => shareImage(imageUrl, item.prompt, expandedItem)}
                className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-purple-500/30"
              >
                {actionStates[`share-${expandedItem}`] ? (
                  <>
                    <Check className="w-4 h-4 mr-2" /> Shared
                  </>
                ) : (
                  <>
                    <Share className="w-4 h-4 mr-2" /> Share
                  </>
                )}
              </button>
              
              <button
                onClick={() => copyImageToClipboard(imageUrl, expandedItem)}
                className="flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-blue-500/30"
              >
                {actionStates[`copy-${expandedItem}`] ? (
                  <>
                    <Check className="w-4 h-4 mr-2" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" /> Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-4">
      <h2 className="text-xl font-semibold flex items-center gap-2 text-white/90 mb-4">
        <Clock className="w-5 h-5" />
        Generation History
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {history.map((item, index) => {
          const imageUrl = item.imageUrl || item.content;
          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 hover:shadow-lg hover:shadow-purple-900/10 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex flex-col h-full">
                <div className="p-4 flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-medium text-gray-400">Prompt</span>
                    </div>
                    <span className="text-xs text-gray-500">#{history.length - index}</span>
                  </div>

                  <p className="text-sm text-gray-300 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {item.prompt}
                  </p>
                </div>

                <div className="p-4 pt-0">
                  <div className="relative overflow-hidden rounded-lg bg-gray-950 aspect-video flex items-center justify-center group-hover:ring-1 group-hover:ring-purple-500/30 transition-all duration-300">
                    {imageUrl ? (
                      <>
                        <img
                          src={imageUrl}
                          alt={`Generated image: ${item.prompt}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = FALLBACK_IMAGE;
                          }}
                          crossOrigin="anonymous"
                        />
                        
                        {/* Quick action buttons overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                          <button
                            onClick={() => setExpandedItem(index)}
                            className="bg-gray-900/70 hover:bg-gray-800 p-2 rounded-full text-white transition-all hover:scale-110 hover:shadow-lg"
                            title="Expand image"
                          >
                            <Maximize2 className="w-5 h-5" />
                          </button>
                          
                          <button
                            onClick={() => downloadImage(imageUrl, item.prompt, index)}
                            className="bg-green-800/70 hover:bg-green-700 p-2 rounded-full text-white transition-all hover:scale-110 hover:shadow-lg"
                            title="Download image"
                          >
                            {actionStates[`download-${index}`] ? (
                              <Check className="w-5 h-5" />
                            ) : (
                              <Download className="w-5 h-5" />
                            )}
                          </button>
                          
                          <button
                            onClick={() => copyImageToClipboard(imageUrl, index)}
                            className="bg-blue-800/70 hover:bg-blue-700 p-2 rounded-full text-white transition-all hover:scale-110 hover:shadow-lg"
                            title="Copy image"
                          >
                            {actionStates[`copy-${index}`] ? (
                              <Check className="w-5 h-5" />
                            ) : (
                              <Copy className="w-5 h-5" />
                            )}
                          </button>
                          
                          <button
                            onClick={() => shareImage(imageUrl, item.prompt, index)}
                            className="bg-purple-800/70 hover:bg-purple-700 p-2 rounded-full text-white transition-all hover:scale-110 hover:shadow-lg"
                            title="Share image"
                          >
                            {actionStates[`share-${index}`] ? (
                              <Check className="w-5 h-5" />
                            ) : (
                              <Share className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-xs">No image available</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Image modal for expanded view */}
      <ImageModal />
    </div>
  )
}