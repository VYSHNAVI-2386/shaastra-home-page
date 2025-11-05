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
  
  return (
    <>
      {/* Main content */}
      <div className="relative">
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
