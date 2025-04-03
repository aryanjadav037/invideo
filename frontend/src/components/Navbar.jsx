import React, { useState } from "react";
import { Link } from "react-router-dom";

const dropdowns = {
  ai: {
    title: "Invideo AI",
    titleColor: "text-[#ff356d] font-bold",
    items: [
      {
        title: "AI Video Generator",
        grid: true,
        links: [
          { to: "/ai-image", text: "AI Image Generator" },
          { to: "/animation", text: "Animation Maker" },
          { to: "/link-video", text: "Link to Video" },
          { to: "/movie-maker", text: "Movie Maker" },
          { to: "/video-meme", text: "AI Video Meme Generator" },
          { to: "/tiktok", text: "TikTok Video Maker" },
          { to: "/clip", text: "AI Clip Generator" },
          { to: "/youtube-shorts", text: "YouTube Shorts Maker" },
          { to: "/subtitles", text: "AI Subtitle Generator" },
          { to: "/voiceover", text: "Voiceover Generator" },
          { to: "/slideshow", text: "Slideshow Maker" },
        ],
      },
      {
        links: [
          { to: "/ai-login", text: "AI Login", className: "text-[#ff356d] font-bold" },
          { to: "/ai-signup", text: "AI Sign Up", className: "text-[#ff356d] font-bold" },
        ],
      },
    ],
  },
  studio: {
    title: "Invideo Studio",
    titleColor: "text-[#848282]",
    items: [
      {
        title: "Studio Features",
        grid: true,
        links: [
          { to: "/editor", text: "Video Editor" },
          { to: "/templates", text: "Templates" },
          { to: "/collaboration", text: "Team Collaboration" },
          { to: "/storage", text: "Cloud Storage" },
        ],
      },
    ],
  },
  help: {
    title: "Help",
    titleColor: "text-[#999595]",
    items: [
      {
        links: [
          { to: "/documentation", text: "Documentation" },
          { to: "/tutorials", text: "Video Tutorials" },
          { to: "/contact", text: "Contact Support" },
          { to: "/faq", text: "FAQ" },
        ],
      },
    ],
  },
};

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <nav className="bg-[#fcfcfc] shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-10 md:px-20 lg:px-30 h-14">
        
        {/* Logo */}
        <div className="flex-shrink-0 mr-10">
          <h1 className="text-xl font-bold text-black">My App</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-start">
          <ul className="flex space-x-6  font-semibold">
            {Object.entries(dropdowns).map(([key, { title, titleColor, items }]) => (
              <li
                key={key}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(key)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className={`flex items-center ${titleColor} hover:text-blue-500`}>
                  {title}
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${openDropdown === key ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                {openDropdown === key && (
                  <div className="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                    {items.map((item, index) => (
                      <div key={index}>
                        {item.title && (
                          <div className="px-4 py-2 border-b border-gray-100">
                            <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                          </div>
                        )}
                        <div className={item.grid ? "grid grid-cols-2 gap-1 p-2" : "px-4 py-2"}>
                          {item.links.map(({ to, text, className }, linkIndex) => (
                            <Link
                              key={linkIndex}
                              to={to}
                              className={`text-xs px-4 py-2 hover:bg-gray-50 block ${className || 'text-gray-700'}`}
                            >
                              {text}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}

            {/* Non-dropdown links */}
            <li><Link to="/community" className="text-[#999595] hover:text-blue-500">Community</Link></li>
            <li><Link to="/pricing" className="text-[#999595] hover:text-blue-500">Pricing</Link></li>
          </ul>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4 font-bold">
          <Link to="/login" className="text-[#999595] rounded">Login</Link>
          <Link to="/signup" className="text-blue-500 font-bold px-2 border-2 border-blue-500 rounded-xl hover:bg-black hover:text-white transition">
            Sign Up
          </Link> 
        </div>
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-black focus:outline-none"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-white shadow-lg">
          {/* <div className="flex justify-end p-4">
            <button
              onClick={() => {
                setIsMobileOpen(false);
                setOpenDropdown(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div> */}
          <ul className="flex flex-col pb-4 px-5 space-y-2">
            {Object.entries(dropdowns).map(([key, { title, titleColor, items }]) => (
              <li key={key} className="w-full">
                <button
                  className={`flex items-center justify-between w-full py-2 ${titleColor || 'text-black'}`}
                  onClick={() => toggleDropdown(key)}
                >
                  <span>{title}</span>
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${openDropdown === key ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Submenu */}
                {openDropdown === key && (
                  <div className="ml-4 mt-2 space-y-2 border-l border-gray-200 pl-2">
                    {items.map((item, index) => (
                      <div key={index} className="space-y-1">
                        {item.title && (
                          <div className="font-medium text-gray-500 text-xs pt-2">
                            {item.title}
                          </div>
                        )}
                        <div className="space-y-1">
                          {item.links.map(({ to, text, className }, linkIndex) => (
                            <Link
                              key={linkIndex}
                              to={to}
                              className={`block py-1 text-sm ${className || 'text-gray-700'}`}
                              onClick={() => setIsMobileOpen(false)}
                            >
                              {text}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}

            {/* Non-dropdown links */}
            <li>
              <Link to="/community" className="block py-2 text-black">Community</Link>
            </li>
            <li>
              <Link to="/pricing" className="block py-2 text-black">Pricing</Link>
            </li>
            <li>
              <Link to="/login" className="block py-2 text-black">Login</Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="block w-full py-2 text-center text-black border border-black rounded hover:bg-black hover:text-white transition"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;