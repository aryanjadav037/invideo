import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const dropdowns = {
  ai: {
    title: "Invideo AI",
    titleColor: "text-cyan-400 font-bold",
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
          { to: "/ai-login", text: "AI Login", className: "text-cyan-400 font-bold" },
          { to: "/ai-signup", text: "AI Sign Up", className: "text-purple-500 font-bold" },
        ],
      },
    ],
  },
  studio: {
    title: "Invideo Studio",
    titleColor: "text-blue-400",
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
  developers: {
    title: "Developers",
    titleColor: "text-green-400",
    items: [
      {
        title: "Our Team",
        links: [
          { to: "https://github.com/manangajera", text: "Manan Gajera", externalLink: true },
          { to: "https://github.com/aryanjadav037", text: "Aryan Jadav", externalLink: true },
          { to: "https://github.com/Ayush-desaii", text: "Ayush Desai", externalLink: true },
        ],
      },
      {
        title: "Resources",
        links: [
          { to: "/api-docs", text: "API Documentation" },
          { to: "/developer-guide", text: "Developer Guide" },
          { to: "/github", text: "GitHub Repository" },
        ],
      },
    ],
  },
  help: {
    title: "Help",
    titleColor: "text-purple-400",
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
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileOpen]);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-md shadow-lg shadow-blue-900/20' : 'bg-black/30 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 md:px-10 lg:px-16 h-16">
        
        {/* Logo */}
        <div className="flex-shrink-0 mr-4 sm:mr-10">
          <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">In Video</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-start">
          <ul className="flex space-x-3 lg:space-x-6 font-semibold text-sm lg:text-base">
            {Object.entries(dropdowns).map(([key, { title, titleColor, items }]) => (
              <li
                key={key}
                className="relative group"
              >
                <button 
                  className={`flex items-center ${titleColor} hover:text-white transition-colors duration-300 group`}
                  onClick={() => toggleDropdown(key)}
                  onMouseEnter={() => setOpenDropdown(key)}
                >
                  {title}
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform duration-300 ${openDropdown === key ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown with improved hover behavior */}
                {openDropdown === key && (
                  <div 
                    className="absolute left-0 mt-2 w-64 bg-gray-900/90 backdrop-blur-md rounded-md shadow-lg py-1 z-50 border border-gray-800 shadow-blue-900/20"
                    onMouseEnter={() => setOpenDropdown(key)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {items.map((item, index) => (
                      <div key={index}>
                        {item.title && (
                          <div className="px-4 py-2 border-b border-gray-800">
                            <h3 className="text-sm font-bold text-cyan-400">{item.title}</h3>
                          </div>
                        )}
                        <div className={item.grid ? "grid grid-cols-2 gap-1 p-2" : "px-4 py-2"}>
                          {item.links.map(({ to, text, className, externalLink }, linkIndex) => (
                            externalLink ? (
                              <a
                                key={linkIndex}
                                href={to}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-xs px-4 py-2 hover:bg-blue-900/30 block rounded transition-colors duration-200 ${className || 'text-gray-300'}`}
                              >
                                {text}
                              </a>
                            ) : (
                              <Link
                                key={linkIndex}
                                to={to}
                                className={`text-xs px-4 py-2 hover:bg-blue-900/30 block rounded transition-colors duration-200 ${className || 'text-gray-300'}`}
                              >
                                {text}
                              </Link>
                            )
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}

            {/* Non-dropdown links */}
            <li><Link to="/community" className="text-gray-300 hover:text-white transition-colors duration-300">Community</Link></li>
            <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors duration-300">Pricing</Link></li>
          </ul>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4 font-bold">
          <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-300">Login</Link>
          <Link to="/signup" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold px-4 py-1 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 relative overflow-hidden group">
            <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            <span className="relative">Sign Up</span>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu - Keeping the original structure */}
      {isMobileOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md shadow-lg border-t border-gray-800 max-h-[80vh] overflow-y-auto">
          <ul className="flex flex-col pb-4 px-5 space-y-2">
            {Object.entries(dropdowns).map(([key, { title, titleColor, items }]) => (
              <li key={key} className="w-full">
                <button
                  className={`flex items-center justify-between w-full py-2 ${titleColor || 'text-white'}`}
                  onClick={() => toggleDropdown(key)}
                >
                  <span>{title}</span>
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform duration-300 ${openDropdown === key ? 'rotate-180' : ''}`}
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
                  <div className="ml-4 mt-2 space-y-2 border-l border-blue-800/50 pl-2">
                    {items.map((item, index) => (
                      <div key={index} className="space-y-1">
                        {item.title && (
                          <div className="font-medium text-cyan-400 text-xs pt-2">
                            {item.title}
                          </div>
                        )}
                        <div className={item.grid ? "grid grid-cols-2 gap-x-2 gap-y-1" : "space-y-1"}>
                          {item.links.map(({ to, text, className, externalLink }, linkIndex) => (
                            externalLink ? (
                              <a
                                key={linkIndex}
                                href={to}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block py-1 text-sm ${className || 'text-gray-300'} hover:text-white`}
                              >
                                {text}
                              </a>
                            ) : (
                              <Link
                                key={linkIndex}
                                to={to}
                                className={`block py-1 text-sm ${className || 'text-gray-300'} hover:text-white`}
                                onClick={() => setIsMobileOpen(false)}
                              >
                                {text}
                              </Link>
                            )
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
              <Link 
                to="/community" 
                className="block py-2 text-gray-300 hover:text-white"
                onClick={() => setIsMobileOpen(false)}
              >
                Community
              </Link>
            </li>
            <li>
              <Link 
                to="/pricing" 
                className="block py-2 text-gray-300 hover:text-white"
                onClick={() => setIsMobileOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link 
                to="/login" 
                className="block py-2 text-gray-300 hover:text-white"
                onClick={() => setIsMobileOpen(false)}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="block w-full py-2 text-center text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mt-4"
                onClick={() => setIsMobileOpen(false)}
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