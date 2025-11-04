import { useState, useEffect } from "react";
import Accoform from "../components/accommadation/Accoform";
import PaymentSummary from "../components/accommadation/PaymentSummary";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  glowIntensity: number;
};

type RegistrationData = {
  totalPeople: number;
  termsAccepted: boolean;
};

const PixelatedParticlesBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    totalPeople: 1,
    termsAccepted: false,
  });

  // store the full shape sent from Accoform
  const [registrationFullData, setRegistrationFullData] = useState<any>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleDataChange = (data: any) => {
    // Accoform now sends { formData, totalPeople, termsAccepted, additionalPeople }
    if (data) {
      setRegistrationFullData(data);
      setRegistrationData({
        totalPeople: data.totalPeople ?? 1,
        termsAccepted: data.termsAccepted ?? false,
      });
    }
  };

  const validateAndPay = () => {
    setPaymentError(null);
    const missing: string[] = [];
    const f = registrationFullData?.formData;
    if (!f) {
      missing.push("Full form");
    } else {
      if (!f.fullName) missing.push("Full Name");
      if (!f.email) missing.push("Email");
      if (!f.mobile) missing.push("Mobile Number");
      if (!f.organization) missing.push("Organization");
      if (!f.idFile) missing.push("Upload ID File");
      if (!f.termsAccepted) missing.push("Accept Terms & Conditions");
    }

    if (missing.length > 0) {
      setPaymentError(`Please fill the following fields: ${missing.join(", ")}`);
      return false;
    }

    // no missing fields => proceed with payment flow (placeholder)
    setPaymentError(null);
    alert("Payment processing... (this is a placeholder)");
    return true;
  };

  useEffect(() => {
    // Generate initial particles
    const initialParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.floor(Math.random() * 2 + 1) * 2, // Very small: 2px or 4px
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.4 + 0.6,
      glowIntensity: Math.random() * 0.5 + 0.5,
    }));
    setParticles(initialParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;
          let newSpeedX = particle.speedX;
          let newSpeedY = particle.speedY;

          // Bounce off edges
          if (newX <= 0 || newX >= 100) {
            newSpeedX = -particle.speedX;
            newX = newX <= 0 ? 0 : 100;
          }
          if (newY <= 0 || newY >= 100) {
            newSpeedY = -particle.speedY;
            newY = newY <= 0 ? 0 : 100;
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image (fixed behind content) */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('bgimg5.jpg')`,
          imageRendering: "pixelated",
        }}
      >
        {/* overlay for atmosphere */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      {/* Pixelated Glowing Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute transition-all duration-75 ease-linear"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              imageRendering: "pixelated",
              opacity: particle.opacity,
            }}
          >
            {/* Pixelated particle core */}
            <div
              className="w-full h-full relative"
              style={{
                backgroundColor: "#FCD34D",
                imageRendering: "pixelated",
                boxShadow: `
                  0 0 ${particle.size}px ${
                  particle.size * 0.3
                }px rgba(252, 211, 77, 0.4),
                  0 0 ${particle.size * 1.5}px ${
                  particle.size * 0.5
                }px rgba(252, 211, 77, 0.2)
                `,
              }}
            >
              {/* Inner pixel detail for more pixelated look */}
              <div
                className="absolute top-0 left-0 w-1/2 h-1/2 bg-yellow-200"
                style={{
                  imageRendering: "pixelated",
                  opacity: 0.6,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pixelated stars in background */}
      <div className="absolute inset-0 opacity-60">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.floor(Math.random() * 2 + 1) * 2}px`,
              height: `${Math.floor(Math.random() * 2 + 1) * 2}px`,
              imageRendering: "pixelated",
              opacity: Math.random() * 0.5 + 0.3,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-4xl mx-auto bg-pink/5 backdrop-blur-[5px] border border-white/30 rounded-xl shadow-lg p-8 md:p-12 my-8 vt323">
          <h1
            className="text-xl md:text-2xl text-white text-center mb-8 font-bold"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            Accommodation Registration
          </h1>
          <div className="mb-4 text-center text-white/90 backdrop-blur-md border border-white/30 border-b pb-4">
            <h4 className="text-sm md:text-base font-semibold mb-2">
              Guidelines / FAQs
            </h4>
            <p className="text-sm md:text-base ">
              Please ensure you review all the guidelines before proceeding with
              the registration.
              <br />
              <a href="#" className="text-blue-300 underline">
                Read the Guidelines Document
              </a>
            </p>
          </div>

          <div className="space-y-8">
            <Accoform onDataChange={handleDataChange} />

            <div className="border-t border-white/20 pt-6">
              <PaymentSummary
                totalPeople={registrationData.totalPeople}
                termsAccepted={registrationData.termsAccepted}
                onAttemptPay={validateAndPay}
                paymentError={paymentError}
              />
            </div>
          </div>
          <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&display=swap');
        .vt323 { font-family: 'VT323', monospace; font-size: 18px; line-height: 1.45; }
        @media (min-width: 768px) { .vt323 { font-size: 20px; } }
      `}</style>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default PixelatedParticlesBackground;
