import "./App.css";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Meals from "./components/Meals";

function App() {
  return (
    <div>
      <Home />
      <Routes>
        <Route path="/meals" element={<Meals />} />
      </Routes>
    </div>
  );
}

export default App;
