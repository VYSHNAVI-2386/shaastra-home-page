import { useState } from 'react'
import './App.css'
import ShaastraTitle from './components/Title'
import { ArcadeIntro } from './components/Intro';
import { Loading } from './components/Loading';
import { AnimatePresence } from 'framer-motion';
import MarioMap from './components/MarioMap';

import MarioFooter from "./components/footer/footer";
import Patrons from "./components/Patrons";
import Navbar from "./components/Navbar";
function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [loadingFinished, setLoadingFinished] = useState(false);
  return (
    <>
      <div className="App">
        <Navbar />
        <>
          {/* Background MarioMap - Always visible */}


      {/* Foreground content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!introFinished ? (
            <ArcadeIntro key="intro" onIntroComplete={() => setIntroFinished(true)} />
          ) : !loadingFinished ? (
            <Loading key="loading" onLoadingComplete={() => setLoadingFinished(true)} />
          ) : (
            <>
          <div className="fixed inset-0 z-0">
           <MarioMap />
          </div>
          <ShaastraTitle key="title" />
        </>
        <Patrons />
      </div>
      <MarioFooter />
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
