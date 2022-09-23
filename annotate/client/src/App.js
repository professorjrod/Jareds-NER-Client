import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Datasets from "./Datasets";
import Show from "./Show";
const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/datasets" element={<Datasets />} />
      <Route path="/" element={<div>Home</div>} />
      <Route path="datasets/:id" element={<Show />} />
    </Routes>
  </Router>
);

export default App;
