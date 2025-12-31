"use client";

import { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isScrolled 
          ? "py-4" 
          : "py-6"
      }`}
    >
      <div className={`container mx-auto px-4 transition-all duration-700 ease-out ${
        isScrolled ? "px-6" : ""
      }`}>
        <div className={`flex justify-between items-center transition-all duration-700 ease-out ${
          isScrolled 
            ? "bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 shadow-2xl shadow-white/10" 
            : "bg-transparent px-4 py-2"
        }`}>
          {/* Logo */}
          <div className="flex items-center group cursor-pointer">
            <span className="text-2xl font-bold text-white group-hover:text-white transition-all duration-300 tracking-wide">
              JARVIS
            </span>
            <div className="ml-2 w-2 h-2 rounded-full bg-white group-hover:scale-150 group-hover:shadow-lg group-hover:shadow-white/50 transition-all duration-300"></div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {["Home", "Why Jarvis", "Features", "About"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="relative px-4 py-2 text-gray-300 font-medium group overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  {item}
                </span>
                <div className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300"></div>
              </a>
            ))}
            <a href="/chat" className="relative ml-4 px-6 py-2.5 rounded-full bg-white text-black font-medium overflow-hidden group">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start Chat</span>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 left-0 w-full h-full bg-white/20 blur-xl"></div>
              </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white z-50 relative group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="absolute inset-0 bg-orange-500/30 rounded-lg scale-0 group-hover:scale-150 transition-transform duration-300 blur-md"></div>
            <svg 
              className="w-6 h-6 relative z-10 transform group-hover:scale-110 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-2xl transition-all duration-500 ease-in-out z-40 border-b border-white/10 ${
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 pt-24 pb-8 flex flex-col space-y-2">
          {["Home", "Why Jarvis", "Features", "About" ].map((item, index) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-gray-300 py-3 px-4 rounded-xl group overflow-hidden"
              onClick={() => setIsMenuOpen(false)}
              style={{
                animation: isMenuOpen ? `slideIn 0.3s ease-out ${index * 0.1}s forwards` : 'none',
                opacity: 0
              }}
            >
              <span className="relative z-10 font-medium group-hover:text-white transition-colors duration-300">
                {item}
              </span>
              <div className="absolute inset-0 bg-orange-500/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-orange-400 group-hover:h-3/4 transition-all duration-300"></div>
            </a>
          ))}
          <a 
            href="/chat"
            className="mt-4 px-6 py-3 rounded-full bg-orange-500 text-white font-medium relative overflow-hidden group"
            style={{
              animation: isMenuOpen ? 'slideIn 0.3s ease-out 0.4s forwards' : 'none',
              opacity: 0
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="relative z-10">Start Chat</span>
            <div className="absolute inset-0 bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full blur-md"></div>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;