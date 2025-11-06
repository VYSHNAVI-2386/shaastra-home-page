import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import MarioCharacter from '../../assets/img/gif/mario-run.gif';
import MarioReverse from '../../assets/img/gif/mario-run-reverse.gif';
import jumpAudio from '../../assets/audio/mario-jump.mp3';
import BrickSvg from '../../assets/img/brick.svg';
import PipePng from '../../assets/img/pipe.png';

interface MarioMapProps {
  isMenuOpened: boolean;
}

const MarioMap = ({ isMenuOpened }: MarioMapProps) => {
  const [marioPosition, setMarioPosition] = useState({ x: 0, y: window.innerHeight - 160 });
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isJumping, setIsJumping] = useState(false);
  const [velocityY, setVelocityY] = useState(0);
  const [velocityX, setVelocityX] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const MOVE_SPEED = 5;
  const MARIO_SIZE = 80; // Mario sprite size
  const JUMP_FORCE = -25; // Initial jump velocity
  const GRAVITY = 0.8; // Gravity force
  const GROUND_LEVEL = window.innerHeight - 160; // Ground position
  const FRICTION = 0.9; // Slow down factor
  
  // Pipe positions (10%, 50%, 75% of screen width)
  const PIPE_POSITIONS = useMemo(() => [
    window.innerWidth * 0.10,
    window.innerWidth * 0.50,
    window.innerWidth * 0.75,
  ], []);

  const PIPE_JUMP_START_DISTANCE = 50; // Start checking for jump 50px before pipe
  const PIPE_JUMP_END_DISTANCE = 10;  // Stop checking 10px before pipe (40px window)

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Jump audio
  const jump = useMemo(() => {
    return new Audio(jumpAudio);
  }, []);

  // Function to trigger jump
  const triggerJump = useCallback(() => {
    if (!isJumping) {
      setIsJumping(true);
      setVelocityY(JUMP_FORCE);
      jump.currentTime = 0;
      jump.play().catch(err => console.log('Audio play failed:', err));
    }
  }, [isJumping, JUMP_FORCE, jump]);

  // --- NEW: Reusable movement functions ---
  const moveRight = useCallback(() => {
    setDirection('right');
    setVelocityX(prev => Math.min(prev + MOVE_SPEED, 20)); // Cap max speed
  }, [MOVE_SPEED]);

  const moveLeft = useCallback(() => {
    setDirection('left');
    setVelocityX(prev => Math.max(prev - MOVE_SPEED, -20)); // Cap max speed
  }, [MOVE_SPEED]);

  // Handle scroll for movement
  const handleScroll = useCallback((e: WheelEvent) => {
    if (isMenuOpened) return; // Stop movement when menu is open
    
    if (e.deltaY > 0) {
      // Scroll down = move right
      moveRight();
    } else if (e.deltaY < 0) {
      // Scroll up = move left
      moveLeft();
    }
  }, [moveLeft, moveRight, isMenuOpened]);

  // --- NEW: Handle keyboard for movement ---
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isMenuOpened) return; // Stop movement when menu is open

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      // Down key OR Right key = move right
      moveRight();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      // Up key OR Left key = move left
      moveLeft();
    } else if (e.key === ' ' || e.key === 'Spacebar') {
      // Spacebar = jump
      e.preventDefault(); // Prevent page scroll on spacebar
      triggerJump();
    }
  }, [moveLeft, moveRight, triggerJump, isMenuOpened]);

  // Handle horizontal movement with friction and check for pipe jumps
  useEffect(() => {
    if (isMenuOpened) return; // Stop all movement when menu is open
    
    const interval = setInterval(() => {
      setMarioPosition(prev => {
        let newX = prev.x + velocityX;

        // Implement infinite loop - wrap around screen edges
        if (newX > window.innerWidth) {
          // Exit right, enter from left
          newX = -MARIO_SIZE;
        } else if (newX < -MARIO_SIZE) {
          // Exit left, enter from right
          newX = window.innerWidth;
        }

        // --- IMPROVED: Directional pipe jump logic ---
        // Only trigger jumps if not on mobile (pipes are hidden on mobile)
        if (!isMobile) {
          if (velocityX > 0) { // Moving Right
            PIPE_POSITIONS.forEach(pipeX => {
              const distanceToPipe = pipeX - newX; // Distance from Mario to the pipe
              // Trigger jump if approaching a pipe from the left
              if (distanceToPipe < PIPE_JUMP_START_DISTANCE && distanceToPipe > PIPE_JUMP_END_DISTANCE) {
                triggerJump();
              }
            });
          } else if (velocityX < 0) { // Moving Left
            PIPE_POSITIONS.forEach(pipeX => {
              const distanceToPipe = newX - (pipeX + MARIO_SIZE); // Distance from Mario's left side to pipe's right side (approx)
              // Trigger jump if approaching a pipe from the right
              if (distanceToPipe < PIPE_JUMP_START_DISTANCE && distanceToPipe > PIPE_JUMP_END_DISTANCE) {
                triggerJump();  
              }
            });
          }
        }

        return { x: newX, y: prev.y };
      });

      // Apply friction to slow down Mario
      setVelocityX(prev => {
        if (Math.abs(prev) < 0.1) return 0;
        return prev * FRICTION;
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [velocityX, triggerJump, PIPE_POSITIONS, PIPE_JUMP_START_DISTANCE, PIPE_JUMP_END_DISTANCE, FRICTION, MARIO_SIZE, isMenuOpened, isMobile]);

  // Handle jump physics (gravity and velocity)
  useEffect(() => {
    if (isMenuOpened) return; // Stop jump physics when menu is open
    
    const interval = setInterval(() => {
      setMarioPosition(prev => {
        let newY = prev.y + velocityY;
        
        // Check if Mario is on the ground
        if (newY >= GROUND_LEVEL) {
          newY = GROUND_LEVEL;
          setVelocityY(0);
          setIsJumping(false);
        } else {
          // Apply gravity while in air
          setVelocityY(v => v + GRAVITY);
        }

        return { x: prev.x, y: newY };
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [velocityY, GROUND_LEVEL, GRAVITY, isMenuOpened]);

  // --- UPDATED: Add event listeners ---
  useEffect(() => {
    const scrollContainer = window;
    
    // Add wheel listener
    scrollContainer.addEventListener('wheel', handleScroll as any, { passive: true });
    // Add keydown listener
    scrollContainer.addEventListener('keydown', handleKeyDown as any);

    // Cleanup function to remove listeners
    return () => {
      scrollContainer.removeEventListener('wheel', handleScroll as any);
      scrollContainer.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [handleScroll, handleKeyDown]); // Add handleKeyDown to dependency array

  return (
    <div className="relative w-full h-screen overflow-hidden bg-transparent pointer-events-auto">
      {/* Brick Ground at Bottom */}
      <div
        className="absolute bottom-0 w-full h-20 pointer-events-none"
        style={{
          backgroundImage: `url(${BrickSvg})`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'bottom',
        }}
      />

      {/* Pipes positioned above bricks - Hidden on mobile/tablet screens */}
      {!isMobile && (
        <>
          <img
            src={PipePng}
            alt="Pipe"
            className="absolute bottom-20 h-50 pointer-events-none"
            style={{
              left: '50%',
              width: 'auto',
              imageRendering: 'pixelated',
            }}
          />
          <img
            src={PipePng}
            alt="Pipe"
            className="absolute bottom-20 h-45 pointer-events-none"
            style={{
              left: '75%',
              width: 'auto',
              imageRendering: 'pixelated',
            }}
          />
          <img
            src={PipePng}
            alt="Pipe"
            className="absolute bottom-20 h-40 pointer-events-none"
            style={{
              left: '10%',
              width: 'auto',
              imageRendering: 'pixelated',
            }}
          />
        </>
      )}
      
      {/* Mario Character */}
      <motion.img
        src={direction === 'left' ? MarioReverse : MarioCharacter}
        alt="Mario"
        className="absolute pointer-events-none"
        style={{
          width: `${MARIO_SIZE}px`,
          height: `${MARIO_SIZE}px`,
          imageRendering: 'pixelated',
        }}
        animate={{
          x: marioPosition.x,
          y: marioPosition.y,
        }}
        transition={{ type: 'tween', duration: 0 }}
      />
    </div>
  );
};

export default MarioMap;