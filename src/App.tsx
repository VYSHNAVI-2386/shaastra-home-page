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

function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const handleSkipIntro = () => {
    setIntroFinished(true);
    setLoadingFinished(true);
  };

  return (
    <>
      {/* Main content */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {!introFinished ? (
           <>
              <ArcadeIntro
                key="intro"
                onIntroComplete={() => setIntroFinished(true)}
              />
              {/* Skip Intro Button */}
              <button
                onClick={handleSkipIntro}
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 text-sm"
                style={{ fontFamily: 'monospace', zIndex: 9999 }}
              >
                SKIP INTRO
              </button>
            </>
          ) : !loadingFinished ? (
            <>
              <Loading
                key="loading"
                onLoadingComplete={() => setLoadingFinished(true)}
              />
              {/* Skip Button for Loading */}
              <button
                onClick={handleSkipIntro}
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 text-sm"
                style={{ fontFamily: 'monospace', zIndex: 9999 }}
              >
                SKIP
              </button>
            </>
          ) : (
            <div key="main">
              <ShaastraTitle />
              <About />
              <Patrons />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* MarioMap - Middle layer */}
      {loadingFinished && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 50 }}
        >
          <MarioMap isMenuOpened={menuOpened} />
        </div>
      )}

      {/* Navbar - Always on top, clickable */}
      {loadingFinished && <Navbar menuOpened={menuOpened} setMenuOpened={setMenuOpened} />}

      {/* Footer - High z-index, above MarioMap but below Navbar */}
      {loadingFinished && (
        <div className="relative" style={{ zIndex: 100 }}>
          <MarioFooter />
        </div>
      )}
    </>
  );
}

export default App;
