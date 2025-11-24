import { useState, lazy, Suspense, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { AnimatePresence } from "framer-motion";

import ShaastraTitle from "./components/title/Title";
import { ArcadeIntro } from "./components/loading/Intro";
import { Loading } from "./components/loading/Loading";
import MarioMap from "./components/mario/MarioMap";
import MarioFooter from "./components/footer/footer";
import Patrons from "./components/patrons/Patrons";
import Navbar from "./components/navbar/Navbar";
import About from "./components/about/About";
import IOHRegistration from "./Pages/ioh-registration";

// Lazy-loaded pages
const ShaastraLogin = lazy(() => import("./components/login-signup/login"));
const SignupPage = lazy(() => import("./components/login-signup/signup"));
const ForgetPassword = lazy(
  () => import("./components/login-signup/forget-password")
);
// const ResetPassword = lazy(() => import("./components/login-signup/resetPassword"));

function AppContent() {
  const [introFinished, setIntroFinished] = useState(false);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const loginRoutes = ["/login", "/signup"];
  const isLoginPage = loginRoutes.includes(location.pathname);
  const homeRoutes = ["/login", "/signup", "/forget", "/reset", "/open-house"];
  const ishomePage = homeRoutes.includes(location.pathname);

  // Intersection Observer for Footer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% of footer is visible
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, [introFinished, loadingFinished, isLoginPage]); // Re-run when these change as footer might be mounted/unmounted

  // Skip button handler
  const handleSkipIntro = () => {
    setIntroFinished(true);
    setLoadingFinished(true);
  };

  return (
    <AnimatePresence mode="wait">
      {!introFinished && location.pathname === "/" ? (
        <>
          <ArcadeIntro
            key="intro"
            onIntroComplete={() => setIntroFinished(true)}
          />
          {/* Skip Intro Button */}
          <button
            onClick={handleSkipIntro}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 text-sm"
            style={{ fontFamily: "monospace", zIndex: 9999 }}
          >
            SKIP INTRO
          </button>
        </>
      ) : !loadingFinished && location.pathname === "/" ? (
        <>
          <Loading
            key="loading"
            onLoadingComplete={() => setLoadingFinished(true)}
          />
          {/* Skip Button for Loading */}
          <button
            onClick={handleSkipIntro}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 text-sm"
            style={{ fontFamily: "monospace", zIndex: 9999 }}
          >
            SKIP
          </button>
        </>
      ) : (
        <>
          {/* Navbar — hidden on login/signup pages */}
          {!isLoginPage && (
            <Navbar menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
          )}

          <div className="relative min-h-screen">
            <Suspense
              fallback={
                <div className="text-white text-center mt-10">Loading...</div>
              }
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <div key="main">
                      <ShaastraTitle />
                      <About />
                      <Patrons />
                    </div>
                  }
                />
                <Route
                  path="/login"
                  element={
                      <ShaastraLogin />  
                  }
                />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forget" element={<ForgetPassword />} />
                {/* <Route path="/reset" element={<ResetPassword />} /> */}
                <Route path="/open-house" element={<IOHRegistration />} />
              </Routes>
            </Suspense>
          </div>

          {/* Mario map and footer (only for non-login pages) */}
          {!isLoginPage && (
            <>
              <div ref={footerRef} className="relative z-100">
                <MarioFooter />
              </div>
            </>
          )}
          {!ishomePage && (
            <>
              <div className="fixed inset-0 pointer-events-none z-90">
                <MarioMap
                  isMenuOpened={menuOpened}
                  isFooterVisible={isFooterVisible}
                />
              </div>
            </>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
