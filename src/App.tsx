import "./App.css";
import ShaastraTitle from "./components/Title";
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
    </>
  );
}

export default App;
