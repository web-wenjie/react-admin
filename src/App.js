
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Index from "./views/index";
import Login from "./views/login";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/index" element={<Index/> } />
      </Routes>
    </Router>

  );
}

export default App;
