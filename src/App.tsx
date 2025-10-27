import { useState } from 'react'
import './App.css'
import ShaastraTitle from './components/Title'
import { ArcadeIntro } from './components/Intro';
import { Loading } from './components/Loading';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [loadingFinished, setLoadingFinished] = useState(false);
  
  return (
    <AnimatePresence mode="wait">
      {!introFinished ? (
        <ArcadeIntro key="intro" onIntroComplete={() => setIntroFinished(true)} />
      ) : !loadingFinished ? (
        <Loading key="loading" onLoadingComplete={() => setLoadingFinished(true)} />
      ) : (
        <ShaastraTitle key="title" />
      )}
    </AnimatePresence>
  )
}

export default App
