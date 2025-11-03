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
  const [introFinished, setIntroFinished] = useState(true);
  const [loadingFinished, setLoadingFinished] = useState(true);

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
              <Navbar />
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
          <MarioMap />
        </div>
      )}

      {/* Navbar - Always on top, clickable */}
      {loadingFinished && <Navbar />}

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
