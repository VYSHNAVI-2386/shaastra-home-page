import { useState } from "react";
import "./App.css";
import ShaastraTitle from "./components/title/Title";
import { ArcadeIntro } from "./components/loading/Intro";
import { Loading } from "./components/loading/Loading";
import { AnimatePresence } from "framer-motion";
import MarioMap from "./components/mario/MarioMap";
import MarioFooter from "./components/footer/footer";
import Patrons from "./components/patrons/Patrons";
import Navbar from "./components/navbar/Navbar";
import About from "./components/about/About";
import Accommadation from "./Pages/Accommadation";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const [introFinished, setIntroFinished] = useState(true);
  const [loadingFinished, setLoadingFinished] = useState(true);
  const location = useLocation();
  const isAccommadationPage = location.pathname === "/Accommadation";
  const isHomePage = location.pathname === "/";

  return (
    <>
      {/* Main content - routes handle which page is shown */}
      <div className="relative">
        {/* If we're on the Accommadation page, skip AnimatePresence */}
        {isAccommadationPage ? (
          <div>
            <Navbar />
            <Routes>
              <Route path="/Accommadation" element={<Accommadation />} />
            </Routes>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {!introFinished ? (
              <ArcadeIntro
                key="intro"
                onIntroComplete={() => setIntroFinished(true)}
              />
            ) : !loadingFinished ? (
              <Loading
                key="loading"
                onLoadingComplete={() => setLoadingFinished(true)}
              />
            ) : (
              <div key="main">
                {/* Navbar stays outside routes so it's always visible */}
                <Navbar />

                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <ShaastraTitle />
                        <About />
                        <Patrons />
                      </>
                    }
                  />
                  <Route path="/Accommadation" element={<Accommadation />} />
                </Routes>
              </div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* MarioMap - Middle layer (show only on home page) */}
      {loadingFinished && isHomePage && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 50 }}
        >
          <MarioMap />
        </div>
      )}

      {/* Footer - show on all pages when loading finished */}
      {loadingFinished && (
        <div className="relative" style={{ zIndex: 100 }}>
          <MarioFooter />
        </div>
      )}
    </>
  );
}

export default App;
