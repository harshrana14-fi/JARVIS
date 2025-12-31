"use client";

import { useEffect, useRef, useState } from "react";
import { FaComments, FaBrain, FaLaptop } from 'react-icons/fa';

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const features = [
    {
      title: "Natural Language Processing",
      description: "JARVIS understands and responds to human language naturally and contextually, just like ChatGPT and Claude.",
      icon: <FaComments size={64} className="text-white" />, // Chat bubble icon
      color: "from-blue-400/10 to-blue-600/10"
    },
    {
      title: "Advanced Reasoning",
      description: "JARVIS can solve complex problems, analyze data, and provide intelligent insights similar to top AI models.",
      icon: <FaBrain size={64} className="text-white" />, // Brain icon
      color: "from-purple-400/10 to-purple-600/10"
    },
    {
      title: "Multi-Platform Support",
      description: "Seamlessly integrates across web, mobile, and desktop applications for consistent AI assistance.",
      icon: <FaLaptop size={64} className="text-white" />, // Laptop/Device icon
      color: "from-green-400/10 to-green-600/10"
    },
  ];

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

            // Animate cards with stagger
            cardsRef.current.forEach((card, index) => {
              if (card) {
                setTimeout(() => {
                  card.style.opacity = '1';
                  card.style.transform = 'translateY(0) rotateX(0)';
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
    setHoveredIndex(null);
  };

  return (
    <section 
      ref={sectionRef}
      id="features" 
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '4s' }} 
        />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '5s', animationDelay: '1s' }} 
        />
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
            <span className="relative z-10 text-white">
              Powerful Features
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
        
        {/* Features Grid - Unique Zigzag Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="relative group"
                style={{
                  opacity: 0,
                  transform: 'translateY(100px) rotateX(-15deg)',
                  transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transformStyle: 'preserve-3d',
                  marginTop: index === 1 ? '3rem' : '0'
                }}
                onMouseMove={(e) => {
                  handleMouseMove(e, index);
                  setHoveredIndex(index);
                }}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {/* Card glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                
                {/* Main card */}
                <div className="relative bg-black/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 group-hover:border-white/30 transition-all duration-500 overflow-hidden">
                  {/* Spotlight effect following mouse */}
                  {hoveredIndex === index && (
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2), transparent 50%)`
                      }}
                    />
                  )}

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full" />
                  
                  {/* Icon with animation */}
                  <div className="relative mb-6 inline-block">
                    <div className="transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      {feature.icon}
                    </div>
                    {/* Icon glow */}
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-0 group-hover:scale-150 transition-transform duration-500" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 text-white relative z-10 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 relative z-10 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Animated border on hover */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" />
                  </div>

                  {/* Bottom accent line - now with solid white */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-700" />
                </div>

                {/* Floating particles around card */}
                {hoveredIndex === index && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animation: `float ${2 + Math.random() * 2}s ease-in-out infinite`,
                          animationDelay: `${Math.random()}s`,
                          opacity: 0.6
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-20 flex justify-center">
          <div className="w-64 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
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

export default Features;