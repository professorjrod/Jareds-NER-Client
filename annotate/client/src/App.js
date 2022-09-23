import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Datasets from "./Datasets";
const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/datasets" element={<Datasets />} />
      <Route path="/" element={<div>Home</div>} />
    </Routes>
  </Router>
);

export default App;
