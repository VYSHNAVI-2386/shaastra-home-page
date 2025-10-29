import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import MarioCharacter from '../assets/img/gif/mario-run.gif';
import MarioReverse from '../assets/img/gif/mario-run-reverse.gif';
import jumpAudio from '../assets/audio/mario-jump.mp3';
import BrickSvg from '../assets/img/brick.svg';
import PipePng from '../assets/img/pipe.png';

const MarioMap = () => {
  const [marioPosition, setMarioPosition] = useState({ x: 0, y: window.innerHeight - 160 });
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isJumping, setIsJumping] = useState(false);
  const [velocityY, setVelocityY] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(0);

  const MOVE_SPEED = 8; // pixels per frame
  const MARIO_SIZE = 80; // Mario sprite size
  const JUMP_FORCE = -25; // Initial jump velocity
  const GRAVITY = 0.8; // Gravity force
  const GROUND_LEVEL = window.innerHeight - 160; // Ground position
  
  // Pipe positions (10%, 50%, 75% of screen width)
  const PIPE_POSITIONS = [
    window.innerWidth * 0.10,
    window.innerWidth * 0.50,
    window.innerWidth * 0.75,
  ];
  const PIPE_TRIGGER_RANGE = 50; // Pixels before pipe to trigger jump

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

  // Handle scroll for movement
  const handleScroll = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const now = Date.now();
    
    // Throttle scroll events
    if (now - lastScrollTime < 50) return;
    setLastScrollTime(now);

    if (e.deltaY < 0) {
      // Scroll up = move right
      setDirection('right');
      setKeysPressed(new Set(['ArrowRight']));
    } else if (e.deltaY > 0) {
      // Scroll down = move left
      setDirection('left');
      setKeysPressed(new Set(['ArrowLeft']));
    }

    // Clear movement after a short delay
    setTimeout(() => {
      setKeysPressed(new Set());
    }, 100);
  }, [lastScrollTime]);

  // Handle horizontal movement and check for pipe jumps
  useEffect(() => {
    if (keysPressed.size === 0) return;

    const interval = setInterval(() => {
      setMarioPosition(prev => {
        let newX = prev.x;

        if (keysPressed.has('ArrowLeft')) {
          newX = Math.max(prev.x - MOVE_SPEED, 0);
        }
        if (keysPressed.has('ArrowRight')) {
          newX = Math.min(prev.x + MOVE_SPEED, window.innerWidth - MARIO_SIZE);
        }

        // Check if Mario is approaching a pipe and trigger jump
        PIPE_POSITIONS.forEach(pipeX => {
          const distanceToPipe = Math.abs(newX - pipeX);
          if (distanceToPipe < PIPE_TRIGGER_RANGE && distanceToPipe > PIPE_TRIGGER_RANGE - 30) {
            triggerJump();
          }
        });

        return { x: newX, y: prev.y };
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [keysPressed, triggerJump, PIPE_POSITIONS, PIPE_TRIGGER_RANGE]);

  // Handle jump physics (gravity and velocity)
  useEffect(() => {
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
  }, [velocityY, GROUND_LEVEL, GRAVITY]);

  // Add event listeners
  useEffect(() => {
    const scrollContainer = window;
    
    scrollContainer.addEventListener('wheel', handleScroll as any, { passive: false });

    return () => {
      scrollContainer.removeEventListener('wheel', handleScroll as any);
    };
  }, [handleScroll]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-transparent">
      {/* Brick Ground at Bottom */}
      <div
        className="absolute bottom-0 w-full h-20"
        style={{
          backgroundImage: `url(${BrickSvg})`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'bottom',
        }}
      />

      {/* Pipes positioned above bricks */}
      <img
        src={PipePng}
        alt="Pipe"
        className="absolute bottom-20 h-50"
        style={{
          left: '50%',
          width: 'auto',
          imageRendering: 'pixelated',
        }}
      />
      <img
        src={PipePng}
        alt="Pipe"
        className="absolute bottom-20 h-45"
        style={{
          left: '75%',
          width: 'auto',
          imageRendering: 'pixelated',
        }}
      />
      <img
        src={PipePng}
        alt="Pipe"
        className="absolute bottom-20 h-40"
        style={{
          left: '10%',
          width: 'auto',
          imageRendering: 'pixelated',
        }}
      />
      
      {/* Mario Character */}
      <motion.img
        src={direction === 'left' ? MarioReverse : MarioCharacter}
        alt="Mario"
        className="absolute"
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
