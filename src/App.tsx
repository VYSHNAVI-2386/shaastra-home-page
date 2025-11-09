import { useState, lazy, Suspense } from "react";
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

// Lazy-loaded pages
const ShaastraLogin = lazy(() => import("./components/login-signup/login"));
const SignupPage = lazy(() => import("./components/login-signup/signup"));
const ForgetPassword = lazy(() => import("./components/login-signup/forget-password"));
// const ResetPassword = lazy(() => import("./components/login-signup/resetPassword"));

function AppContent() {
  const [introFinished, setIntroFinished] = useState(false);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  const location = useLocation();
  const loginRoutes = ["/login", "/signup", "/forget", "/reset"];
  const isLoginPage = loginRoutes.includes(location.pathname);

  // Skip button handler
  const handleSkipIntro = () => {
    setIntroFinished(true);
    setLoadingFinished(true);
  };

  return (
    <AnimatePresence mode="wait">
      {!introFinished ? (
        <>
          <ArcadeIntro key="intro" onIntroComplete={() => setIntroFinished(true)} />
          {/* Skip Intro Button */}
          <button
            onClick={handleSkipIntro}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 text-sm"
            style={{ fontFamily: "monospace", zIndex: 9999 }}
          >
            SKIP INTRO
          </button>
        </>
      ) : !loadingFinished ? (
        <>
          <Loading key="loading" onLoadingComplete={() => setLoadingFinished(true)} />
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
                <Route path="/login" element={<ShaastraLogin />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forget" element={<ForgetPassword />} />
                {/* <Route path="/reset" element={<ResetPassword />} /> */}
              </Routes>
            </Suspense>
          </div>

          {/* Mario map and footer (only for non-login pages) */}
          {!isLoginPage && (
            <>
              <div className="fixed inset-0 pointer-events-none z-0">
                <MarioMap isMenuOpened={menuOpened} />
              </div>
              <div className="relative z-10">
                <MarioFooter />
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
