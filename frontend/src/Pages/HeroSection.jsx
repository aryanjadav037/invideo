import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="scrollable-section bg-black">
      {/* Hero Section with Futuristic Look */}
      <section className="max-w-6xl mx-auto px-4 py-8 sm:py-12 md:py-16 text-center relative overflow-hidden">
        {/* Glowing Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40 z-0"></div>
        <div className="absolute -top-24 -right-24 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        {/* Grid Lines Background Effect */}
        <div className="absolute inset-0 opacity-10 z-0" 
             style={{
               backgroundImage: "linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)",
               backgroundSize: "30px 30px"
             }}>
        </div>
        
        {/* Content with z-index to appear above background effects */}
        <div className="relative z-10">
          {/* Main Headline with Enhanced Gradient - Responsive Font Size */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
              Generate AI Videos
            </span>
            <span className="text-white"> with</span>
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 sm:mb-10">
            <span className="text-white">just </span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">text</span>
          </h1>

          {/* Subtitle with Improved Styling - Responsive Font Size */}
          <p className="text-cyan-300 text-base sm:text-lg md:text-xl mx-auto mb-3 sm:mb-6">
            Transform your imagination into eye-catching videos.
          </p>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl mx-auto mb-6 sm:mb-12 max-w-lg mx-auto">
            Stand out, succeed, and create content that's ready to share and built to stand out.
          </p>

          {/* CTA Button with Futuristic Style */}
          <div className="mb-3">
          <Link 
             to="/signup"
             className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 sm:py-4 px-6 sm:px-10 rounded-full text-base sm:text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 relative overflow-hidden group inline-block text-center"
          >
          <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
          <span className="relative">Generate video now</span>
          </Link>
          </div>

          {/* No Credit Card Text with Updated Style */}
          <p className="text-gray-500 text-xs sm:text-sm">No credit card required</p>
        </div>
      </section>

      {/* Enhanced AI Video Generator Section */}
      <div className="flex justify-center items-center w-full px-4 relative">
        {/* Animated Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10 pointer-events-none"></div>
        
        {/* Container for centering - Responsive Height */}
        <div className="relative h-[200px] sm:h-[250px] md:h-[400px] lg:h-[600px] w-full max-w-[1000px] z-0">
          {/* Video Container with Enhanced Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-md opacity-70 transform scale-[1.02]"></div>
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-lg shadow-lg relative"
            poster="https://assets-static.invideo.io/images/large/Headerwebv30_c4ecb2a66f.webp"
          >
            <source
              src="https://assets-static.invideo.io/files/Invideo_Demo_HP_18_10_2024_V001_1921f1aee3.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Futuristic AI Video Generator Section */}
      <section className="max-w-6xl mx-auto px-4 py-8 sm:py-12 md:py-16 relative">
        {/* Background Subtle Elements */}
        <div className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        {/* Heading with Futuristic Style - Responsive Font Size */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">AI video generator</h2>

        {/* Two Column Content with Enhanced Design - Stacked on Mobile */}
        <div className="flex flex-col md:flex-row items-center bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 shadow-xl shadow-blue-900/20">
          {/* Left Column - Text */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">
              Generate AI videos without a learning curve
            </h3>
            <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
              Type your idea, add the specifics—like length, platform, voiceover
              accent and get AI generated videos that put your ideas into focus.
            </p>
            <button className="border border-blue-400 text-blue-400 py-2 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-blue-900/30 transition-colors relative overflow-hidden group text-sm sm:text-base">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              <span className="relative">Create now</span>
            </button>
          </div>

          {/* Right Column - Video Example with Futuristic UI */}
          <div className="w-full md:w-1/2 p-4">
            <div className="bg-gray-900 rounded-xl overflow-hidden relative border border-gray-800">
              {/* Video Player Mockup - Using aspect ratio for responsiveness */}
              <div className="relative" style={{ paddingBottom: "56.25%" }}> {/* 16:9 Aspect Ratio */}
                <img
                  src="https://ik.imagekit.io/sb8yfmfebk/tr:w-1000/images/large/Text_to_Video_e1c640e46c.webp"
                  alt="Time travel video example"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>

              {/* Enhanced Input Example - Responsive Text */}
              <div className="absolute top-2 sm:top-4 left-0 right-0 mx-auto w-4/5">
                <div className="bg-gray-900/90 backdrop-blur-sm text-white p-2 sm:p-3 rounded-lg flex items-center justify-between border border-blue-500/30">
                  <p className="text-xs sm:text-sm text-blue-100 truncate mr-2">
                    5 min Youtube video of a man travelling through time
                  </p>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 sm:px-4 py-1 rounded flex items-center text-xs sm:text-sm whitespace-nowrap">
                    Generate
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 sm:h-4 sm:w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Enhanced Video Controls Mockup - Responsive Sizing */}
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex items-center">
                <button className="text-blue-400 mr-2 bg-gray-900/50 rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                  </svg>
                </button>
                <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex-grow relative">
                  <div className="absolute -top-1 left-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full shadow-md shadow-blue-500/50"></div>
                </div>
                <span className="text-blue-300 text-xs ml-2 bg-gray-900/50 px-1 sm:px-2 py-0.5 sm:py-1 rounded-md hidden xs:inline-block">01:05 / 02:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;