
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./views/Home";
import About from "./views/About"
import "./App.scss"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>

  );
}

export default App;
