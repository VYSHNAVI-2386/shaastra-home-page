import React, { useState, useEffect, useCallback } from "react";
import { Volume2, VolumeX, ChevronRight, ChevronUp, ChevronDown, Home, ShoppingCart, TicketsPlane, type LucideIcon, Bed, Info, Mail, ChevronLeft, HomeIcon } from "lucide-react";

interface GameItem {
  name: string;
  link: string;
  icon: LucideIcon;
}

interface Props {
  setMenuOpened: any;
}

const Menu = ({ setMenuOpened }: Props) => {
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

  const routes: GameItem[] = [
    { name: "HOME", link: "/#", icon: Home },
    { name: "SALES", link: "/#", icon: ShoppingCart },
    { name: "PASSPORT", link: "/#", icon: TicketsPlane },
    { name: "ACCOMODATION", link: "/#", icon: Bed },
    { name: "ABOUT US", link: "/#", icon: Info },
    { name: "CONTACT", link: "/#", icon: Mail },
    { name: "OPEN HOUSE", link: "/open-house", icon: HomeIcon },
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

      // If wrapping from last to first (index 0), scroll to top
      if (selectedIndex === 0) {
        menu.scrollTo({ top: 0, behavior: "smooth" });
      }
      // If wrapping from first to last, scroll to bottom
      else if (selectedIndex === routes.length - 1) {
        menu.scrollTo({ top: menu.scrollHeight, behavior: "smooth" });
      }
      // Normal scrolling for items in between
      else if (itemTop < menuTop) {
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
          return prev > 0 ? prev - 1 : routes.length - 1;
        });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          playNavigateSound();
          return prev < routes.length - 1 ? prev + 1 : 0;
        });
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        playSelectSound();
        setTimeout(() => {
          window.location.href = routes[selectedIndex].link;
        }, 200);
      }
    },
    [selectedIndex, routes, soundOn]
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

  return (
      <div className="relative">
        {/* DS Console */}
        <div className="sm:w-100 w-[90vw] bg-gradient-to-b from-amber-400 to-amber-500 rounded-3xl shadow-2xl border-4 border-amber-600 p-3 2xl:scale-120">
          {/* Top Screen */}
          <div className="bg-gradient-to-b from-amber-500 to-amber-600 rounded-2xl p-3 mb-3 shadow-inner">
            <div className="bg-gray-900 rounded-lg p-4 h-64 relative overflow-hidden">
              {/* Screen Content */}
              <div className="absolute top-2 left-2 right-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-amber-400 font-bold text-lg">SHAASTRA 2026</div>
                  <div className="flex-1 h-px bg-amber-400/30"></div>
                </div>

                {/* Menu */}
                <div
                  ref={menuRef}
                  className="space-y-1 max-h-48 overflow-y-auto pr-2"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#f59e0b #1f2937",
                  }}
                >
                  {routes.map((route, index) => {
                    const Icon = route.icon;
                    return (
                      <div
                        key={index}
                        ref={(el) => {
                          itemRefs.current[index] = el;
                        }}
                        onClick={() => {
                          handleGameClick(index);
                          handleGameSelect(route.link);
                        }}
                        className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-all ${
                          index === selectedIndex
                            ? "bg-amber-500 text-gray-900 shadow-lg transform scale-105"
                            : "text-amber-100/70 hover:text-amber-100"
                        }`}
                      >
                        {/* <span className="text-md">{route.icon}</span> */}
                        <Icon size={16} />
                        <span className="font-medium text-sm">{route.name}</span>
                        {index === selectedIndex && (
                          <ChevronRight size={14} className="ml-auto" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Decorative elements */}
              {/* <div className="absolute bottom-2 right-2 opacity-20">
                <div className="w-8 h-8 border-2 border-amber-400 rounded-full"></div>
              </div> */}
            </div>
          </div>

          {/* Hinge */}
          <div className="h-2 bg-amber-600 rounded-full mb-3 shadow-inner"></div>

          {/* Bottom Section */}
          <div className="bg-gradient-to-b from-amber-400 to-amber-500 rounded-2xl p-6 shadow-inner">
            <div className="flex justify-between items-center">
              {/* D-Pad */}
              <div className="relative w-24 h-24 md:scale-150">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-20 h-20">
                    {/* Up */}
                    <button
                      onMouseDown={() => {
                        playNavigateSound();
                        setPressedKeys((prev) => ({ ...prev, ArrowUp: true }));
                        setSelectedIndex((prev) => {
                          return prev > 0 ? prev - 1 : routes.length - 1;
                        });
                      }}
                      onMouseUp={() => {
                        setPressedKeys((prev) => ({ ...prev, ArrowUp: false }));
                      }}
                      className={`hover:cursor-pointer absolute top-0 left-1/2 -translate-x-1/2 w-7 h-9 bg-gray-700 rounded-t border-2 border-gray-800 shadow-md transition-transform ${
                        pressedKeys.ArrowUp ? "scale-95 brightness-75" : "hover:brightness-110"
                      }`}
                    >
                      <ChevronUp size={16} className="mx-auto text-gray-400" />
                    </button>

                    {/* Down */}
                    <button
                      onMouseDown={() => {
                        playNavigateSound();
                        setPressedKeys((prev) => ({ ...prev, ArrowDown: true }));
                        setSelectedIndex((prev) => {
                          return prev < routes.length - 1 ? prev + 1 : 0;
                        });
                      }}
                      onMouseUp={() => {
                        setPressedKeys((prev) => ({ ...prev, ArrowDown: false }));
                      }}
                      className={`hover:cursor-pointer absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-9 bg-gray-700 rounded-b border-2 border-gray-800 shadow-md transition-transform ${
                        pressedKeys.ArrowDown ? "scale-95 brightness-75" : "hover:brightness-110"
                      }`}
                    >
                      <ChevronDown size={16} className="mx-auto text-gray-400" />
                    </button>

                    {/* Left */}
                    <button
                      onMouseDown={() => {
                        playNavigateSound();
                        setPressedKeys((prev) => ({ ...prev, ArrowLeft: true }));
                      }}
                      onMouseUp={() => {
                        setPressedKeys((prev) => ({ ...prev, ArrowLeft: false }));
                      }}
                      className={`hover:cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 w-9 h-7 bg-gray-700 rounded-l border-2 border-gray-800 shadow-md transition-transform ${
                        pressedKeys.ArrowLeft ? "scale-95 brightness-75" : "hover:brightness-110"
                      }`}
                    >
                      <ChevronLeft size={16} className="mx-auto text-gray-400" />
                    </button>

                    {/* Right */}
                    <button
                      onMouseDown={() => {
                        playNavigateSound();
                        setPressedKeys((prev) => ({ ...prev, ArrowRight: true }));
                      }}
                      onMouseUp={() => {
                        setPressedKeys((prev) => ({ ...prev, ArrowRight: false }));
                      }}
                      className={`hover:cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 w-9 h-7 bg-gray-700 rounded-r border-2 border-gray-800 shadow-md transition-transform ${
                        pressedKeys.ArrowRight ? "scale-95 brightness-75" : "hover:brightness-110"
                      }`}
                    >
                      <ChevronRight size={16} className="mx-auto text-gray-400" />
                    </button>

                    {/* Center */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-gray-800 border-2 border-gray-800"></div>
                  </div>
                </div>
              </div>

              {/* Speaker Holes */}
              <div className="grid grid-cols-3 gap-1">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
                ))}
              </div>

              {/* A/B Buttons */}
              <div className="relative w-24 h-24 md:scale-110">
                <button
                  onClick={() => handleGameSelect(routes[selectedIndex].link)}
                  onMouseDown={() => setPressedKeys((prev) => ({ ...prev, " ": true }))}
                  onMouseUp={() => setPressedKeys((prev) => ({ ...prev, " ": false }))}
                  className={`hover:cursor-pointer absolute top-2 right-2 w-11 h-11 bg-green-600 rounded-full border-3 border-green-800 shadow-lg flex items-center justify-center font-bold text-red-100 text-lg transition-transform ${
                    pressedKeys[" "] ? "scale-90 brightness-75" : "hover:brightness-110"
                  }`}
                >
                  A
                </button>
                <button
                  onClick={() => {
                    setMenuOpened(false);
                    playSelectSound();
                  }}
                  className="hover:cursor-pointer absolute bottom-2 left-2 w-11 h-11 bg-red-600 rounded-full border-3 border-red-800 shadow-lg flex items-center justify-center font-bold text-amber-100 text-lg hover:brightness-110 transition-transform"
                >
                  B
                </button>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex justify-center gap-12 mt-4 md:scale-90">
              <div className="text-center">
                <button
                  className="hover:cursor-pointer w-12 h-12 bg-gray-600 rounded-full border-2 border-gray-700 shadow-md hover:brightness-110 flex items-center justify-center"
                  onClick={() => handleKeyDown({ key: "Enter" } as KeyboardEvent)}
                >
                  <span className="text-xs text-gray-300 font-bold">▶</span>
                </button>
                <div className="text-xs text-gray-700 mt-1 font-medium">START</div>
              </div>
              <div className="text-center">
                <button
                  className="hover:cursor-pointer w-12 h-12 bg-gray-600 rounded-full border-2 border-gray-700 shadow-md hover:brightness-110 flex items-center justify-center"
                  onClick={() => setSoundOn(!soundOn)}
                >
                  {soundOn ? (
                    <Volume2 size={16} className="text-gray-300" />
                  ) : (
                    <VolumeX size={16} className="text-gray-300" />
                  )}
                </button>
                <div className="text-xs text-gray-700 mt-1 font-medium">SOUND</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Menu;