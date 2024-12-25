import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Countdown from "./components/Countdown";
import Setup from "./components/Setup";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/countdown" element={<Countdown />}></Route>
        <Route path="/setup" element={<Setup />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
