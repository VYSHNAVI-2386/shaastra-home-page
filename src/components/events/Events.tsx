import React, { useState, useEffect, useRef } from 'react';

interface Event {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  url: string;
}

interface Position {
  x: number;
  y: number;
}

interface Dot {
  id: number;
  x: number;
  y: number;
  eaten: boolean;
}

interface Ghost {
  id: number;
  x: number;
  y: number;
  color: string;
  pathIndex: number;
}

enum Direction {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST'
}

const SPEED = 2;
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 700;

export default function PacManEvents() {
  const [pacmanPos, setPacmanPos] = useState<Position>({ x: 40, y: 40 });
  const [direction, setDirection] = useState<Direction>(Direction.EAST);
  const [dots, setDots] = useState<Dot[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [ghosts, setGhosts] = useState<Ghost[]>([]);
  const pathIndexRef = useRef<number>(0);
  const eatenDotsRef = useRef<Set<number>>(new Set());

  // STEP 1: DEFINE GRID LAYOUT - 3x3 grid with proper spacing
  const events: Event[] = [
    // Top row - 3 events
    { name: 'Aeronautics', x: 170, y: 120, width: 180, height: 110, url: '/events/aeronautics' },
    { name: 'Biotechnical', x: 410, y: 120, width: 180, height: 110, url: '/events/biotechnical' },
    { name: 'Business', x: 650, y: 120, width: 180, height: 110, url: '/events/business' },
    
    // Middle row - 2 events with space in center
    { name: 'Coding', x: 170, y: 310, width: 180, height: 110, url: '/events/coding' },
    { name: 'Robotics', x: 650, y: 310, width: 180, height: 110, url: '/events/robotics' },
    
    // Bottom row - 3 events
    { name: 'Electronics', x: 170, y: 500, width: 180, height: 110, url: '/events/electronics' },
    { name: 'Others', x: 410, y: 500, width: 180, height: 110, url: '/events/others' },
    { name: 'Workshops', x: 650, y: 500, width: 180, height: 110, url: '/events/workshops' }
  ];

  // STEP 2: DEFINE L-SHAPED WALLS - Using SVG paths for clean L shapes
  const lShapes = [
    // Top-left L
    { d: "M 100,80 L 100,210 L 120,210 L 120,100 L 230,100 L 230,80 Z" },
    
    // Top-right L (mirrored)
    { d: "M 900,80 L 900,210 L 880,210 L 880,100 L 770,100 L 770,80 Z" },
    
    // Bottom-left L
    { d: "M 100,620 L 100,490 L 120,490 L 120,600 L 230,600 L 230,620 Z" },
    
    // Bottom-right L (mirrored)
    { d: "M 900,620 L 900,490 L 880,490 L 880,600 L 770,600 L 770,620 Z" },
  ];

  // Small boxes between events
  const smallBoxes = [
    // Between top events
    { x: 370, y: 150, width: 20, height: 50 },
    { x: 610, y: 150, width: 20, height: 50 },
    
    // Between middle events
    { x: 370, y: 340, width: 20, height: 50 },
    { x: 610, y: 340, width: 20, height: 50 },
    
    // Center horizontal bar
    { x: 430, y: 355, width: 140, height: 25 },
    
    // Between bottom events
    { x: 370, y: 530, width: 20, height: 50 },
    { x: 610, y: 530, width: 20, height: 50 },
  ];

  // STEP 3: CREATE DEFINITE PATH - CLEARLY DEFINED CORRIDORS
  const createMazePath = (): Position[] => {
    const path: Position[] = [];
    
    // Define corridor coordinates
    const outerLeft = 40;
    const outerRight = 960;
    const outerTop = 40;
    const outerBottom = 660;
    
    const innerLeft = 140;
    const innerRight = 860;
    
    const topRowBottom = 270;
    const middleRowTop = 270;
    const middleRowBottom = 460;
    const bottomRowTop = 460;
    
    // === OUTER PERIMETER LOOP ===
    // Top edge: left to right
    for (let x = outerLeft; x <= outerRight; x += SPEED) {
      path.push({ x, y: outerTop });
    }
    
    // Right edge: top to bottom
    for (let y = outerTop; y <= outerBottom; y += SPEED) {
      path.push({ x: outerRight, y });
    }
    
    // Bottom edge: right to left
    for (let x = outerRight; x >= outerLeft; x -= SPEED) {
      path.push({ x, y: outerBottom });
    }
    
    // Left edge: bottom to top row corridor
    for (let y = outerBottom; y >= topRowBottom; y -= SPEED) {
      path.push({ x: outerLeft, y });
    }
    
    // === TOP ROW CORRIDOR (horizontal between top and middle events) ===
    // Go right along top row bottom corridor
    for (let x = outerLeft; x <= 360; x += SPEED) {
      path.push({ x, y: topRowBottom });
    }
    
    // Jump to after first small box
    for (let x = 400; x <= 600; x += SPEED) {
      path.push({ x, y: topRowBottom });
    }
    
    // Jump to after second small box
    for (let x = 640; x <= outerRight; x += SPEED) {
      path.push({ x, y: topRowBottom });
    }
    
    // === RIGHT SIDE VERTICAL CORRIDOR ===
    // Go down from top corridor to bottom corridor
    for (let y = topRowBottom; y <= bottomRowTop; y += SPEED) {
      path.push({ x: outerRight, y });
    }
    
    // === BOTTOM ROW CORRIDOR (horizontal between middle and bottom events) ===
    // Go left along bottom row top corridor
    for (let x = outerRight; x >= 640; x -= SPEED) {
      path.push({ x, y: bottomRowTop });
    }
    
    // Jump to before second small box
    for (let x = 600; x >= 400; x -= SPEED) {
      path.push({ x, y: bottomRowTop });
    }
    
    // Jump to before first small box
    for (let x = 360; x >= innerLeft; x -= SPEED) {
      path.push({ x, y: bottomRowTop });
    }
    
    // === LEFT SIDE VERTICAL CORRIDOR ===
    // Go down from bottom corridor to outer bottom
    for (let y = bottomRowTop; y <= outerBottom; y += SPEED) {
      path.push({ x: innerLeft, y });
    }
    
    // Go left to outer edge
    for (let x = innerLeft; x >= outerLeft; x -= SPEED) {
      path.push({ x, y: outerBottom });
    }
    
    // === LEFT VERTICAL CONNECTOR ===
    // Go up from bottom to top corridor
    for (let y = outerBottom; y >= topRowBottom; y -= SPEED) {
      path.push({ x: outerLeft, y });
    }
    
    return path;
  };

  const mazePath = createMazePath();

  const getDirection = (current: Position, next: Position): Direction => {
    const dx = next.x - current.x;
    const dy = next.y - current.y;
    
    if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? Direction.EAST : Direction.WEST;
    } else {
      return dy > 0 ? Direction.SOUTH : Direction.NORTH;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setGameStarted(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // STEP 4: PLACE GHOSTS AT DIFFERENT POSITIONS ON THE PATH
  useEffect(() => {
    if (gameStarted && mazePath.length > 0) {
      const positions = [
        Math.floor(mazePath.length * 0.2),
        Math.floor(mazePath.length * 0.4),
        Math.floor(mazePath.length * 0.6),
        Math.floor(mazePath.length * 0.8)
      ];
      
      setGhosts([
        { id: 1, x: mazePath[positions[0]].x, y: mazePath[positions[0]].y, color: '#22D3EE', pathIndex: positions[0] },
        { id: 2, x: mazePath[positions[1]].x, y: mazePath[positions[1]].y, color: '#F472B6', pathIndex: positions[1] },
        { id: 3, x: mazePath[positions[2]].x, y: mazePath[positions[2]].y, color: '#F97316', pathIndex: positions[2] },
        { id: 4, x: mazePath[positions[3]].x, y: mazePath[positions[3]].y, color: '#EF4444', pathIndex: positions[3] }
      ]);
    }
  }, [gameStarted]);

  // Animate ghosts
  useEffect(() => {
    if (!gameStarted || mazePath.length === 0) return;

    const ghostInterval = setInterval(() => {
      setGhosts(prevGhosts => 
        prevGhosts.map(ghost => {
          const newIndex = (ghost.pathIndex + 1) % mazePath.length;
          const newPos = mazePath[newIndex];
          return {
            ...ghost,
            x: newPos.x,
            y: newPos.y,
            pathIndex: newIndex
          };
        })
      );
    }, 150);

    return () => clearInterval(ghostInterval);
  }, [gameStarted]);

  // STEP 5: PLACE DOTS EXACTLY ON THE PATH (avoiding boxes)
  useEffect(() => {
    if (gameStarted && mazePath.length > 0) {
      const initialDots: Dot[] = [];
      const dotSpacing = 25;
      
      for (let i = 0; i < mazePath.length; i += dotSpacing) {
        const pos = mazePath[i];
        
        // Check if dot would overlap with any box
        let overlapsBox = false;
        
        // Check small boxes
        for (const box of smallBoxes) {
          if (pos.x >= box.x - 15 && pos.x <= box.x + box.width + 15 &&
              pos.y >= box.y - 15 && pos.y <= box.y + box.height + 15) {
            overlapsBox = true;
            break;
          }
        }
        
        if (!overlapsBox) {
          initialDots.push({
            id: initialDots.length,
            x: pos.x,
            y: pos.y,
            eaten: false
          });
        }
      }
      
      setDots(initialDots);
    }
  }, [gameStarted]);

  // STEP 6: ANIMATE PAC-MAN ALONG THE EXACT PATH
  useEffect(() => {
    if (!gameStarted || mazePath.length === 0) return;

    const interval = setInterval(() => {
      const currentIndex = pathIndexRef.current;
      const nextIndex = (currentIndex + 1) % mazePath.length;
      const nextPos = mazePath[nextIndex];

      setDirection(getDirection(mazePath[currentIndex], nextPos));
      setPacmanPos(nextPos);

      // Check ghost collision
      const ghostCollision = ghosts.some(
        ghost => Math.abs(ghost.x - nextPos.x) < 25 && Math.abs(ghost.y - nextPos.y) < 25
      );
      
      if (ghostCollision) {
        setScore(0);
        eatenDotsRef.current.clear();
        setDots(prevDots => prevDots.map(dot => ({ ...dot, eaten: false })));
      }

      // Check dot collision
      setDots(prevDots => {
        const newDots = [...prevDots];
        const nearbyDot = newDots.find(
          dot => !dot.eaten && 
          !eatenDotsRef.current.has(dot.id) &&
          Math.abs(dot.x - nextPos.x) < 18 && 
          Math.abs(dot.y - nextPos.y) < 18
        );
        
        if (nearbyDot) {
          nearbyDot.eaten = true;
          eatenDotsRef.current.add(nearbyDot.id);
          setScore(prev => prev + 10);
        }

        if (newDots.every(dot => dot.eaten)) {
          pathIndexRef.current = 0;
          eatenDotsRef.current.clear();
          return newDots.map(dot => ({ ...dot, eaten: false }));
        }

        return newDots;
      });

      pathIndexRef.current = nextIndex;
    }, 40);

    return () => clearInterval(interval);
  }, [gameStarted, ghosts, mazePath]);

  const handleEventClick = (event: Event): void => {
    console.log('Navigate to:', event.url);
    window.location.href = event.url;
  };

  const getRotation = (): number => {
    switch (direction) {
      case Direction.EAST: return 0;
      case Direction.SOUTH: return 90;
      case Direction.WEST: return 180;
      case Direction.NORTH: return 270;
      default: return 0;
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* EVENTS Title */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-600 to-orange-700 rounded-xl transform translate-y-2 blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-b from-red-800 to-red-900 rounded-xl" style={{ padding: '4px' }}>
            <div className="w-full h-full bg-gradient-to-b from-orange-500 via-yellow-400 to-orange-500 rounded-lg" />
          </div>
          <div className="relative bg-gradient-to-b from-orange-500 via-yellow-400 to-orange-500 px-12 py-4 rounded-xl" style={{ borderWidth: '4px', borderColor: '#7F1D1D', borderStyle: 'solid' }}>
            <h1 className="text-6xl font-black tracking-widest" style={{
              fontFamily: 'Impact, Arial Black, sans-serif',
              color: '#FFE44D',
              textShadow: `-3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000`,
              WebkitTextStroke: '2px #8B4513',
              letterSpacing: '0.15em'
            }}>
              EVENTS
            </h1>
          </div>
        </div>
      </div>

      {/* Score Display */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 z-20 flex gap-16 text-white font-mono">
        <div className="text-center">
          <div className="text-sm">SCORE</div>
          <div className="text-2xl font-bold">{score.toString().padStart(4, '0')}</div>
        </div>
        <div className="text-center">
          <div className="text-sm">HIGH SCORE</div>
          <div className="text-2xl font-bold">0000</div>
        </div>
      </div>

      {/* SVG Container for Maze */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg 
          width={MAP_WIDTH} 
          height={MAP_HEIGHT} 
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="border-4 border-blue-600 rounded-lg"
        >
          <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="black" />
          
          {/* Draw L-shaped walls - NO INNER LINES, just the L outline */}
          <g stroke="#2563EB" strokeWidth="4" fill="#2563EB">
            {lShapes.map((lShape, idx) => (
              <path
                key={`lshape-${idx}`}
                d={lShape.d}
              />
            ))}
          </g>
          
          {/* Draw small boxes and event boxes */}
          <g stroke="#2563EB" strokeWidth="4" fill="none">
            {smallBoxes.map((box, idx) => (
              <rect
                key={`box-${idx}`}
                x={box.x}
                y={box.y}
                width={box.width}
                height={box.height}
                rx="4"
              />
            ))}
            
            {/* Draw event boxes */}
            {events.map((event, idx) => (
              <rect
                key={`event-${idx}`}
                x={event.x}
                y={event.y}
                width={event.width}
                height={event.height}
                rx="8"
              />
            ))}
          </g>

          {/* Yellow dots - EXACTLY on the path, avoiding boxes */}
          {gameStarted && dots.map(dot => !dot.eaten && (
            <circle 
              key={dot.id} 
              cx={dot.x} 
              cy={dot.y} 
              r="4" 
              fill="#FCD34D" 
            />
          ))}

          {/* Power pellets at corners */}
          {gameStarted && (
            <>
              <circle cx="40" cy="40" r="9" fill="#FCD34D" className="animate-pulse" />
              <circle cx="960" cy="40" r="9" fill="#FCD34D" className="animate-pulse" />
              <circle cx="40" cy="660" r="9" fill="#FCD34D" className="animate-pulse" />
              <circle cx="960" cy="660" r="9" fill="#FCD34D" className="animate-pulse" />
            </>
          )}

          {/* Ghosts moving on the path */}
          {gameStarted && ghosts.map(ghost => (
            <g key={ghost.id} transform={`translate(${ghost.x}, ${ghost.y})`}>
              <ellipse cx="0" cy="-5" rx="14" ry="17" fill={ghost.color} />
              <path d="M -14,7 Q -10.5,12 -7,7 Q -3.5,2 0,7 Q 3.5,12 7,7 Q 10.5,2 14,7 L 14,-5 L -14,-5 Z" fill={ghost.color} />
              <circle cx="-5" cy="-6" r="4" fill="white" />
              <circle cx="5" cy="-6" r="4" fill="white" />
              <circle cx="-4" cy="-5" r="2.5" fill="#1E3A8A" />
              <circle cx="6" cy="-5" r="2.5" fill="#1E3A8A" />
            </g>
          ))}

          {/* Pac-Man moving on the path */}
          {gameStarted && (
            <g transform={`translate(${pacmanPos.x}, ${pacmanPos.y}) rotate(${getRotation()})`}>
              <circle cx="0" cy="0" r="18" fill="#FCD34D" />
              <path d="M 0,0 L 18,10 L 18,-10 Z" fill="#000">
                <animate 
                  attributeName="d" 
                  values="M 0,0 L 18,10 L 18,-10 Z; M 0,0 L 18,3 L 18,-3 Z; M 0,0 L 18,10 L 18,-10 Z" 
                  dur="0.2s" 
                  repeatCount="indefinite" 
                />
              </path>
            </g>
          )}
        </svg>

        {/* Event Cards Overlay - Clickable with hover */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative" style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}>
            {events.map((event, index) => (
              <button
                key={index}
                onClick={() => handleEventClick(event)}
                className="absolute pointer-events-auto bg-black/95 border-2 border-blue-500 rounded-lg transition-all duration-300 hover:scale-110 hover:border-yellow-400 hover:shadow-[0_0_35px_rgba(250,204,21,1)] hover:bg-blue-900/50 cursor-pointer flex items-center justify-center group"
                style={{ 
                  left: `${event.x}px`, 
                  top: `${event.y}px`,
                  width: `${event.width}px`,
                  height: `${event.height}px`
                }}
              >
                <h3 className="text-white text-base font-bold text-center px-4 leading-tight group-hover:text-yellow-300 group-hover:scale-105 transition-all duration-300" style={{ fontFamily: 'monospace' }}>
                  {event.name}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

