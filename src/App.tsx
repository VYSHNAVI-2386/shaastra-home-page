import { useState } from 'react'
import './App.css'
import ShaastraTitle from './components/title/Title'
import { ArcadeIntro } from './components/loading/Intro';
import { Loading } from './components/loading/Loading';
import { AnimatePresence } from 'framer-motion';
import MarioMap from './components/mario/MarioMap';
import MarioFooter from "./components/footer/footer";
import Patrons from "./components/patrons/Patrons";
import Navbar from "./components/navbar/Navbar";


function App() {
  const [introFinished, setIntroFinished] = useState(true);
  const [loadingFinished, setLoadingFinished] = useState(true);
  
  return (
    <>
      {/* Background content - Behind MarioMap */}
      <div className="relative z-0">
        <Navbar />
        <AnimatePresence mode="wait">
          {!introFinished ? (
            <ArcadeIntro key="intro" onIntroComplete={() => setIntroFinished(true)} />
          ) : !loadingFinished ? (
            <Loading key="loading" onLoadingComplete={() => setLoadingFinished(true)} />
          ) : (
            <div key="main">
              {/* <Navbar /> */}
              <ShaastraTitle />
              <Patrons />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* MarioMap - Always in front after loading */}
      {loadingFinished && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <MarioMap />
        </div>
      )}

      {/* Footer - Highest z-index, above everything */}
      {loadingFinished && (
        <div className="relative" style={{ zIndex: 100 }}>
          <MarioFooter />
        </div>
      )}
    </>
  );
}

export default App;
