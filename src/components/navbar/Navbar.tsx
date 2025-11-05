import { useRef, useEffect } from "react";
import Menu from "./Menu";
import "./Navbar.css";

interface NavbarProps {
  menuOpened: boolean;
  setMenuOpened: (opened: boolean) => void;
}

export default function Navbar({ menuOpened, setMenuOpened }: NavbarProps) {
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

  const pixelBtnClass = "bg-gradient-to-b from-white to-gray-300 border-4 border-[#2C2D34] px-12 py-6 my-2 text-xl cursor-pointer shadow-[inset_0_2px_0_rgba(255,255,255,0.8),inset_0_-2px_0_rgba(0,0,0,0.3),0_4px_0_#1a1a1a,0_6px_8px_rgba(0,0,0,0.4)] transition-all duration-100 text-[#2C2D34] min-w-[200px] text-center rounded-lg relative outline outline-3 outline-white outline-offset-[-8px] hover:bg-gradient-to-b hover:from-[#F2D027] hover:to-[#EFD510] hover:translate-y-0.5 hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.9),inset_0_-2px_0_rgba(0,0,0,0.2),0_2px_0_#1a1a1a,0_4px_6px_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-[inset_0_2px_0_rgba(0,0,0,0.2),inset_0_-1px_0_rgba(255,255,255,0.3),0_1px_0_#1a1a1a]";

  return (
    <>
      <nav style={{ zIndex: 9999 }} className="fixed top-0 left-0 w-full pointer-events-auto">
        <div className="flex px-5 justify-between items-center">
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
              className={pixelBtnClass}
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              SALES
            </button>
          </div>

          {/* Right side buttons */}
          <div className="flex gap-4">
            <button 
              onClick={() => handleButtonClick()}
              className={pixelBtnClass}
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              BROCHURE
            </button>
            
            <button 
              onClick={() => handleButtonClick()}
              className={pixelBtnClass}
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              LOGIN
            </button>
          </div>
        </div>
      </nav>

      {menuOpened && (
        <div style={{ zIndex: 10000 }} className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center backdrop-blur-[5px]">
          <div style={{ zIndex: 9998 }} className="w-full h-full absolute" onClick={() => setMenuOpened(false)}></div>
          <div style={{ zIndex: 9999 }} className="absolute"><Menu setMenuOpened={setMenuOpened} /></div>
        </div>
      )}
    </>
  );
}