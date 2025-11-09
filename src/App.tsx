import { useState , lazy ,Suspense} from "react";
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
const ShaastraLogin = lazy(() => import("./components/login-signup/login"));
const SignupPage = lazy(() => import("./components/login-signup/signup"));
const ForgetPassword = lazy(() => import("./components/login-signup/forget-password"));
// const ResetPassword = lazy(() => import("./components/login-signup/resetPassword"));

function AppContent() {
  const [introFinished, setIntroFinished] = useState(false);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const location = useLocation();
const loginRoutes = ["/login", "/signup", "/forget", "/reset"];
const isLoginPage = loginRoutes.includes(location.pathname);



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
            <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
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
              <Route path="/forget" element={<ForgetPassword/>}/>
              {/* <Route path = "/reset" element = {<ResetPassword/>}/> */}
            </Routes>
            </Suspense>
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
