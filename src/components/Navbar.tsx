// import { useState } from "react";
// import Menu from "./Menu";

// export default function Navbar() {
//   const [menuOpened, setMenuOpened] = useState(false);

//   return (
//     <>
//       <nav>
//         <div className="flex fixed top-0 left-0 z-100 px-5">
//           <button
//             onClick={() => {
//               setMenuOpened(!menuOpened);
//               console.log(menuOpened);
//             }}
//             className="hover:cursor-pointer hover:scale-95 hover:rotate-90 transition-transform duration-300 ease-in-out p-2 m-2 rounded-full shadow-lg"
//           >
//             <img src="/pauseimg.png" alt="Menu" className="w-30 h-30" />
//           </button>
//         </div>
//       </nav>

//       {menuOpened && (
//         <>
//           <div className="absolute z-1000 top-0 left-0 w-screen h-screen flex items-center justify-center backdrop-blur-[5px]">
//             <div className="w-full h-full absolute z-99" onClick={() => setMenuOpened(false)}></div>
//             <div className="absolute z-100"><Menu setMenuOpened={setMenuOpened} /></div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }


import { useState, useRef, useEffect } from "react";
import Menu from "./Menu";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpened, setMenuOpened] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize Audio Context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
  }, []);

  // Same sound effect as Menu component
  const playSelectSound = (): void => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;

    // Two-tone select sound
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.type = "square";
    osc2.type = "square";
    osc1.frequency.value = 523;
    osc2.frequency.value = 659;

    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime + 0.05);
    osc1.stop(ctx.currentTime + 0.15);
    osc2.stop(ctx.currentTime + 0.15);
  };

  const handleButtonClick = (callback?: () => void): void => {
    playSelectSound();
    if (callback) callback();
  };

  return (
    <>
      <nav>
        <div className="flex fixed top-0 left-0 right-0 z-100 px-5 justify-between items-center">
          {/* Left side buttons */}
          <div className="flex gap-4 items-center">
            <button
              onClick={() => {
                handleButtonClick(() => setMenuOpened(!menuOpened));
                console.log(menuOpened);
              }}
              className="hover:cursor-pointer hover:scale-95 hover:rotate-90 transition-transform duration-300 ease-in-out p-2 m-2 rounded-full shadow-lg"
            >
              <img src="/pauseimg.png" alt="Menu" className="w-30 h-30" />
            </button>
            
            <button 
              onClick={() => handleButtonClick()}
              className="pixel-btn"
            >
              SALES
            </button>
          </div>

          {/* Right side buttons */}
          <div className="flex gap-4">
            <button 
              onClick={() => handleButtonClick()}
              className="pixel-btn"
            >
              BROCHURE
            </button>
            
            <button 
              onClick={() => handleButtonClick()}
              className="pixel-btn"
            >
              LOGIN
            </button>
          </div>
        </div>
      </nav>

      {menuOpened && (
        <>
          <div className="absolute z-1000 top-0 left-0 w-screen h-screen flex items-center justify-center backdrop-blur-[5px]">
            <div className="w-full h-full absolute z-99" onClick={() => setMenuOpened(false)}></div>
            <div className="absolute z-100"><Menu setMenuOpened={setMenuOpened} /></div>
          </div>
        </>
      )}
    </>
  );
}