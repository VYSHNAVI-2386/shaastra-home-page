import { useState } from "react";
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
import ShaastraLogin from "./components/login-signup/login";
import SignupPage from "./components/login-signup/signup";

function AppContent() {
  const [introFinished, setIntroFinished] = useState(false);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/signup";


  return (
    <AnimatePresence mode="wait">
      {!introFinished ? (
        <ArcadeIntro key="intro" onIntroComplete={() => setIntroFinished(true)} />
      ) : !loadingFinished ? (
        <Loading key="loading" onLoadingComplete={() => setLoadingFinished(true)} />
      ) : (
        <>
          {!isLoginPage && <Navbar />}

          <div className="relative min-h-screen">
            <Routes>
              <Route
                path="/"
                element={
                  <div key="main">
                    <ShaastraTitle />
                    <Patrons />
                  </div>
                }
              />
              <Route path="/login" element={<ShaastraLogin />} />
              <Route path  ="/signup" element={<SignupPage/>}/>
            </Routes>
          </div>

          {!isLoginPage && (
            <>
              <div className="fixed inset-0 pointer-events-none z-0">
                <MarioMap />
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
