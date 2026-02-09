import GuessNumberGame from "./components/Game";
import { GuessNumberRange } from "./components/GuessNumberRange";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { ToastContainer } from "react-toastify";
function App() {
  
  return (
    <div className="page">
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guess-with-length" element={<GuessNumberGame />} />
        <Route path="/guess-in-range" element={<GuessNumberRange />} />
      </Routes>
      <ToastContainer position={"top-center"} />
    </div>
  );
}

export default App;
