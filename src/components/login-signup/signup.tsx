import React, { useState } from "react";
import type {FormEvent } from "react";
import { useNavigate } from "react-router-dom";

// --- STYLES COMPONENT ---

 const ShaastraStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

       select option {
    background-color: #1e1b4b; /* a purple tone */
    color: #facc15; /* yellow text */
  }

  select option:hover {
    background-color: #facc15;
    color: #1e1b4b;
  }
    `}
  </style>

);

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    alternateMobile: "",
    gender: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Sign-up demo successful!");
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
    <div className="min-h-screen flex items-center justify-center bg-animated text-white">

      <div className=" backdrop-blur-md p-8 rounded-2xl shadow-2xl w-[90%] max-w-3xl"
      style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(6px)",
          }}>
        <h1 className="text-center text-4xl mb-8 text-yellow-400  tracking-wider">SHAASTRA</h1>
        <h2 className="text-center text-2xl mb-8 text-yellow-500">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* --- Basic Information --- */}
          <div>
            <h3 className="text-lg mb-4   border-b border-gray-500 pb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="p-3 rounded-md bg-gray-800/50 placeholder-gray-300 w-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="p-3 rounded-md bg-gray-800/50 placeholder-gray-300 w-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="p-3 rounded-md bg-gray-800/50 placeholder-gray-300 w-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="p-3 rounded-md bg-gray-800/50 placeholder-gray-300 w-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* --- Contact Information --- */}
          <div>
            <h3 className="text-lg mb-4 border-b border-gray-400 pb-2">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                required
                value={formData.mobile}
                onChange={handleChange}
                className="p-3 rounded-md bg-gray-800/50 placeholder-gray-300 w-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="tel"
                name="alternateMobile"
                placeholder="Alternate Number"
                value={formData.alternateMobile}
                onChange={handleChange}
                className="p-3 rounded-md bg-gray-800/50 placeholder-gray-300 w-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* --- Personal Information --- */}
          <div>
            <h3 className="text-lg mb-4 border-b border-gray-400 pb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                aria-label="Choose an option"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="p-3 rounded-md bg-gray-800/50 placeholder-gray-300 w-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"

              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <select
                aria-label="Choose an option"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="p-3 rounded-md bg-gray-800/50 placeholder-gray-300 w-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Select Category</option>
                <option>School</option>
                <option>College</option>
                <option>Professional</option>
              </select>
            </div>
          </div>

          {/* --- Sign Up Button --- */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-gray-600 hover:bg-gray-700 text-yellow-500 font-bold py-3 rounded-md transition-all duration-300 hover:cursor-pointer"
            >
              Sign Up
            </button>
          </div>

          {/* --- Login Link --- */}
          <p className="text-center text-sm mt-4 text-gray-300">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-yellow-600 hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
      </div>
    </div>
    </>
  );
};

export default SignupPage;











// import React, { useEffect, FormEvent } from "react";
// import { Link } from "react-router-dom";

// const SignupPage: React.FC = () => {
//   useEffect(() => {
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

//     const particlesContainer = document.getElementById("particles");
//     if (particlesContainer) {
//       particlesContainer.innerHTML = "";
//       for (let i = 0; i < 20; i++) {
//         const particle = document.createElement("div");
//         particle.className =
//           "particle fixed w-1 h-1 bg-[#0ff] rounded-full pointer-events-none shadow-[0_0_10px_#0ff] animate-float-particle";
//         particle.style.left = Math.random() * 100 + "%";
//         particle.style.animationDelay = Math.random() * 6 + "s";
//         particle.style.animationDuration = 4 + Math.random() * 4 + "s";
//         particlesContainer.appendChild(particle);
//       }
//     }
//   }, []);

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     alert(
//       "⚡ PLAYER INITIALIZED ⚡\n\n>> ACCESS GRANTED <<\n\nWelcome to SHAASTRA!"
//     );
//   };

//   const inputWrapperClasses =
//     "relative mb-5 focus-within:text-[#FF0] focus-within:[text-shadow:0_0_10px_#ff0]";
//   const inputLabelClasses =
//     "absolute -top-3 left-3 px-2.5 text-base md:text-lg text-[#0ff] [text-shadow:0_0_10px_#0ff] z-10 bg-gradient-to-br from-[rgba(13,2,38,1)] to-[rgba(25,10,50,1)] transition-all duration-300";
//   const inputBaseClasses =
//     "w-full bg-black/80 border-[3px] border-[#0ff] text-[#0ff] p-4 md:p-[18px] font-vt323 text-xl md:text-sm transition-all duration-300 outline-none shadow-[inset_0_0_20px_rgba(0,255,255,0.1),0_0_10px_rgba(0,255,255,0.3)] focus:border-[#fF0] focus:bg-black/95 focus:shadow-[inset_0_0_20px_rgba(255,255,0,0.2),0_0_20px_#ff0,0_0_40px_rgba(255,255,0,0.5)]";
//   const sectionHeaderClasses =
//     "text-lg md:text-2xl text-[#ff0] [text-shadow:0_0_15px_#ff0,0_0_30px_#ff0] my-8 py-2.5 border-t-2 border-b-2 border-[#ff0] flex items-center gap-4 before:content-['◆'] before:animate-blink after:content-['◆'] after:animate-blink";
//   const dividerClasses =
//     "text-center my-8 text-3xl text-[#ff0] [text-shadow:0_0_15px_#ff0] animate-float";

//   return (
//     <>
//       <div className="font-vt323 bg-black min-h-screen flex justify-center items-center p-5 relative overflow-hidden">
//         <div
//           id="starfield"
//           className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
//         ></div>

//         <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[999] bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] animate-flicker"></div>

//         <div
//           id="particles"
//           className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
//         ></div>

//         <div className="relative z-10 w-full max-w-[700px] bg-gradient-to-br from-[rgba(13,2,38,0.98)] to-[rgba(25,10,50,0.98)] border-[6px] border-[#0ff] p-6 md:p-[50px] shadow-[0_0_20px_#0ff,0_0_40px_#0ff,0_0_80px_rgba(0,255,255,0.5),inset_0_0_60px_rgba(0,255,255,0.1)] [clip-path:polygon(0_20px,20px_0,calc(100%-_20px)_0,100%_20px,100%_calc(100%-20px),calc(100%-20px)_100%,20px_100%,0_calc(100%-_20px))]">
//           <div className="absolute w-10 h-10 border-[3px] border-[#f0f] z-20 top-[-6px] left-[-6px] border-r-0 border-b-0 after:content-[''] after:absolute after:w-full after:h-full after:border-[3px] after:border-[#ff0] after:animate-rotate-corner after:top-[-3px] after:left-[-3px] after:border-r-0 after:border-b-0"></div>
//           <div className="absolute w-10 h-10 border-[3px] border-[#f0f] z-20 top-[-6px] right-[-6px] border-l-0 border-b-0 after:content-[''] after:absolute after:w-full after:h-full after:border-[3px] after:border-[#ff0] after:animate-rotate-corner after:top-[-3px] after:right-[-3px] after:border-l-0 after:border-b-0"></div>
//           <div className="absolute w-10 h-10 border-[3px] border-[#f0f] z-20 bottom-[-6px] left-[-6px] border-r-0 border-t-0 after:content-[''] after:absolute after:w-full after:h-full after:border-[3px] after:border-[#ff0] after:animate-rotate-corner after:bottom-[-3px] after:left-[-3px] after:border-r-0 after:border-t-0"></div>
//           <div className="absolute w-10 h-10 border-[3px] border-[#f0f] z-20 bottom-[-6px] right-[-6px] border-l-0 border-t-0 after:content-[''] after:absolute after:w-full after:h-full after:border-[3px] after:border-[#ff0] after:animate-rotate-corner after:bottom-[-3px] after:right-[-3px] after:border-l-0 after:border-t-0"></div>

//           <div className="text-center mb-10 relative">
//             <h1 className="font-orbitron text-[#f5f110] text-4xl md:text-[56px] font-black tracking-[6px] md:tracking-[12px] mb-4 relative animate-title-glitch [text-shadow:0_0_10px_#ff0,0_0_20px_#ff0,0_0_40px_#ff0,0_0_80px_#ff0,0_0_120px_rgba(255,255,0,0.5),4px_4px_0_rgba(255,255,0,0.8),-2px_-2px_0_rgba(255,255,0,0.5)]">
//               SHAASTRA
//             </h1>
//             <div className="font-orbitron text-[#ffa703] text-lg md:text-2xl font-bold tracking-[4px] md:tracking-[8px] animate-pulse-glow [text-shadow:0_0_10px_#ff0,0_0_20px_#ff0]">
//               ◆ SIGN UP ◆
//             </div>
//           </div>

//           <form id="signupForm" onSubmit={handleSubmit}>
//             <div className={sectionHeaderClasses}>
//               <span>IDENTITY PROTOCOL</span>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
//               <div className={inputWrapperClasses}>
//                 <input
//                   type="text"
//                   placeholder="ENTER USERNAME"
//                   required
//                   className={`${inputBaseClasses} placeholder:text-[#0ff]/30`}
//                 />
//                 <div className={inputLabelClasses}>USERNAME</div>
//               </div>
//               <div className={inputWrapperClasses}>
//                 <input
//                   type="email"
//                   placeholder="ENTER EMAIL"
//                   required
//                   className={`${inputBaseClasses} placeholder:text-[#0ff]/30`}
//                 />
//                 <div className={inputLabelClasses}>EMAIL</div>
//               </div>
//               <div className={inputWrapperClasses}>
//                 <input
//                   type="password"
//                   placeholder="ENTER PASSWORD"
//                   required
//                   className={`${inputBaseClasses} placeholder:text-[#0ff]/30`}
//                 />
//                 <div className={inputLabelClasses}>PASSWORD</div>
//               </div>
//               <div className={inputWrapperClasses}>
//                 <input
//                   type="password"
//                   placeholder="RE-ENTER PASSWORD"
//                   required
//                   className={`${inputBaseClasses} placeholder:text-[#0ff]/30`}
//                 />
//                 <div className={inputLabelClasses}>CONFIRM</div>
//               </div>
//             </div>

//             <div className={dividerClasses}>★ ━━━━━ ★ ━━━━━ ★</div>

//             <div className={sectionHeaderClasses}>
//               <span>COMMUNICATION LINK</span>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
//               <div className={inputWrapperClasses}>
//                 <input
//                   type="tel"
//                   placeholder="ENTER MOBILE"
//                   required
//                   className={`${inputBaseClasses} placeholder:text-[#0ff]/30`}
//                 />
//                 <div className={inputLabelClasses}>PRIMARY</div>
//               </div>
//               <div className={inputWrapperClasses}>
//                 <input
//                   type="tel"
//                   placeholder="ENTER ALTERNATE"
//                   className={`${inputBaseClasses} placeholder:text-[#0ff]/30`}
//                 />
//                 <div className={inputLabelClasses}>SECONDARY</div>
//               </div>
//             </div>

//             <div className={dividerClasses}>★ ━━━━━ ★ ━━━━━ ★</div>

//             <div className={sectionHeaderClasses}>
//               <span>PLAYER PROFILE</span>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
//               <div className={inputWrapperClasses}>
//                 <select
//                   required
//                   className={`${inputBaseClasses} cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg_xmlns='http://www.w3.org/2000/svg'_width='20'_height='20'_viewBox='0_0_20_20'%3E%3Cpath_fill='%2300ffff'_d='M10_15L3_8h14z'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_15px_center] pr-12`}
//                 >
//                   <option value="" className="bg-[#0d0226] text-[#0ff]">
//                     SELECT GENDER
//                   </option>
//                   <option value="male" className="bg-[#0d0226] text-[#0ff]">
//                     MALE
//                   </option>
//                   <option value="female" className="bg-[#0d0226] text-[#0ff]">
//                     FEMALE
//                   </option>
//                   <option value="other" className="bg-[#0d0226] text-[#0ff]">
//                     OTHER
//                   </option>
//                   <option
//                     value="prefer-not"
//                     className="bg-[#0d0226] text-[#0ff]"
//                   >
//                     PREFER NOT TO SAY
//                   </option>
//                 </select>
//                 <div className={inputLabelClasses}>GENDER</div>
//               </div>
//               <div className={inputWrapperClasses}>
//                 <select
//                   required
//                   className={`${inputBaseClasses} cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg_xmlns='http://www.w3.org/2000/svg'_width='20'_height='20'_viewBox='0_0_20_20'%3E%3Cpath_fill='%2300ffff'_d='M10_15L3_8h14z'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_15px_center] pr-12`}
//                 >
//                   <option value="" className="bg-[#0d0226] text-[#0ff]">
//                     SELECT CATEGORY
//                   </option>
//                   <option value="student" className="bg-[#0d0226] text-[#0ff]">
//                     STUDENT
//                   </option>
//                   <option
//                     value="professional"
//                     className="bg-[#0d0226] text-[#0ff]"
//                   >
//                     PROFESSIONAL
//                   </option>
//                   <option
//                     value="researcher"
//                     className="bg-[#0d0226] text-[#0ff]"
//                   >
//                     RESEARCHER
//                   </option>
//                   <option
//                     value="enthusiast"
//                     className="bg-[#0d0226] text-[#0ff]"
//                   >
//                     ENTHUSIAST
//                   </option>
//                 </select>
//                 <div className={inputLabelClasses}>CATEGORY</div>
//               </div>
//             </div>

//             <button
//   type="submit"
//   className="
//     w-full bg-gradient-to-r from-[#facc15] via-[#ff0] to-[#facc15] bg-[200%_200%]
//     border-2 border-[#ff0] text-black p-3 md:p-4 font-orbitron 
//     text-base md:text-xl font-black tracking-[2px] cursor-pointer mt-6 
//     uppercase relative overflow-hidden transition-all duration-300
//     shadow-[0_0_8px_#ff0,0_0_16px_rgba(255,255,0,0.5),inset_0_0_6px_rgba(255,255,255,0.18)]
//     animate-gradient-shift
//     hover:translate-y-[-3px] hover:scale-[1.01]
//     hover:shadow-[0_0_18px_#ff0,0_0_28px_rgba(255,255,0,0.6),inset_0_0_9px_rgba(255,255,255,0.22)]
//     hover:border-[#ff0]
//     active:translate-y-[-1px] active:scale-100
//     before:content-['▶'] before:absolute before:left-2 md:before:left-4 lg:before:left-6 before:text-[#ff0] before:animate-arrow-pulse
//     after:content-['◀'] after:absolute after:right-2 md:after:right-4 lg:after:right-6 after:text-[#ff0] after:animate-arrow-pulse
//   "
// >
//   INITIALIZE PLAYER
// </button>

//           </form>
//           <div className="text-center mt-6 text-yellow-400 text-xs sm:text-sm font-orbitron">
//             Already a player?{" "}
//             <Link
//               to="/login"
//               className="text-[#ff0] hover:text-yellow-600 transition-colors duration-300 hover:cursor-pointer hover:underline"
//             >
//               Enter the Game
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignupPage;
