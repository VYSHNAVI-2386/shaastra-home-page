import { useState, useEffect, useRef } from "react";
import "./patrons.css";
import { patrons } from "./patronData";

import frameImageLandscape from "../../assets/patrons/pixel_frame_gold.png";

export default function Patrons() {
  // Show patrons immediately with no waiting time
  const [isVisible, setIsVisible] = useState(true);
  const [blockHit, setBlockHit] = useState(true);
  const patronsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // mark the banner visible immediately
            setIsVisible(true);
            // reveal the blocks shortly after (very small delay for nicer sequencing)
            setTimeout(() => {
              setBlockHit(true);
            }, 100); // reduced from 500ms to 100ms
            observer.disconnect();
          }
        });
      },
      // more sensitive so the section reveals just before it fully scrolls into view
      { threshold: 0.05, rootMargin: "0px 0px -20% 0px" }
    );

    const el = patronsGridRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
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
              // no stagger: show all cards immediately
              animationDelay: `0s`,
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
