import { useState } from "react";
import Menu from "./Menu";

export default function Navbar() {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <>
      <nav>
        <div className="flex fixed top-0 left-0 z-100 px-5">
          <button
            onClick={() => {
              setMenuOpened(!menuOpened);
              console.log(menuOpened);
            }}
            className="hover:cursor-pointer hover:scale-95 hover:rotate-90 transition-transform duration-300 ease-in-out p-2 m-2 rounded-full shadow-lg"
          >
            <img src="/pauseimg.png" alt="Menu" className="w-30 h-30" />
          </button>
        </div>
      </nav>

      {menuOpened && (
        <>
          <div className="absolute z-1000 top-0 left-0 w-screen h-screen flex items-center justify-center backdrop-blur-[5px]">
            <div className="w-full h-full absolute z-99" onClick={() => setMenuOpened(false)}></div>
            <div className="absolute z-100"><Menu setMenuOpened={setMenuOpened} /></div>
          </div>
        </>
      )}
    </>
  );
}
