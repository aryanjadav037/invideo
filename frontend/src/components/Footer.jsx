import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaPinterest } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 w-full bottom-0 left-0 z-50 py-8 sm:py-12 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black z-0"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      {/* Grid Lines Background */}
      <div className="absolute inset-0 opacity-5 z-0" 
           style={{
             backgroundImage: "linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)",
             backgroundSize: "50px 50px"
           }}>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto">
        {/* Main Footer Links - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Products Column */}
          <div className="col-span-1">
            <h3 className="font-medium text-white mb-3 sm:mb-4 border-b border-blue-500/30 pb-2 text-sm sm:text-base">Products</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">invideo AI</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">invideo Studio</a></li>
              <li><a href="#" className="text-cyan-400 font-medium hover:text-blue-400 transition-colors duration-300">invideo AI</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">AI Video Generator</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">AI Image Generator</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Animation Maker</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Link to Video</a></li>
            </ul>
          </div>

          {/* invideo Studio Column */}
          <div className="col-span-1">
            <h3 className="font-medium text-white mb-3 sm:mb-4 border-b border-blue-500/30 pb-2 text-sm sm:text-base">invideo Studio</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Online Video Editor</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Video Collage Maker</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Picture Video Maker</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Instagram Video Editor</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Online Video Maker</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Facebook Video Editor</a></li>
              <li className="hidden sm:block"><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Add Music to Video</a></li>
              <li className="hidden sm:block"><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Add Text to GIF</a></li>
            </ul>
          </div>

          {/* Quick Tools Column */}
          <div className="col-span-1">
            <h3 className="font-medium text-white mb-3 sm:mb-4 border-b border-blue-500/30 pb-2 text-sm sm:text-base">Quick Tools</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Rotate Video</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Trim Video</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Cut Video</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Video Compressor</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Video Converter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Screen Recorder</a></li>
            </ul>
          </div>

          {/* Help Column */}
          <div className="col-span-1">
            <h3 className="font-medium text-white mb-3 sm:mb-4 border-b border-blue-500/30 pb-2 text-sm sm:text-base">Help</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Live chat 24/7</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Email Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Tutorials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Youtube Channel</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Instagram Inspiration</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Community</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons - Responsive Spacing */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12">
          <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:scale-110 transform">
            <div className="bg-gray-800/50 p-2 sm:p-3 rounded-full">
              <FaTwitter size={16} className="sm:w-5 sm:h-5" />
            </div>
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors duration-300 hover:scale-110 transform">
            <div className="bg-gray-800/50 p-2 sm:p-3 rounded-full">
              <FaFacebookF size={16} className="sm:w-5 sm:h-5" />
            </div>
          </a>
          <a href="#" className="text-pink-600 hover:text-pink-500 transition-colors duration-300 hover:scale-110 transform">
            <div className="bg-gray-800/50 p-2 sm:p-3 rounded-full">
              <FaInstagram size={16} className="sm:w-5 sm:h-5" />
            </div>
          </a>
          <a href="#" className="text-red-600 hover:text-red-500 transition-colors duration-300 hover:scale-110 transform">
            <div className="bg-gray-800/50 p-2 sm:p-3 rounded-full">
              <FaYoutube size={16} className="sm:w-5 sm:h-5" />
            </div>
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform">
            <div className="bg-gray-800/50 p-2 sm:p-3 rounded-full">
              <FaLinkedinIn size={16} className="sm:w-5 sm:h-5" />
            </div>
          </a>
          <a href="#" className="text-red-500 hover:text-red-400 transition-colors duration-300 hover:scale-110 transform">
            <div className="bg-gray-800/50 p-2 sm:p-3 rounded-full">
              <FaPinterest size={16} className="sm:w-5 sm:h-5" />
            </div>
          </a>
        </div>
        
        {/* Copyright Line */}
        <div className="mt-8 sm:mt-12 text-center text-gray-500 text-xs sm:text-sm border-t border-gray-800 pt-4 sm:pt-6">
          <p>© 2025 invideo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;