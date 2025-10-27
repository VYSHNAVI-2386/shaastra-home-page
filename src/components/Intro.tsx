// src/components/ArcadeIntro.tsx

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

// --- Component Props ---
interface ArcadeIntroProps {
  onIntroComplete: () => void;
}

export const ArcadeIntro = ({ onIntroComplete }: ArcadeIntroProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);
  const [showText, setShowText] = useState(false);
  const [keyboardSound, setKeyboardSound] = useState<HTMLAudioElement | null>(null);

  // Auto-zoom after 2 seconds
  useEffect(() => {
    const zoomTimer = setTimeout(() => {
      setIsClicked(true);
      // Play zoom sound effect
      const zoomSound = new Audio('/sounds/zoom.mp3');
      zoomSound.play().catch(e => console.log('Zoom sound failed:', e));
      
      setTimeout(() => {
        setShowText(true);
        // Start keyboard sound when text starts typing
        const kbSound = new Audio('/sounds/keys.mp3');
        kbSound.loop = false;
        kbSound.play().catch(e => console.log('Keyboard sound failed:', e));
        setKeyboardSound(kbSound);
        
        // Show buttons after typing is done (approximately 3 seconds for typing)
        setTimeout(() => {
          if (kbSound) {
            kbSound.pause();
            kbSound.currentTime = 0;
          }
          setShowButtons(true);
        }, 3000);
      }, 2000); // Show text after zoom animation
    }, 2000);
    return () => clearTimeout(zoomTimer);
  }, []);

  // Auto-click Yes button after buttons appear
  useEffect(() => {
    if (showButtons && !yesClicked) {
      const timer = setTimeout(() => {
        setYesClicked(true);
        // Play click-yes sound effect
        const clickSound = new Audio('/sounds/click-yes.mp3');
        clickSound.play().catch(e => console.log('Click sound failed:', e));
        
        setTimeout(() => {
          onIntroComplete();
        }, 2000); // Wait 2 seconds after YES is clicked before transitioning
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showButtons, yesClicked, onIntroComplete]);

  // Cleanup keyboard sound on unmount
  useEffect(() => {
    return () => {
      if (keyboardSound) {
        keyboardSound.pause();
        keyboardSound.currentTime = 0;
      }
    };
  }, [keyboardSound]);

  return (
    <motion.div
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      style={{
        backgroundImage: 'url(/background.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={{ scale: isClicked ? 2.75 : 1 }}
        style={{ transformOrigin: '50% 64%' }}
        transition={{ duration: 2, ease: 'easeIn' }}
      >
        {/* Arcade Machine Image - Responsive */}
        <motion.img
          src='/arcade.png'
          alt="Arcade machine"
          className="h-full w-auto max-w-none object-cover"
          style={{
            minWidth: '100%',
            minHeight: '100%',
          }}
          animate={{ opacity: yesClicked ? 0 : 1 }}
          transition={{ duration: 1, delay: yesClicked ? 2 : 0 }}
        />
        
        {/* Typing Text - appears after zoom, before buttons - Responsive */}
        {showText && !showButtons && (
          <motion.div
            className="absolute flex flex-col items-center justify-center px-4"
            style={{
              top: '58%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '600px',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <TypeAnimation
              sequence={[
                "LET'S\nPLAY\nA GAME\nARE U READY!",
                2000,
              ]}
              wrapper="div"
              speed={50}
              className="font-pixel text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase text-white font-bold text-center whitespace-pre-line"
              style={{
                letterSpacing: '0.1em',
                textShadow: '0 0 20px rgba(255,255,255,0.5)',
              }}
              cursor={false}
              repeat={0}
            />
          </motion.div>
        )}


        {/* Yes/No Buttons - Responsive */}
        {showButtons && (
          <motion.div
            className="absolute flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-11 top-[58%] left-[calc(50%-100px)] 
                       sm:top-[58%] sm:left-[calc(50%-120px)]
                       md:left-[calc(48%-120px)]"
            style={{
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: yesClicked ? 0 : 1,
              scale: yesClicked ? 0.8 : 1
            }}
            transition={{ duration: 2, delay: yesClicked ? 2 : 0 }}
          >
            <motion.button
              className={`font-pixel text-base sm:text-lg md:text-xl lg:text-2xl px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-white rounded-xl shadow-2xl border-4 ${
                yesClicked 
                  ? 'bg-yellow-400 border-yellow-500' 
                  : 'bg-green-500 border-green-600'
              }`}
              transition={{ duration: 0.6}}
              style={{ 
                letterSpacing: '0.1em',
                width: '140px',
                minWidth: '140px'
              }}
            >
              YES
            </motion.button>
            <motion.button
              className="font-pixel text-base sm:text-lg md:text-xl lg:text-2xl px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-red-500 text-white rounded-xl shadow-2xl border-4 border-red-600"
              animate={yesClicked ? { opacity: 0.3, scale: 0.9 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ 
                letterSpacing: '0.1em',
                width: '140px',
                minWidth: '140px'
              }}
            >
              NO
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};