import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaPinterest } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[#fcfcfc] shadow-md w-full bottom-0 left-0  z-50 py-12 px-4 md:px-8 lg:px-16">
      <div className="">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
          {/* Products Column */}
          <div className="col-span-1">
            <h3 className="font-medium text-gray-700 mb-4">Products</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">invideo AI</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">invideo Studio</a></li>
              <li><a href="#" className="text-pink-500 font-medium hover:text-pink-600">invideo AI</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">AI Video Generator</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">AI Image Generator</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Animation Maker</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Link to Video</a></li>
            </ul>
          </div>

          {/* invideo Studio Column */}
          <div className="col-span-1">
            <h3 className="font-medium text-gray-700 mb-4">invideo Studio</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Online Video Editor</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Video Collage Maker</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Picture Video Maker</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Instagram Video Editor</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Online Video Maker</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Facebook Video Editor</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Add Music to Video</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Add Text to GIF</a></li>
            </ul>
          </div>

          {/* Quick Tools Column */}
          <div className="col-span-1">
            <h3 className="font-medium text-gray-700 mb-4">Quick Tools</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Rotate Video</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Trim Video</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Cut Video</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Video Compressor</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Video Converter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Screen Recorder</a></li>
            </ul>
          </div>

          {/* Help Column */}
          <div className="col-span-1">
            <h3 className="font-medium text-gray-700 mb-4">Help</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Live chat 24/7</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Email Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Tutorials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Youtube Channel</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Instagram Inspiration</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Community</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mt-12">
          <a href="#" className="text-blue-400 hover:text-blue-500">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-700">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="text-pink-600 hover:text-pink-700">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="text-red-600 hover:text-red-700">
            <FaYoutube size={20} />
          </a>
          <a href="#" className="text-blue-700 hover:text-blue-800">
            <FaLinkedinIn size={20} />
          </a>
          <a href="#" className="text-red-500 hover:text-red-600">
            <FaPinterest size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;