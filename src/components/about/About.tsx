import "./about.css";
const GrimAbyssAbout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div
        className="relative max-w-5xl w-full rounded-lg overflow-hidden border-4 border-amber-300 shadow-2xl "
        style={{
          backgroundImage: "url(bgimg2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "500px",
          boxShadow:
            "0 20px 50px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Dark overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-black/50"></div> */}

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8 md:p-12 text-center">
          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 tracking-wide"
            style={{
              fontFamily: "vt323, serif",
              fontWeight: "1000",
            }}
          >
            About
          </h1>

          {/* Description */}
          <div
            className="text-gray-100 text-base sm:text-lg md:text-xl leading-relaxed text-justify px-2 sm:px-4 font-stretch-90%"
            style={{
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
              fontFamily: "vt323, serif",
              fontWeight: "400",
            }}
          >
            <p>
              Shaastra is the annual technical festival of the Indian Institute
              of Technology Madras (IITM), Chennai, India. The Sanskrit word
              'Shaastra' means science and the festival accordingly consists of
              various engineering, science, and technology competitions,
              summits, lectures, video conferences, exhibitions, demonstrations
              and workshops. The festival is traditionally held over four days
              and four nights from 3rd to 7th January. It has so far seen
              twenty-five editions, having started in its current avatar in the
              year 2000. Shaastra is entirely student-managed and is the first
              such event in the world to be ISO 9001:2015 certified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrimAbyssAbout;
