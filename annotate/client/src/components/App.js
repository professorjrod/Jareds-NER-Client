import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Datasets from "./Datasets";
import Show from "./Show";
import Annotate from "./Annotate";
const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/datasets" element={<Datasets />} />
      <Route path="datasets/:id" element={<Show />} />
      <Route
        path="/"
        element={<div>This should be a component with app documentation</div>}
      />
      <Route path="annotate/:id" element={<Annotate />} />
    </Routes>
  </Router>
);

export default App;
