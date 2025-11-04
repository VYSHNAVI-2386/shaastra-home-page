// import React, { useState, FormEvent, MouseEvent } from "react";

// // --- STYLES COMPONENT ---
// // Imports the 'Press Start 2P' pixel font
// const ShaastraStyles = () => (
//   <style>
//     {`
//       @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
//     `}
//   </style>
// );

// // --- LOGIN COMPONENT ---
// const ShaastraLogin = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (isLoading) return;

//     setIsLoading(true);
//     // Simulating a network request
//     setTimeout(() => {
//       alert(
//         `🎮 WELCOME TO SHAASTRA 2025, ${username.toUpperCase()}!\n\n✨ ACCESS GRANTED\n🏆 Ready Player One\n\n>>> GAME ON <<<`
//       );
//       setIsLoading(false);
//     }, 1500);
//   };

//   const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     console.log("Link clicked");
//     // Add navigation logic here if needed
//   };

//   return (
//     <>
//       <ShaastraStyles />
//       {/* Main container with 8-bit font and local background */}
//       <div
//         className="font-press-start bg-black text-white min-h-screen flex items-center justify-center overflow-hidden relative p-4"
//         style={{
//           // Using your local background image
//           // Make sure this file is at: [Your_Project_Folder]/public/images/my-pixel-background.png
//           backgroundImage: "url('public/alpha.jpg')",
          
//           backgroundSize: "1280px", // Or '200px' if you want larger tiles
//           imageRendering: "pixelated", // Ensures the pixel art isn't blurry
//         }}
//       >
//         {/* Main login box - Now with semi-transparent background */}
//         <div
//           className="relative z-10 w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 border-4 border-gray-400 rounded-none shadow-lg"
//           style={{
//             backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black
//             backdropFilter: "blur(5px)", // Frosted glass effect
//           }}
//         >
          
//           {/* Left Panel */}
//           <div className="p-[40px_30px] md:p-[60px_40px] flex flex-col justify-center items-center border-b-4 md:border-b-0 md:border-r-4 border-gray-400">
//             {/* "SHAASTRA" Title */}
//             <div
//               className="font-press-start text-[48px] lg:text-[64px] font-bold text-yellow-400 text-center tracking-wide mb-5"
//               style={{ textShadow: "4px 4px 0 #000" }}
//             >
//               SHAASTRA
//             </div>

//             {/* "2025" Subtitle */}
//             <div className="font-press-start text-[32px] font-bold text-white text-center my-6">
//               2025
//             </div>

//             {/* "READY" Box */}
//             <div className="w-[200px] h-[100px] bg-black border-4 border-gray-400 flex items-center justify-center my-5">
//               <span className="text-yellow-500 text-3xl font-press-start">
//                 READY
//               </span>
//             </div>
            
//             {/* Colored Blocks */}
//             <div className="flex justify-center gap-4 mt-4">
//               <div className="w-8 h-8 bg-yellow-700 border-2 border-black"></div>
//               <div className="w-8 h-8 bg-yellow-600 border-2 border-black"></div>
//               <div className="w-8 h-8 bg-yellow-400 border-2 border-black"></div>
//             </div>
//           </div>

//           {/* Right Panel - Login Form */}
//           <div className="p-[40px_30px] md:p-[60px_50px] flex flex-col justify-center">
//             <div className="mb-10">
//               <h1 className="font-press-start text-[32px] font-bold text-white mb-3">
//                 Player Login
//               </h1>
//               <p className="text-[16px] text-gray-400">
//                 Enter the Arena
//               </p>
//             </div>

//             <form id="loginForm" onSubmit={handleSubmit}>
//               <div className="mb-6">
//                 <label className="block font-press-start text-[12px] text-gray-400 mb-3 tracking-wide uppercase">
//                   USERNAME
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full p-4 bg-gray-800 border-2 border-gray-400 rounded-none text-white font-press-start text-sm outline-none focus:border-white transition-all duration-300"
//                   placeholder="Enter your player ID"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="mb-6">
//                 <label className="block font-press-start text-[12px] text-gray-400 mb-3 tracking-wide uppercase">
//                   PASSWORD
//                 </label>
//                 <input
//                   type="password"
//                   className="w-full p-4 bg-gray-800 border-2 border-gray-400 rounded-none text-white font-press-start text-sm outline-none focus:border-white transition-all duration-300"
//                   placeholder="Enter access code"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="flex justify-between items-center mb-6 text-sm">
//                 <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
//                   <input type="checkbox" className="appearance-none w-5 h-5 border-2 border-gray-400 checked:bg-yellow-400" />
//                   <span>Remember me</span>
//                 </label>
//                 <a
//                   href="#"
//                   onClick={handleLinkClick}
//                   className="text-yellow-500 hover:text-white"
//                 >
//                   Forgot password?
//                 </a>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className={`w-full p-4 rounded-none font-press-start text-[18px] font-bold uppercase transition-all duration-300 border-2 border-gray-500 ${
//                   isLoading
//                     ? "bg-yellow-500 text-black"
//                     : "bg-gray-300 text-black"
//                 } hover:bg-white active:bg-gray-400 disabled:opacity-50`}
//               >
//                 {isLoading ? "LOADING..." : "START GAME"}
//               </button>

//               <div className="text-center mt-6 text-gray-300 text-sm">
//                 New Player?{" "}
//                 <a
//                   href="#"
//                   onClick={handleLinkClick}
//                   className="text-yellow-500 hover:text-white"
//                 >
//                   Create Account
//                 </a>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ShaastraLogin;
import React, { useState, FormEvent, MouseEvent } from "react";

// --- STYLES COMPONENT ---
const ShaastraStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

      .font-press-start {
        font-family: 'Press Start 2P', cursive;
      }

      /* Animated background */
      .shaastra-bg {
        background: linear-gradient(-45deg, #000000, #2f2f2f, #facc15, #1a1a1a);
        background-size: 400% 400%;
        animation: gradientShift 12s ease infinite;
      }

      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      /* Subtle glow overlay */
      .shaastra-glow::before {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, rgba(250,204,21,0.15), transparent 70%);
        z-index: 0;
        animation: glowPulse 4s ease-in-out infinite;
      }

      @keyframes glowPulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.6; }
      }
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

      <div className="shaastra-bg shaastra-glow font-press-start text-white min-h-screen flex items-center justify-center relative overflow-hidden p-3 sm:p-6">
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
            <div className="w-[160px] sm:w-[200px] h-[80px] sm:h-[100px] bg-black border-4 border-gray-400 flex items-center justify-center my-5">
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
              <div className="mb-6">
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
              </div>

              <div className="mb-6">
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
              </div>

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
                <a
                  href="#"
                  onClick={handleLinkClick}
                  className="text-yellow-400 hover:text-white"
                >
                  Create Account
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShaastraLogin;
