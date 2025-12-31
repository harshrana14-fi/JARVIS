"use client";

import { useEffect, useRef } from "react";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate title
            if (titleRef.current) {
              titleRef.current.style.opacity = '1';
              titleRef.current.style.transform = 'translateY(0)';
            }

            // Animate content
            if (contentRef.current) {
              contentRef.current.style.opacity = '1';
              contentRef.current.style.transform = 'translateY(0)';
            }

            // Animate stats with stagger
            statsRef.current.forEach((stat, index) => {
              if (stat) {
                setTimeout(() => {
                  stat.style.opacity = '1';
                  stat.style.transform = 'translateY(0) scale(1)';
                }, index * 200);
              }
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
      </div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-20">
            <h2 
              ref={titleRef}
              className="text-5xl md:text-7xl font-black mb-6 relative inline-block"
              style={{
                opacity: 0,
                transform: 'translateY(50px)',
                transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <span className="text-white">
                About JARVIS
              </span>
              {/* Glowing underline */}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
            </h2>
            
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-white/50"
                  style={{
                    animation: `pulse 1.5s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div 
            ref={contentRef}
            className="max-w-3xl mx-auto text-center mb-24"
            style={{
              opacity: 0,
              transform: 'translateY(50px)',
              transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: '0.3s'
            }}
          >
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              JARVIS is an advanced artificial intelligence system designed to assist, inform, and enhance your daily life. Built with cutting-edge technology and powered by state-of-the-art machine learning algorithms, JARVIS represents the future of human-computer interaction. Comparable to leading AI assistants like Claude and ChatGPT, JARVIS offers human-like conversations and intelligent assistance.
            </p>
          </div>
          
         
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </section>
  );
};

export default About;