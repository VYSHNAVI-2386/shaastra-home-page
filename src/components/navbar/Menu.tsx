import React, { useState, useEffect, useCallback } from "react";
import { Volume2, VolumeX, ChevronRight } from "lucide-react";

interface GameItem {
  name: string;
  link: string;
  icon: string;
}

interface Props {
  setMenuOpened: any
}

const Menu = ({setMenuOpened}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [pressedKeys, setPressedKeys] = useState<Record<string, boolean>>({});
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const audioContextRef = React.useRef<AudioContext | null>(null);

  // Initialize Audio Context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
  }, []);

  // Sound effect functions
  const playSound = (
    frequency: number,
    duration: number,
    type: OscillatorType = "square"
  ) => {
    if (!soundOn || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      ctx.currentTime + duration
    );

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  };

  const playNavigateSound = () => {
    playSound(400, 0.05);
  };

  const playSelectSound = () => {
    if (!soundOn || !audioContextRef.current) return;
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

  const games: GameItem[] = [
    { name: "HOME", link: "/#", icon: "👾" },
    { name: "SALES", link: "/#", icon: "🧩" },
    { name: "PASSPORT", link: "/#", icon: "🏎️" },
    { name: "ACCOMODATION", link: "/#", icon: "🏃" },
    { name: "ABOUT US", link: "/#", icon: "ℹ️" },
    { name: "CONTACT", link: "/#", icon: "✉️" },
  ];

  // Auto-scroll to selected item
  useEffect(() => {
    const item = itemRefs.current[selectedIndex];
    const menu = menuRef.current;
    if (item && menu) {
      const itemTop = item.offsetTop;
      const itemBottom = itemTop + item.offsetHeight;
      const menuTop = menu.scrollTop;
      const menuBottom = menuTop + menu.clientHeight;

      if (itemTop < menuTop) {
        menu.scrollTo({ top: itemTop - 10, behavior: "smooth" });
      } else if (itemBottom > menuBottom) {
        menu.scrollTo({
          top: itemBottom - menu.clientHeight + 10,
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex]);

  // Handle keyboard input
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      setPressedKeys((prev) => ({ ...prev, [e.key]: true }));

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          playNavigateSound();
          return prev > 0 ? prev - 1 : games.length - 1;
        });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          playNavigateSound();
          return prev < games.length - 1 ? prev + 1 : 0;
        });
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        playSelectSound();
        setTimeout(() => {
          window.location.href = games[selectedIndex].link;
        }, 200);
      }
    },
    [selectedIndex, games, soundOn]
  );

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    setPressedKeys((prev) => ({ ...prev, [e.key]: false }));
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const handleGameClick = (index: number) => {
    playNavigateSound();
    setSelectedIndex(index);
  };

  const handleGameSelect = (link: string) => {
    playSelectSound();
    setTimeout(() => {
      window.location.href = link;
    }, 200);
  };

  // return (
  //     <div
  //       className="font-mono relative"
  //       style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
  //     >
  //       {/* Console body */}
  //       <div className="relative flex flex-col justify-between md:w-120 w-[95vw] md:h-auto h-[95vh] overflow-hidden p-5 bg-gradient-to-b from-sky-400 to-sky-600 rounded-[2rem] border-[6px] border-yellow-400 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
  //         {/* Light reflection on body */}
  //         <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_70%)] pointer-events-none"></div>

  //         {/* Screen bezel */}
  //         <div
  //           className="bg-black p-3 rounded-lg mb-5 relative"
  //           style={{
  //             boxShadow:
  //               "inset 0 2px 8px rgba(0,0,0,0.7), 0 4px 12px rgba(0,0,0,0.3)",
  //           }}
  //         >
  //           {/* Bezel reflection */}
  //           <div className="absolute inset-0 rounded-lg bg-[linear-gradient(145deg,rgba(255,255,255,0.15)_0%,transparent_60%)] pointer-events-none"></div>

  //           <div className="text-white ml-4 font-semibold tracking-wider drop-shadow-sm">
  //             SHAASTRA 2026
  //           </div>

  //           {/* Screen container */}
  //           <div className="bg-black p-1 rounded relative overflow-hidden shadow-inner">
  //             <div
  //               className="w-full h-[250px] bg-[#9ca38f] relative overflow-hidden rounded-sm"
  //               style={{
  //                 boxShadow:
  //                   "inset 0 0 30px rgba(0,0,0,0.4), 0 0 8px rgba(255,255,255,0.05)",
  //               }}
  //             >
  //               {/* Screen glare */}
  //               <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.3),transparent_70%)] pointer-events-none"></div>

  //               {/* Scanlines */}
  //               <div
  //                 className="absolute inset-0 pointer-events-none z-10"
  //                 style={{
  //                   background:
  //                     "repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)",
  //                 }}
  //               ></div>

  //               {/* Menu */}
  //               <div
  //                 ref={menuRef}
  //                 className="w-full h-full p-3 overflow-y-auto relative z-[5]"
  //               >
  //                 <div className="text-center mb-3 pb-2 border-b-2 border-[#0f380f]">
  //                   <div className="text-lg font-bold text-[#0f380f] drop-shadow-[0_1px_0_rgba(255,255,255,0.2)]">
  //                     GAME SELECT
  //                   </div>
  //                 </div>

  //                 <div className="space-y-1">
  //                   {games.map((game, index) => (
  //                     <div
  //                       key={index}
  //                       ref={(el) => {
  //                         itemRefs.current[index] = el;
  //                       }}
  //                       onClick={() => {
  //                         handleGameClick(index);
  //                         handleGameSelect(game.link);
  //                       }}
  //                       className={`flex items-center justify-between px-2 py-1.5 rounded cursor-pointer transition-all ${
  //                         selectedIndex === index
  //                           ? "bg-[#0f380f] text-[#9ca38f] shadow-inner"
  //                           : "text-[#0f380f] hover:bg-[#0f380f]/10"
  //                       }`}
  //                     >
  //                       <div className="flex items-center gap-2">
  //                         <span className="text-sm">{game.icon}</span>
  //                         <span className="text-xs font-bold">{game.name}</span>
  //                       </div>
  //                       {selectedIndex === index && (
  //                         <ChevronRight
  //                           size={12}
  //                           className="animate-pulse text-[#9ca38f]"
  //                         />
  //                       )}
  //                     </div>
  //                   ))}
  //                 </div>

  //                 <div className="mt-4 text-center">
  //                   <div className="text-[8px] text-[#0f380f] animate-pulse">
  //                     PRESS A TO SELECT
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Controls */}
  //         <div className="flex justify-between items-center mt-5 px-5">
  //           {/* D-Pad */}
  //           <div className="flex items-center justify-center">
  //             <div className="w-35 h-35 grid grid-cols-3 grid-rows-3 gap-0.5">
  //               {["ArrowUp", "ArrowLeft", "ArrowRight", "ArrowDown"].map(
  //                 (key, idx) => {
  //                   const positions = [
  //                     { col: "2", row: "1", cls: "rounded-t" },
  //                     { col: "1", row: "2", cls: "rounded-l" },
  //                     { col: "3", row: "2", cls: "rounded-r" },
  //                     { col: "2", row: "3", cls: "rounded-b" },
  //                   ];
  //                   const { col, row, cls } = positions[idx];
  //                   return (
  //                     <button
  //                       key={key}
  //                       onMouseDown={playNavigateSound}
  //                       className={`dpad-button-color border-none cursor-pointer transition-all duration-100 ${cls} ${
  //                         pressedKeys[key]
  //                           ? "translate-y-px shadow-inner"
  //                           : "shadow-md"
  //                       }`}
  //                       style={{
  //                         gridColumn: col,
  //                         gridRow: row,
  //                         background: "linear-gradient(145deg, #222, #111)",
  //                         boxShadow: pressedKeys[key]
  //                           ? "inset 0 1px 2px rgba(0,0,0,0.5)"
  //                           : "0 4px 8px rgba(0,0,0,0.6), inset -2px -2px 3px rgba(255,255,255,0.1)",
  //                       }}
  //                     ></button>
  //                   );
  //                 }
  //               )}
  //               <div
  //                 className="dpad-button-color"
  //                 style={{
  //                   gridColumn: "2",
  //                   gridRow: "2",
  //                   background: "linear-gradient(145deg, #222, #111)",
  //                   boxShadow:
  //                     "inset -2px -2px 3px rgba(255,255,255,0.1), inset 2px 2px 4px rgba(0,0,0,0.5)",
  //                 }}
  //               ></div>
  //             </div>
  //           </div>

  //           {/* Action buttons */}
  //           <div className="grid grid-cols-1 grid-rows-3 w-30 h-30 relative">
  //             <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none rounded-full"></div>

  //             <div className="w-full flex justify-around">
  //               <button
  //                 className={`rounded-full w-10 h-10 bg-gray-800 flex items-center justify-center text-white cursor-pointer font-bold transition-all duration-100 ${
  //                   pressedKeys[" "] ? "translate-y-0.5" : ""
  //                 }`}
  //                 style={{
  //                   boxShadow: pressedKeys[" "]
  //                     ? "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(0,0,0,0.3)"
  //                     : "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
  //                 }}
  //               >
  //                 X
  //               </button>
  //             </div>
  //             <div className="w-full flex justify-between">
  //               <button
  //                 className={`rounded-full w-10 h-10 bg-gray-800 flex items-center justify-center text-white cursor-pointer font-bold transition-all duration-100 ${
  //                   pressedKeys[" "] ? "translate-y-0.5" : ""
  //                 }`}
  //                 style={{
  //                   boxShadow: pressedKeys[" "]
  //                     ? "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(0,0,0,0.3)"
  //                     : "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
  //                 }}
  //               >
  //                 Y
  //               </button>
  //               <button
  //                 onClick={() => handleGameSelect(games[selectedIndex].link)}
  //                 className={`rounded-full w-10 h-10 bg-gray-800 flex items-center justify-center text-white cursor-pointer font-bold transition-all duration-100 ${
  //                   pressedKeys[" "] ? "translate-y-0.5" : ""
  //                 }`}
  //                 style={{
  //                   boxShadow: pressedKeys[" "]
  //                     ? "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(0,0,0,0.3)"
  //                     : "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
  //                 }}
  //               >
  //                 A
  //               </button>
  //             </div>
  //             <div className="w-full flex justify-around">
  //               <button
  //                 className={`rounded-full w-10 h-10 bg-gray-800 flex items-center justify-center text-white cursor-pointer font-bold transition-all duration-100 ${
  //                   pressedKeys[" "] ? "translate-y-0.5" : ""
  //                 }`}
  //                 style={{
  //                   boxShadow: pressedKeys[" "]
  //                     ? "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(0,0,0,0.3)"
  //                     : "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
  //                 }}
  //               >
  //                 B
  //               </button>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Controls */}
  //         <div className="flex justify-center items-center gap-3 mt-5">
  //           <button
  //             className={`bg-gradient-to-br from-gray-700 to-gray-900 border-none px-3 py-1.5 rounded-xl text-gray-300 text-[9px] font-bold cursor-pointer transition-all duration-100 ${
  //               pressedKeys["Enter"] ? "translate-y-px" : ""
  //             }`}
  //             onClick={() => handleKeyDown({ key: "Enter" } as KeyboardEvent)}
  //           >
  //             START
  //           </button>
  //           <button
  //             className="bg-gradient-to-br from-gray-700 to-gray-900 border-none px-2 py-1.5 rounded-xl text-gray-300 cursor-pointer flex items-center justify-center shadow-md"
  //             onClick={() => setSoundOn(!soundOn)}
  //           >
  //             {soundOn ? <Volume2 size={12} /> : <VolumeX size={12} />}
  //           </button>
  //         </div>

  //         {/* Speaker Grille */}
  //         <div className="grid grid-cols-6 gap-1 mt-4 px-[60px]">
  //           {[...Array(18)].map((_, i) => (
  //             <div
  //               key={i}
  //               className="w-full aspect-square bg-black/25 rounded-full shadow-[inset_-1px_-1px_2px_rgba(255,255,255,0.1),inset_1px_1px_2px_rgba(0,0,0,0.4)]"
  //             ></div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  // );

    return (
      <div
        className="font-mono relative"
        style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
      >
        {/* Console body */}
        <div className="relative flex flex-col rounded-[3rem] justify-between md:w-120 w-[95vw] md:h-auto h-[95vh] overflow-hidden p-5 bg-gradient-to-b from-sky-400 to-sky-600 border-[6px] border-yellow-400 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          {/* Light reflection */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_70%)] pointer-events-none"></div>

          {/* Screen bezel */}
          <div
            className="bg-black p-3 rounded-lg mb-5 relative"
            style={{
              boxShadow:
                "inset 0 2px 8px rgba(0,0,0,0.7), 0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            {/* Bezel reflection */}
            <div className="absolute inset-0 rounded-lg bg-[linear-gradient(145deg,rgba(255,255,255,0.15)_0%,transparent_60%)] pointer-events-none"></div>

            <div className="text-white ml-4 font-semibold tracking-wider drop-shadow-sm">
              SHAASTRA 2026
            </div>

            {/* Screen */}
            <div className="bg-black p-1 rounded relative overflow-hidden shadow-inner">
              <div
                className="w-full h-[250px] bg-[#9ca38f] relative overflow-hidden rounded-sm"
                style={{
                  boxShadow:
                    "inset 0 0 30px rgba(0,0,0,0.4), 0 0 8px rgba(255,255,255,0.05)",
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.3),transparent_70%)] pointer-events-none"></div>

                {/* Scanlines */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)",
                  }}
                ></div>

                {/* Menu */}
                <div
                  ref={menuRef}
                  className="w-full h-full p-3 overflow-y-auto relative z-[5]"
                >
                  <div className="text-center mb-3 pb-2 border-b-2 border-[#0f380f]">
                    <div className="text-lg font-bold text-[#0f380f] drop-shadow-[0_1px_0_rgba(255,255,255,0.2)]">
                      GAME SELECT
                    </div>
                  </div>

                  <div className="space-y-1">
                    {games.map((game, index) => (
                      <div
                        key={index}
                        ref={(el) => {
                          itemRefs.current[index] = el;
                        }}
                        onClick={() => {
                          handleGameClick(index);
                          handleGameSelect(game.link);
                        }}
                        className={`flex items-center justify-between px-2 py-1.5 rounded cursor-pointer transition-all ${
                          selectedIndex === index
                            ? "bg-[#0f380f] text-[#9ca38f] shadow-inner"
                            : "text-[#0f380f] hover:bg-[#0f380f]/10"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{game.icon}</span>
                          <span className="text-xs font-bold">{game.name}</span>
                        </div>
                        {selectedIndex === index && (
                          <ChevronRight
                            size={12}
                            className="animate-pulse text-[#9ca38f]"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-center">
                    <div className="text-[8px] text-[#0f380f] animate-pulse">
                      PRESS A TO SELECT
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mt-5 px-5">
            {/* D-Pad */}
            <div className="flex items-center justify-center">
              <div className="w-35 h-35 grid grid-cols-3 grid-rows-3 gap-0.5">
                {["ArrowUp", "ArrowLeft", "ArrowRight", "ArrowDown"].map(
                  (key, idx) => {
                    const positions = [
                      { col: "2", row: "1", cls: "rounded-t" },
                      { col: "1", row: "2", cls: "rounded-l" },
                      { col: "3", row: "2", cls: "rounded-r" },
                      { col: "2", row: "3", cls: "rounded-b" },
                    ];
                    const { col, row, cls } = positions[idx];
                    return (
                      <button
                        key={key}
                        onMouseDown={() => {
                          playNavigateSound()
                          setPressedKeys((prev) => ({ ...prev, [key]: true }));
                          if (key === "ArrowUp") {
                            setSelectedIndex((prev) => {
                              return prev > 0 ? prev - 1 : games.length - 1;
                            });
                          } else if (key === "ArrowDown") {
                            setSelectedIndex((prev) => {
                              return prev < games.length - 1 ? prev + 1 : 0;
                            });
                          }
                        }}
                        onMouseUp={() => {
                          setPressedKeys((prev) => ({ ...prev, [key]: false }));
                        }}
                        className={`dpad-button-color border-none cursor-pointer transition-all duration-100 ${cls} ${
                          pressedKeys[key]
                            ? "translate-y-px shadow-inner"
                            : "shadow-md"
                        }`}
                        style={{
                          gridColumn: col,
                          gridRow: row,
                          background: "linear-gradient(145deg, #222, #111)",
                          boxShadow: pressedKeys[key]
                            ? "inset 0 1px 2px rgba(0,0,0,0.5)"
                            : "0 4px 8px rgba(0,0,0,0.6), inset -2px -2px 3px rgba(255,255,255,0.1)",
                        }}
                      ></button>
                    );
                  }
                )}
                <div
                  className="dpad-button-color"
                  style={{
                    gridColumn: "2",
                    gridRow: "2",
                    background: "linear-gradient(145deg, #222, #111)",
                    boxShadow:
                      "inset -2px -2px 3px rgba(255,255,255,0.1), inset 2px 2px 4px rgba(0,0,0,0.5)",
                  }}
                ></div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 grid-rows-3 w-30 h-30 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none rounded-full"></div>

              <div className="w-full flex justify-around">
                <button
                  className={`rounded-full w-10 h-10 bg-gray-800 flex items-center justify-center text-white cursor-pointer font-bold transition-all duration-100 ${
                    pressedKeys[" "] ? "translate-y-0.5" : ""
                  }`}
                  style={{
                    boxShadow: pressedKeys[" "]
                      ? "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(0,0,0,0.3)"
                      : "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
                  }}
                >
                  X
                </button>
              </div>
              <div className="w-full flex justify-between">
                <button
                  className={`rounded-full w-10 h-10 bg-gray-800 flex items-center justify-center text-white cursor-pointer font-bold transition-all duration-100 ${
                    pressedKeys[" "] ? "translate-y-0.5" : ""
                  }`}
                  style={{
                    boxShadow: pressedKeys[" "]
                      ? "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(0,0,0,0.3)"
                      : "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
                  }}
                >
                  Y
                </button>
                <button
                  onClick={() => handleGameSelect(games[selectedIndex].link)}
                  className={`rounded-full w-10 h-10 bg-gray-800 flex items-center justify-center text-white cursor-pointer font-bold transition-all duration-100 ${
                    pressedKeys[" "] ? "translate-y-0.5" : ""
                  }`}
                  style={{
                    boxShadow: pressedKeys[" "]
                      ? "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(0,0,0,0.3)"
                      : "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
                  }}
                >
                  A
                </button>
              </div>
              <div className="w-full flex justify-around">
                <button
                  className={`rounded-full w-10 h-10 bg-gray-800 flex items-center justify-center text-white cursor-pointer font-bold transition-all duration-100 ${
                    pressedKeys[" "] ? "translate-y-0.5" : ""
                  }`}
                  style={{
                    boxShadow: pressedKeys[" "]
                      ? "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(0,0,0,0.3)"
                      : "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
                  }}
                  onClick={() => {setMenuOpened(false); playSelectSound();}}
                >
                  B
                </button>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-3 mt-5">
            <button
              className={`bg-gradient-to-br from-gray-700 to-gray-900 border-none px-3 py-1.5 rounded-xl text-gray-300 text-[9px] font-bold cursor-pointer transition-all duration-100 ${
                pressedKeys["Enter"] ? "translate-y-px" : ""
              }`}
              onClick={() => handleKeyDown({ key: "Enter" } as KeyboardEvent)}
            >
              START
            </button>
            <button
              className="bg-gradient-to-br from-gray-700 to-gray-900 border-none px-2 py-1.5 rounded-xl text-gray-300 cursor-pointer flex items-center justify-center shadow-md"
              onClick={() => setSoundOn(!soundOn)}
            >
              {soundOn ? <Volume2 size={12} /> : <VolumeX size={12} />}
            </button>
          </div>

          {/* Speaker Grille */}
          <div className="grid grid-cols-6 gap-1 mt-4 px-[60px]">
            {[...Array(18)].map((_, i) => (
              <div
                key={i}
                className="w-full aspect-square bg-black/25 rounded-full shadow-[inset_-1px_-1px_2px_rgba(255,255,255,0.1),inset_1px_1px_2px_rgba(0,0,0,0.4)]"
              ></div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Menu;
