import { useState, useEffect, useRef } from "react";
import "./patrons.css";
import { patrons } from "./patronData";

import frameImageLandscape from "../assets/patrons/pixel_frame_gold.png";

export default function Patrons() {
  const [isVisible, setIsVisible] = useState(false);
  const [blockHit, setBlockHit] = useState(false);
  const patronsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => {
              setBlockHit(true);
            }, 500);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (patronsGridRef.current) {
      observer.observe(patronsGridRef.current);
    }

    return () => {
      if (patronsGridRef.current) {
        observer.unobserve(patronsGridRef.current);
      }
    };
  }, []);

  return (
    <section id="patrons-section" className="patrons-container">
      <div className={`welcome-banner ${isVisible ? "visible" : ""}`}>
        <h2>PATRONS UNLOCKED</h2>
      </div>

      <div
        ref={patronsGridRef}
        className={`patrons-grid ${blockHit ? "revealed" : ""}`}
      >
        {patrons.map((patron, index) => (
          <div
            key={index}
            className={`patron-card patron-card-${index} ${patron.type} ${
              blockHit ? "visible" : ""
            }`}
            style={{
              animationDelay: `${index * 0.1 + (blockHit ? 0.8 : 0)}s`,
              opacity: blockHit ? 1 : 0,
              transform: blockHit
                ? "translateY(0)"
                : "translateY(50px) scale(0.8)",
              transition: "all 0.5s ease-out",
            }}
          >
            <div className="frame-container">
              <img
                src={frameImageLandscape}
                alt="Antique Frame"
                className="frame-image"
                loading="lazy"
              />
              <img
                src={patron.image}
                // alt={patron.name}
                className="logo-image"
                loading="lazy"
              />
            </div>

            {/* <h3>{patron.name}</h3> */}
          </div>
        ))}
      </div>
    </section>
  );
}
