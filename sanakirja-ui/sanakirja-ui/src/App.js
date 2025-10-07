import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import SearchWord from "./Components/SearchWord";
import AddWord from "./Components/AddWord";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchWord />} />
        <Route path="/add" element={<AddWord />} />
      </Routes>
    </Router>
  );
}

export default App;
