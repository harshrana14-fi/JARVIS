import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef
} from 'react';

// Inline minimal GSAP-like animation
const animate = (el: HTMLElement, props: any, duration: number) => {
  const start = performance.now();
  const initial: any = {};
  
  Object.keys(props).forEach(key => {
    if (key === 'x' || key === 'y' || key === 'z') {
      initial[key] = parseFloat(el.style.transform.match(new RegExp(`translate${key.toUpperCase()}\\(([^)]+)`))?.[1] || '0');
    }
  });

  const step = (timestamp: number) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
    
    let transform = 'translate(-50%, -50%)';
    if (props.x !== undefined) transform += ` translateX(${initial.x + (props.x - initial.x) * eased}px)`;
    if (props.y !== undefined) transform += ` translateY(${initial.y + (props.y - initial.y) * eased}px)`;
    if (props.z !== undefined) transform += ` translateZ(${initial.z + (props.z - initial.z) * eased}px)`;
    
    el.style.transform = transform;
    if (props.zIndex !== undefined) el.style.zIndex = props.zIndex;
    
    if (progress < 1) requestAnimationFrame(step);
  };
  
  requestAnimationFrame(step);
};

interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  children: ReactNode;
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-2xl border border-white/20 bg-gradient-to-br from-zinc-900 to-black backdrop-blur-xl shadow-2xl [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
  />
));
Card.displayName = 'Card';

type CardRef = RefObject<HTMLDivElement | null>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: Slot) => {
  el.style.transform = `translate(-50%, -50%) translateX(${slot.x}px) translateY(${slot.y}px) translateZ(${slot.z}px)`;
  el.style.zIndex = slot.zIndex.toString();
};

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  children
}) => {
  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
  const refs = useMemo<CardRef[]>(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);
  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));
  const intervalRef = useRef<number>(0);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current!, makeSlot(i, cardDistance, verticalDistance, total)));

    const swap = () => {
      if (order.current.length < 2) return;
      const [front, ...rest] = order.current;
      const elFront = refs[front].current!;

      animate(elFront, { y: 500 }, 800);
      
      setTimeout(() => {
        rest.forEach((idx, i) => {
          const el = refs[idx].current!;
          const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
          el.style.zIndex = slot.zIndex.toString();
          animate(el, { x: slot.x, y: slot.y, z: slot.z }, 800);
        });

        const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
        setTimeout(() => {
          elFront.style.zIndex = backSlot.zIndex.toString();
          animate(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z }, 800);
          order.current = [...rest, front];
        }, 400);
      }, 400);
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);
    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) }
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div
      ref={container}
      className="relative"
      style={{ width, height, perspective: '900px' }}
    >
      {rendered}
    </div>
  );
};

// Main Section Component
const JarvisSection = () => {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden py-20 px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
      
      {/* Content Container */}
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                Why Choose
                <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  JARVIS?
                </span>
              </h2>
              <div className="h-1 w-20 bg-white"></div>
            </div>

            <p className="text-xl text-gray-400 leading-relaxed">
              Experience the next generation of AI-powered assistance that adapts to your needs and amplifies your productivity.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "Lightning Fast",
                  description: "Process requests in milliseconds with our advanced AI engine"
                },
                {
                  title: "Always Learning",
                  description: "Continuously improving through machine learning algorithms"
                },
                {
                  title: "Secure & Private",
                  description: "Enterprise-grade security keeping your data safe"
                },
                {
                  title: "24/7 Available",
                  description: "Round-the-clock assistance whenever you need it"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 group cursor-pointer"
                >
                  <div className="mt-1 w-2 h-2 rounded-full bg-white group-hover:scale-150 group-hover:shadow-lg group-hover:shadow-white/50 transition-all duration-300"></div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-gray-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 group-hover:text-gray-400 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-8 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20">
              Explore Features
            </button>
          </div>

          {/* Right Side - Card Animation */}
          <div className="relative h-[600px] lg:h-[700px] flex items-center">
            <CardSwap
              width={550}
              height={500}
              cardDistance={50}
              verticalDistance={60}
              delay={4000}
            >
              <Card>
                <div className="w-full h-full p-8 flex flex-col">
                  <div className="flex-1">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Instant Responses</h3>
                    <p className="text-gray-400 mb-6">Get answers in real-time with our cutting-edge AI technology that understands context and nuance.</p>
                  </div>
                  <div className="mt-auto">
                    <div className="w-full h-40 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center">
                      <span className="text-gray-600 text-sm">Image Placeholder</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-4">01</div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="w-full h-full p-8 flex flex-col">
                  <div className="flex-1">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Bank-Level Security</h3>
                    <p className="text-gray-400 mb-6">Your data is protected with end-to-end encryption and advanced security protocols.</p>
                  </div>
                  <div className="mt-auto">
                    <div className="w-full h-40 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center">
                      <span className="text-gray-600 text-sm">Image Placeholder</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-4">02</div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="w-full h-full p-8 flex flex-col">
                  <div className="flex-1">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Smart Integration</h3>
                    <p className="text-gray-400 mb-6">Seamlessly connects with your favorite tools and platforms for maximum efficiency.</p>
                  </div>
                  <div className="mt-auto">
                    <div className="w-full h-40 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center">
                      <span className="text-gray-600 text-sm">Image Placeholder</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-4">03</div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="w-full h-full p-8 flex flex-col">
                  <div className="flex-1">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Fully Customizable</h3>
                    <p className="text-gray-400 mb-6">Tailor JARVIS to your specific workflow and preferences for a personalized experience.</p>
                  </div>
                  <div className="mt-auto">
                    <div className="w-full h-40 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center">
                      <span className="text-gray-600 text-sm">Image Placeholder</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-4">04</div>
                  </div>
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </section>
  );
};

export default JarvisSection;