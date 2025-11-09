module.exports = {
  content: [
    "./src//*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vt323: ['VT323', 'monospace'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        flicker: {
          '0%, 100%': { opacity: '0.95' },
          '50%': { opacity: '1' },
        },
        'rotate-corner': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.3)', opacity: '0.5' },
        },
        'title-glitch': {
          '0%, 90%, 100%': { transform: 'translate(0)' },
          '91%': { transform: 'translate(-3px, 2px)' },
          '92%': { transform: 'translate(2px, -2px)' },
          '93%': { transform: 'translate(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { textShadow: '0 0 10px #ff0, 0 0 20px #ff0' },
          '50%': { textShadow: '0 0 20px #ff0, 0 0 40px #ff0, 0 0 60px #ff0' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'arrow-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
        },
        'float-particle': {
          '0%': {
            transform: 'translateY(100vh) translateX(0) scale(0)',
            opacity: '0',
          },
          '10%': {
            opacity: '1',
          },
          '90%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-100px) translateX(100px) scale(1)',
            opacity: '0',
          },
        },
                'dot-pulse-1': {
          '0%, 80%, 100%': { opacity: '0.2', textShadow: '0 0 5px #ff0' },
          '40%': { opacity: '1', textShadow: '0 0 20px #ff0, 0 0 40px #ff0' },
        },
        'dot-pulse-2': {
          '0%, 100%': { opacity: '0.2', textShadow: '0 0 5px #ff0' },
          '40%': { opacity: '0.2' },
          '60%': { opacity: '1', textShadow: '0 0 20px #ff0, 0 0 40px #ff0' },
        },
        'dot-pulse-3': {
          '0%, 20%': { opacity: '0.2', textShadow: '0 0 5px #ff0' },
          '80%': { opacity: '1', textShadow: '0 0 20px #ff0, 0 0 40px #ff0' },
          '100%': { opacity: '0.2' },
        },

      },
      animation: {
        twinkle: 'twinkle 3s infinite',
        flicker: 'flicker 0.15s infinite',
        'rotate-corner': 'rotate-corner 4s linear infinite',
        'title-glitch': 'title-glitch 5s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        blink: 'blink 1.5s infinite',
        float: 'float 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'arrow-pulse': 'arrow-pulse 1s infinite',
        'float-particle': 'float-particle 6s infinite',
        'dot1': 'dot-pulse-1 1.5s infinite ease-in-out',
        'dot2': 'dot-pulse-2 1.5s infinite ease-in-out',
        'dot3': 'dot-pulse-3 1.5s infinite ease-in-out',
      },
      borderWidth: {
        '3': '3px',
        '6': '6px',
      },
      textShadow: {
        'glow-cyan': '0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff',
        'glow-magenta': '0 0 10px #ff0, 0 0 20px #ff0',
        'glow-yellow': '0 0 15px #ff0, 0 0 30px #ff0',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
};