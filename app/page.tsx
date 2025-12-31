"use client";

import { useState, useEffect, useRef } from "react";
 import Navbar from "../components/Navbar";
 import Features from "../components/features";
 import About from "../components/about";
 import Card from "../components/card";
 import Footer from "../components/footer";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const heroSectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsMounted(true);

    // Animate title letters with stagger
    const letters = titleRef.current?.querySelectorAll('.letter');
    letters?.forEach((letter, index) => {
      setTimeout(() => {
        (letter as HTMLElement).style.opacity = '1';
        (letter as HTMLElement).style.transform = 'translateY(0) rotateX(0) scale(1)';
      }, index * 80);
    });

    // Animate subtitle
    setTimeout(() => {
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = '1';
        subtitleRef.current.style.transform = 'translateY(0)';
      }
    }, 600);

    // Animate description
    setTimeout(() => {
      if (descriptionRef.current) {
        descriptionRef.current.style.opacity = '1';
        descriptionRef.current.style.transform = 'translateY(0)';
      }
    }, 900);

    // Animate CTA
    setTimeout(() => {
      if (ctaRef.current) {
        ctaRef.current.style.opacity = '1';
        ctaRef.current.style.transform = 'translateY(0) scale(1)';
      }
    }, 1200);

    // Continuous floating animation for orbs
    let animationFrameId: number;
    const animateOrbs = () => {
      floatingRefs.current.forEach((el, index) => {
        if (el) {
          const time = Date.now() / 1000;
          const x = Math.sin(time * 0.5 + index * 2) * 30;
          const y = Math.cos(time * 0.3 + index * 2) * 30;
          const scale = 1 + Math.sin(time * 0.4 + index) * 0.15;
          el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        }
      });
      animationFrameId = requestAnimationFrame(animateOrbs);
    };
    animateOrbs();

    // Mouse move parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (clientX - centerX) / 30;
      const moveY = (clientY - centerY) / 30;

      floatingRefs.current.forEach((el, index) => {
        if (el) {
          const multiplier = (index + 1) * 0.3;
          const time = Date.now() / 1000;
          const floatX = Math.sin(time * 0.5 + index * 2) * 30;
          const floatY = Math.cos(time * 0.3 + index * 2) * 30;
          const scale = 1 + Math.sin(time * 0.4 + index) * 0.15;
          el.style.transform = `translate(${floatX + moveX * multiplier}px, ${floatY + moveY * multiplier}px) scale(${scale})`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <Navbar />
      
      {/* Hero section */}
      <section 
        ref={heroSectionRef} 
        id="home" 
        className="min-h-screen bg-black text-white overflow-hidden relative"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          
          {/* Floating orbs with smooth animation */}
          <div 
            ref={(el) => { floatingRefs.current[0] = el; }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            style={{ transition: 'transform 0.1s ease-out' }}
          />
          <div 
            ref={(el) => { floatingRefs.current[1] = el; }}
            className="absolute top-1/3 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"
            style={{ transition: 'transform 0.1s ease-out' }}
          />
          <div 
            ref={(el) => { floatingRefs.current[2] = el; }}
            className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-white/5 rounded-full blur-3xl"
            style={{ transition: 'transform 0.1s ease-out' }}
          />

          {/* Grid overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />

          {/* Scanline effect */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
            }}
          />
        </div>
        
        {/* Hero content */}
        <div className="relative z-10 min-h-screen flex items-center px-6 py-30">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left content */}
              <div className="space-y-8">
                {/* Animated title */}
                <div ref={titleRef} className="relative">
                  <h1 className="text-7xl lg:text-8xl xl:text-9xl font-black leading-none">
                    {'JARVIS'.split('').map((letter, index) => (
                      <span 
                        key={index}
                        className="letter inline-block"
                        style={{
                          opacity: 0,
                          transform: 'translateY(120px) rotateX(-90deg) scale(0.8)',
                          transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          transformOrigin: 'center bottom',
                          display: 'inline-block'
                        }}
                      >
                        {letter}
                      </span>
                    ))}
                  </h1>
                  
                  {/* Animated underline */}
                  <div className="relative mt-6 h-1 w-32 bg-white overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-white"
                      style={{
                        animation: 'shimmer 2s ease-in-out infinite',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)'
                      }}
                    />
                  </div>
                </div>

                {/* Subtitle */}
                <p 
                  ref={subtitleRef}
                  className="text-2xl lg:text-3xl text-gray-400 font-light"
                  style={{
                    opacity: 0,
                    transform: 'translateY(30px)',
                    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  Your Advanced AI Assistant
                </p>

                {/* Description */}
                <div 
                  ref={descriptionRef}
                  className="text-base lg:text-lg text-gray-500 leading-relaxed max-w-2xl"
                  style={{
                    opacity: 0,
                    transform: 'translateY(30px)',
                    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  Experience the future of artificial intelligence with JARVIS - a powerful, intuitive, and responsive AI assistant designed to assist you in every task. Engineered to provide human-like conversations and intelligent assistance.
                </div>

                {/* CTA Buttons */}
                <div 
                  ref={ctaRef}
                  className="flex flex-wrap items-center gap-4"
                  style={{
                    opacity: 0,
                    transform: 'translateY(30px) scale(0.9)',
                    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  <button className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/30">
                    <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                      Start Conversation
                    </span>
                    <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </div>
                  </button>

                  <button className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300 hover:scale-105">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Right side - Decorative elements */}
              <div className="relative hidden lg:flex items-center justify-center h-[600px]">
                {/* Rotating circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute border border-white/5 rounded-full"
                      style={{
                        width: `${250 + i * 80}px`,
                        height: `${250 + i * 80}px`,
                        animation: `spin ${25 + i * 8}s linear infinite ${i % 2 === 0 ? 'normal' : 'reverse'}`
                      }}
                    />
                  ))}
                </div>

                {/* Center glowing dot */}
                <div className="relative z-10">
                  <div className="w-6 h-6 bg-white rounded-full shadow-2xl shadow-white/50 relative">
                    <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-40" />
                    <div className="absolute inset-0 bg-white rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Floating particles */}
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-white/40 rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `float ${2.5 + Math.random() * 3}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 2}s`,
                      opacity: Math.random() * 0.5 + 0.3
                    }}
                  />
                ))}

                {/* Orbital lines */}
                {[...Array(3)].map((_, i) => (
                  <div
                    key={`line-${i}`}
                    className="absolute"
                    style={{
                      width: `${300 + i * 100}px`,
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      animation: `rotate ${10 + i * 5}s linear infinite`,
                      transformOrigin: 'center'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All your other sections remain unchanged */}
       <Card /> 
       <Features /> 
       <About /> 
       <Footer /> 

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-25px) translateX(5px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
}