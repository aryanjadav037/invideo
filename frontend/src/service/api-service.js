import axios from "axios"

const API_BASE_URL = "http://localhost:5005/api"
const FALLBACK_IMAGE = "https://res.cloudinary.com/dcu9peqwj/image/upload/v1744020286/uploads/f7mhyra5jqojqcavpi8c.jpg"

const apiService = {
  generateImage: async (prompt) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/image/generate`,
        { prompt },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          timeout: 30000, // 30 second timeout
        },
      )

      if (!response.data?.data) {
        throw new Error("Invalid response from server")
      }

      return {
        success: true,
        data: {
          type: "image",
          content: response.data.data,
          prompt: prompt,
          timestamp: new Date().toISOString(),
        },
      }
    } catch (error) {
      console.error("API Error:", error)

      let errorMessage = "Failed to generate image"

      if (error.code === "ECONNABORTED") {
        errorMessage = "Request timed out. Using fallback image."
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      }

      return {
        success: false,
        error: errorMessage,
        fallback: {
          type: "image",
          content: FALLBACK_IMAGE,
          prompt: prompt,
          isFallback: true,
          timestamp: new Date().toISOString(),
        },
      }
    }
  },

  getImageHistory: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/image/history`, {
        withCredentials: true,
        timeout: 10000,
      })

      if (!response.data?.data) {
        throw new Error("Invalid response from server")
      }

      return {
        success: true,
        data: response.data.data,
      }
    } catch (error) {
      console.error("API Error:", error)

      return {
        success: false,
        error: "Failed to fetch image history",
        fallback: [
          {
            id: "1",
            prompt: "A futuristic city with flying cars",
            imageUrl: FALLBACK_IMAGE,
            createdAt: new Date().toISOString(),
          },
          {
            id: "2",
            prompt: "Mountain landscape at sunset",
            imageUrl: FALLBACK_IMAGE,
            createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          },
        ],
      }
    }
  },
}

export default apiService
export { FALLBACK_IMAGE }

