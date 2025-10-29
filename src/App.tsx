import './App.css'
import ShaastraTitle from './components/Title'
import MarioFooter from "./components/footer/footer";
import Patrons from "./components/Patrons";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <>
          <ShaastraTitle />
        </>
        <Patrons />
      </div>
      <MarioFooter />
    </>
  );
}

export default App;
