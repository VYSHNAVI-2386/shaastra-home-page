// import { useState, useEffect } from 'react';
import './title.css';

export default function ShaastraTitle() {
//   const [scrollProgress, setScrollProgress] = useState(0);

//   const scale = 1 + (scrollProgress * 2.5);
//   const opacity = 1 - (scrollProgress * 1.2);
//   const blur = scrollProgress * 8;

  const titleText = "SHAASTRA";
  const letters = titleText.split('');

  return (
    <>
      <div 
        className="hero-section"
        // style={{
        //   opacity: opacity > 0 ? 1 : 0,
        //   pointerEvents: scrollProgress >= 0.95 ? 'none' : 'auto'
        // }}
      >
        <div 
          className="title-container"
          style={{
            // transform: `scale(${scale})`,
            // opacity: Math.max(0, opacity),
            // filter: `blur(${blur}px)`
          }}
        >
          <h1 className="title">
            {letters.map((letter, index) => (
              <span key={index} className="letter">
                {letter}
              </span>
            ))}
          </h1>
          <p className="subtitle">ARTIFACTS OF ARCADE</p>
        </div>
      </div>
      
      <div className="spacer"></div>
    </>
  );
}