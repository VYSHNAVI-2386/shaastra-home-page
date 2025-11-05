import "./about.css";

import React, { useEffect, useRef, useState } from "react";

type Star = {
  id: number;
  size: number;
  top: number;
  right: number;
  duration: number;
  delay: number;
};

const ArcadePixelAbout: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // set visible when intersecting, reset when leaving so animation can replay
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const generateStars = (count: number): Star[] => {
    return Array.from({ length: count }, (_, i) => {
      const size = Math.random() > 0.7 ? 2 : 1;
      const top = Math.random() * 100;
      const right = Math.random() * 50;
      const duration = 8 + Math.random() * 12;
      const delay = Math.random() * 5;

      return {
        id: i,
        size,
        top,
        right,
        duration,
        delay,
      };
    });
  };

  const stars = generateStars(40);

  return (
    <section
      ref={sectionRef}
      className={`relative bottom-40 min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 gap-10  ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="max-w-5xl w-full">
        <h2
          className="font-press text-[#FFD700] text-[clamp(2rem,4vw,4rem)] text-shadow-arcade mb-4 whitespace-nowrap leading-[1.3] tracking-[0.05em] animate-fadeInDown"
          style={{
            textShadow:
              " 3px 3px 0 #A0522D, -3px -3px 0 #A0522D,3px -3px 0 #A0522D, -3px 3px 0 #A0522D",
            textAlign: "center",
            animationDelay: "0.1s",
          }}
        >
          ABOUT
        </h2>

        <div
          className="relative w-full overflow-hidden rounded-lg animate-fadeInUp"
          style={{
            imageRendering: "pixelated",
            animationDelay: "0.2s",
          }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-yellow-400 via-yellow-500 to-orange-500">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 140, 0, 0.3) 2px, rgba(255, 140, 0, 0.3) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 140, 0, 0.3) 2px, rgba(255, 140, 0, 0.3) 4px)",
                backgroundSize: "4px 4px",
              }}
            />
          </div>

          <div className="absolute inset-0 overflow-hidden">
            {stars.map((star) => (
              <div
                key={star.id}
                className="absolute bg-white animate-twinkleMove"
                style={{
                  width: `${star.size * 2}px`,
                  height: `${star.size * 2}px`,
                  top: `${star.top}%`,
                  right: `${star.right}%`,
                  animation: `twinkleMove ${star.duration}s ease-in-out infinite`,
                  animationDelay: `${star.delay}s`,
                  boxShadow: "0 0 4px rgba(255, 255, 255, 0.8)",
                  imageRendering: "pixelated",
                }}
              />
            ))}
          </div>

          <div className="absolute top-10 right-20 w-12 h-12 opacity-40 hidden md:block">
            <div className="grid grid-cols-3 gap-1">
              <div className="w-3 h-3 bg-orange-300"></div>
              <div className="w-3 h-3 bg-yellow-200"></div>
              <div className="w-3 h-3 bg-orange-300"></div>
              <div className="w-3 h-3 bg-yellow-200"></div>
              <div className="w-3 h-3 bg-orange-400"></div>
              <div className="w-3 h-3 bg-yellow-200"></div>
              <div className="w-3 h-3 bg-orange-300"></div>
              <div className="w-3 h-3 bg-yellow-200"></div>
              <div className="w-3 h-3 bg-orange-300"></div>
            </div>
          </div>

          <div className="absolute bottom-20 right-40 w-16 h-16 opacity-30 hidden lg:block">
            <div className="grid grid-cols-4 gap-1">
              {Array.from({ length: 16 }, (_, i) => (
                <div key={i} className="w-3 h-3 bg-orange-400"></div>
              ))}
            </div>
          </div>

          <div className="relative" style={{ imageRendering: "pixelated" }}>
            <div className="flex">
              <div className="w-2 h-2 bg-orange-600"></div>
              <div className="w-2 h-2 bg-orange-600"></div>
              <div className="w-2 h-2 bg-transparent"></div>
              <div className="flex-1 h-2 bg-orange-600"></div>
              <div className="w-2 h-2 bg-transparent"></div>
              <div className="w-2 h-2 bg-orange-600"></div>
              <div className="w-2 h-2 bg-orange-600"></div>
            </div>

            <div className="flex">
              <div className="flex flex-col">
                <div className="w-2 h-2 bg-orange-600"></div>
                <div className="flex-1 w-2 bg-orange-600"></div>
                <div className="w-2 h-2 bg-orange-600"></div>
              </div>

              <div className="w-2 bg-orange-600"></div>

              <div className="   relative flex-1 p-5 sm:p-8 md:p-12 bg-linear-to-br from-yellow-200/60 to-orange-200/40">
                <div
                  className="text-orange-900 text-xl sm:text-2xl md:text-2xl lg:text-2.5xl leading-relaxed space-y-6 animate-fadeIn"
                  style={{
                    fontFamily: "vt323, serif",
                    textShadow: "2px 2px 0px rgba(255, 200, 0, 0.2)",
                    // fontSize: "25px",
                    animationDelay: "0.6s",
                  }}
                >
                  <p className="text-justify">
                    Shaastra is the annual technical festival of the Indian
                    Institute of Technology Madras (IITM), Chennai, India. The
                    Sanskrit word 'Shaastra' means science and the festival
                    accordingly consists of various engineering, science, and
                    technology competitions, summits, lectures, video
                    conferences, exhibitions, demonstrations and workshops. The
                    festival is traditionally held over four days and four
                    nights from 3rd to 7th January. It has so far seen
                    twenty-five editions, having started in its current avatar
                    in the year 2000. Shaastra is entirely student-managed and
                    is the first such event in the world to be ISO 9001:2015
                    certified.
                  </p>
                </div>

                <div
                  className="mt-8 flex justify-center gap-1 flex-wrap animate-fadeIn"
                  style={{
                    animationDelay: "0.6s",
                  }}
                >
                  {Array.from({ length: 20 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 ${
                        i % 2 === 0 ? "bg-orange-500" : "bg-yellow-400"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="w-2 bg-orange-600"></div>

              <div className="flex flex-col">
                <div className="w-2 h-2 bg-orange-600"></div>
                <div className="flex-1 w-2 bg-orange-600"></div>
                <div className="w-2 h-2 bg-orange-600"></div>
              </div>
            </div>

            <div className="flex">
              <div className="w-2 h-2 bg-orange-600"></div>
              <div className="w-2 h-2 bg-orange-600"></div>
              <div className="w-2 h-2 bg-transparent"></div>
              <div className="flex-1 h-2 bg-orange-600"></div>
              <div className="w-2 h-2 bg-transparent"></div>
              <div className="w-2 h-2 bg-orange-600"></div>
              <div className="w-2 h-2 bg-orange-600"></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes twinkleMove {
          0% {
            transform: translateX(0) scale(1);
            opacity: 0.3;
          }
          25% {
            opacity: 1;
          }
          50% {
            transform: translateX(-200px) scale(1.2);
            opacity: 0.8;
          }
          75% {
            opacity: 0.6;
          }
          100% {
            transform: translateX(-400px) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* start with hidden state */
        .animate-fadeInUp,
        .animate-fadeInDown,
        .animate-fadeIn {
          opacity: 0;
          transform: translateY(10px);
        }

        /* play animations when parent has .is-visible */
        .is-visible .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }

        .is-visible .animate-fadeInDown {
          animation: fadeInDown 0.2s ease-out forwards;
        }

        .is-visible .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ArcadePixelAbout;
