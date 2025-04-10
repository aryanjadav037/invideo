  // src/hooks/useImageGeneration.js
  import { useState, useEffect } from 'react';
  import axios from 'axios';
  const api = import.meta.env.VITE_SERVER_API;;

  export const useImageGeneration = () => {
    // State management
    const [prompt, setPrompt] = useState('');
    const [output, setOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [historyItems, setHistoryItems] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    // Configuration
    const API_ENDPOINT = `${api}/api/image/generate`;
    const HISTORY_ENDPOINT = `${api}/api/image/history`;
    const FALLBACK_IMAGE = 'https://res.cloudinary.com/dcu9peqwj/image/upload/v1744020286/uploads/f7mhyra5jqojqcavpi8c.jpg';

    // Load history on mount
    useEffect(() => {
      fetchHistory();
    }, []);

    // Fetch history from API
    const fetchHistory = async () => {
      setLoadingHistory(true);
      try {
        const response = await axios.get(HISTORY_ENDPOINT, {
          withCredentials: true
        });
        
        if (response.data?.data) {
          setHistoryItems(response.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch history:', err);
        setError('Failed to load history');
      } finally {
        setLoadingHistory(false);
      }
    };

    // Handle image generation via API
    const generateOutput = async () => {
      if (!prompt.trim()) {
        setError('Please enter a prompt');
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
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            timeout: 30000 // 30 second timeout
          }
        );

        if (!response.data?.data) {
          throw new Error('Invalid response from server');
        }

        const newOutput = {
          type: 'image',
          content: response.data.data || FALLBACK_IMAGE,
          prompt: prompt,
          timestamp: new Date().toISOString()
        };
        
        setOutput(newOutput);
        setPrompt('');
        
        // Refresh history after generating new image
        fetchHistory();
        
      } catch (error) {
        console.error('API Error:', error);
        
        // Fallback to test image in case of API failure
        if (error.code === 'ECONNABORTED') {
          setError('Request timed out. Using fallback image.');
        } else {
          setError(error.response?.data?.message || 'API Error. Using fallback image.');
        }
        
        // Show fallback image
        setOutput({
          type: 'image',
          content: FALLBACK_IMAGE,
          prompt: prompt,
          isFallback: true
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Reuse a prompt from history
    const reusePrompt = (promptText) => {
      setPrompt(promptText);
      // Switch to workspace tab by updating state in the parent component
      // This would be handled by setting activeTab to 'workspace' in the parent
    };

    return {
      prompt,
      setPrompt,
      output,
      isLoading,
      error,
      generateOutput,
      historyItems,
      loadingHistory,
      fetchHistory,
      reusePrompt,
      API_ENDPOINT
    };
  };