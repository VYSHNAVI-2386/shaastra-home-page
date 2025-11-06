

import   { useState} from "react";
import type { FormEvent ,  MouseEvent  } from "react";
import { Link } from "react-router-dom";

// --- STYLES COMPONENT ---
const ShaastraStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
    `}
  </style>
);

// --- MAIN COMPONENT ---
const ShaastraLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      alert(
        `🎮 WELCOME TO SHAASTRA 2025, ${username.toUpperCase()}!\n\n✨ ACCESS GRANTED\n🏆 Ready Player One\n\n>>> GAME ON <<<`
      );
      setIsLoading(false);
    }, 1500);
  };

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <ShaastraStyles />
       <div
        className="font-press-start bg-black text-white min-h-screen flex items-center justify-center overflow-hidden relative p-4"
        style={{
          // Using your local background image
          // Make sure this file is at: [Your_Project_Folder]/public/images/my-pixel-background.png
          backgroundImage: "url('shaastra-home-page-bg.jpg')",
          backgroundRepeat: 'repeat',
          backgroundSize: "200px", // Or '200px' if you want larger tiles
          imageRendering: "pixelated", // Ensures the pixel art isn't blurry
        }}
      >

      <div className=" font-press-start text-white min-h-screen flex items-center justify-center relative overflow-hidden p-3 sm:p-6">
        {/* Outer box */}
        <div
          className="relative z-10 w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 border-4 border-gray-500 shadow-lg rounded-none"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(6px)",
          }}
        >
          {/* LEFT PANEL */}
          <div className="flex flex-col justify-center items-center border-b-4 md:border-b-0 md:border-r-4 border-gray-500 px-5 py-10 sm:py-16 md:py-20">
            <div
              className="text-[32px] sm:text-[48px] lg:text-[64px] font-bold text-yellow-400 text-center tracking-wide mb-4 sm:mb-6"
              style={{ textShadow: "4px 4px 0 #000" }}
            >
              SHAASTRA
            </div>
            <div className="text-[20px] sm:text-[28px] lg:text-[32px] font-bold text-white text-center my-3 sm:my-6">
              2026
            </div>
            <div className="w-40 sm:w-[200px] h-20 sm:h-[100px] bg-black border-4 border-gray-400 flex items-center justify-center my-5">
              <span className="text-yellow-400 text-lg sm:text-2xl md:text-3xl">
                READY
              </span>
            </div>
            <div className="flex justify-center gap-3 sm:gap-4 mt-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-700 border-2 border-black"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500 border-2 border-black"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-400 border-2 border-black"></div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex flex-col justify-center px-5 py-10 sm:px-8 md:px-12 lg:px-16">
            <div className="mb-10">
              <h1 className="text-[22px] sm:text-[28px] md:text-[32px] font-bold text-white mb-3">
                Player Login
              </h1>
              <p className="text-[12px] sm:text-[14px] text-gray-400">
                Enter the Arena
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              
                <label className="block text-[10px] sm:text-[12px] text-gray-400 mb-3 tracking-wide uppercase">
                  USERNAME
                </label>
                <input
                  type="text"
                  className="w-full p-3 sm:p-4 bg-gray-800 border-2 border-gray-500 text-white text-xs sm:text-sm outline-none focus:border-yellow-400 transition-all duration-300"
                  placeholder="Enter your player ID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              

              
                <label className="block text-[10px] sm:text-[12px] text-gray-400 mb-3 tracking-wide uppercase">
                  PASSWORD
                </label>
                <input
                  type="password"
                  className="w-full p-3 sm:p-4 bg-gray-800 border-2 border-gray-500 text-white text-xs sm:text-sm outline-none focus:border-yellow-400 transition-all duration-300"
                  placeholder="Enter access code"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 text-[10px] sm:text-[12px] gap-3 sm:gap-0">
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    className="appearance-none w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-400 checked:bg-yellow-400"
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="#"
                  onClick={handleLinkClick}
                  className="text-yellow-400 hover:text-white"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full p-3 sm:p-4 text-[14px] sm:text-[16px] md:text-[18px] font-bold uppercase border-2 border-gray-500 transition-all duration-300 ${
                  isLoading
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-200 text-black hover:bg-yellow-400 hover:text-black"
                } active:bg-gray-400 disabled:opacity-50`}
              >
                {isLoading ? "LOADING..." : "START GAME"}
              </button>

              <div className="text-center mt-6 text-gray-300 text-xs sm:text-sm">
                New Player?{" "}
                 <Link to="/signup" className="text-yellow-400 hover:text-yellow-600 hover:underline hover:cursor-pointer">
    Create Account
  </Link>
                
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ShaastraLogin;














// import React, { useEffect, useState, FormEvent } from "react";
// import { Link } from "react-router-dom";

// const ShaastraLogin: React.FC = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     // Starfield
//     const starfield = document.getElementById("starfield");
//     if (starfield) {
//       starfield.innerHTML = "";
//       for (let i = 0; i < 100; i++) {
//         const star = document.createElement("div");
//         star.className =
//           "star absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle";
//         star.style.left = Math.random() * 100 + "%";
//         star.style.top = Math.random() * 100 + "%";
//         star.style.animationDelay = Math.random() * 3 + "s";
//         starfield.appendChild(star);
//       }
//     }

//     // Floating particles
//     const particles = document.getElementById("particles");
//     if (particles) {
//       particles.innerHTML = "";
//       for (let i = 0; i < 20; i++) {
//         const particle = document.createElement("div");
//         particle.className =
//           "particle fixed w-1 h-1 bg-[#ff0] rounded-full pointer-events-none shadow-[0_0_10px_#ff0] animate-float-particle";
//         particle.style.left = Math.random() * 100 + "%";
//         particle.style.animationDelay = Math.random() * 6 + "s";
//         particle.style.animationDuration = 4 + Math.random() * 4 + "s";
//         particles.appendChild(particle);
//       }
//     }
//   }, []);

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (isLoading) return;
//     setIsLoading(true);
//     setTimeout(() => {
//       alert(
//         `🎮 WELCOME TO SHAASTRA 2025, ${username.toUpperCase()}!\n\n✨ ACCESS GRANTED\n🏆 Ready Player One\n\n>>> GAME ON <<<`
//       );
//       setIsLoading(false);
//     }, 1500);
//   };

//     const inputWrapperClasses =
//     "relative mb-5 focus-within:text-[#FF0] focus-within:[text-shadow:0_0_10px_#ff0]";
//   const inputLabelClasses =
//     "absolute -top-3 left-3 px-2.5 text-base md:text-lg text-[#0ff] [text-shadow:0_0_10px_#0ff] z-10 bg-gradient-to-br from-[rgba(13,2,38,1)] to-[rgba(25,10,50,1)] transition-all duration-300";
//   const inputBaseClasses =
//     "w-full bg-black/80 border-[3px] border-[#0ff] text-[#0ff] p-4 md:p-[18px] font-vt323 text-xl md:text-sm transition-all duration-300 outline-none shadow-[inset_0_0_20px_rgba(0,255,255,0.1),0_0_10px_rgba(0,255,255,0.3)] focus:border-[#fF0] focus:bg-black/95 focus:shadow-[inset_0_0_20px_rgba(255,255,0,0.2),0_0_20px_#ff0,0_0_40px_rgba(255,255,0,0.5)]";


// return (
//   <>
//     <div className="font-vt323 bg-black min-h-screen flex justify-center items-center p-5 relative overflow-hidden">
//       {/* Background Effects */}
//       <div
//         id="starfield"
//         className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
//       ></div>
//       <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-999 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] animate-flicker"></div>

//       {/* Outer Container */}
//       <div className="relative z-10 w-full max-w-[900px] flex flex-col md:flex-row bg-linear-to-br from-[rgba(13,2,38,0.98)] to-[rgba(25,10,50,0.98)] border-[6px] border-[#0ff] shadow-[0_0_20px_#0ff,0_0_40px_#0ff,0_0_80px_rgba(0,255,255,0.5),inset_0_0_60px_rgba(0,255,255,0.1)] [clip-path:polygon(0_20px,20px_0,calc(100%-_20px)_0,100%_20px,100%_calc(100%-20px),calc(100%-20px)_100%,20px_100%,0_calc(100%-_20px))] overflow-hidden">

//         {/* Left Section */}
//         <div className="flex flex-col justify-center items-center border-b-4 md:border-b-0 md:border-r-4 border-[#0ff] px-8 py-12 md:w-1/2">
//           <div
//             className="text-3xl md:text-4xl font-black text-[#ff0] text-center tracking-[8px] mb-6 animate-title-glitch"
//             style={{ 
              
//               textShadow: "0 0 10px #ff0, 0 0 20px #ff0, 0 0 40px #ff0, 4px 4px 0 rgba(255,255,0,0.8)" 
//             }}
//           >
//             SHAASTRA
//           </div>

//           <div 
//             className="font-orbitron text-2xl md:text-3xl font-bold text-[#0ff] text-center my-6 animate-pulse-glow"
//             style={{ 
              
//               textShadow: "0 0 10px #0ff, 0 0 20px #0ff" 
//             }}
//           >
//             2026
//           </div>

//           <div className="w-48 h-24 bg-black border-4 border-[#ff0] flex items-center justify-center my-8 shadow-[0_0_20px_#ff0,inset_0_0_20px_rgba(255,255,0,0.2)] animate-status-pulse">
//             <span 
//               className="text-[#ff0] text-3xl font-black tracking-[4px]"
//               style={{ 
                
//                 textShadow: "0 0 10px #ff0" 
//               }}
//             >
//               READY
//             </span>
//           </div>

//           <div className="flex justify-center gap-4 mt-6">
//             <div className="w-8 h-8 bg-[#ff0] border-2 border-[#0ff] shadow-[0_0_10px_#ff0]"></div>
//             <div className="w-8 h-8 bg-[#ffae00] border-2 border-[#0ff] shadow-[0_0_10px_#ff0]"></div>
//             <div className="w-8 h-8 bg-[#ff9100] border-2 border-[#ff0] shadow-[0_0_10px_#ff0]"></div>
//           </div>

//           <div className="mt-8 text-[#0ff] text-sm text-center animate-blink" style={{ textShadow: "0 0 5px #0ff" }}>
//             ◆ SYSTEM ONLINE ◆
//           </div>
//         </div>

//         {/* Right Section - Login Form */}
//         <div className="flex flex-col justify-center items-center p-8 md:w-1/2 relative">
//           {/* Login Title */}
//           <div className="text-center mb-8">
//             <h2 className="font-orbitron text-[#ffa703] text-2xl md:text-3xl font-bold tracking-[4px] animate-pulse-glow [text-shadow:0_0_10px_#ff0,0_0_20px_#ff0]">
//               ◆ PLAYER LOGIN ◆
//             </h2>
//           </div>

//           <form onSubmit={handleSubmit} className="w-full max-w-[320px] gap-2">
//             <div className={inputWrapperClasses}>
//               <div className="mb-6">
//               <input
//                 type="text"
//                 placeholder="ENTER USERNAME"
//                 required
//                 className={`${inputBaseClasses} placeholder:text-[#0ff]/30`}
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <div className={inputLabelClasses}>USERNAME</div>
//               </div>
//             </div>

//             <div className={inputWrapperClasses}>
//               <div className="mb-6">
//               <input
//                 type="password"
//                 placeholder="ENTER PASSWORD"
//                 required
//                 className={`${inputBaseClasses} placeholder:text-[#0ff]/30`}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <div className={inputLabelClasses}>PASSWORD</div>
//               </div>
//             </div>

//             <button
//   type="submit"
//   disabled={isLoading}
//   className="w-full bg-gradient-to-r from-[#facc15] via-[#ff0] to-[#facc15] bg-[200%_200%] border-2 border-[#ff0] text-black p-2 font-orbitron text-base font-black tracking-[1px] cursor-pointer mt-4 uppercase transition-all duration-300 shadow-[0_0_10px_#ff0,0_0_20px_rgba(255,255,0,0.5),inset_0_0_10px_rgba(255,255,255,0.2)] animate-gradient-shift hover:translate-y-[-2px] hover:scale-[1.01]"
// >
//   {isLoading ? "LOADING..." : "ENTER THE ARENA"}
// </button>


//             <div className="text-center mt-6 text-yellow-400 text-xs sm:text-sm font-orbitron">
//               New Player?{" "}
//               <Link
//                 to="/signup"
//                 className="text-[#ff0] hover:text-yellow-600 transition-colors duration-300 hover:underline"
//               >
//                 Create Account
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   </>
// );


// };

// export default ShaastraLogin;
