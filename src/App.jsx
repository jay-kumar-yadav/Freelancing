import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Portfolio from './pages/Portfolio';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Pricing from './pages/Pricing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </Router>
  );
}

export default App;
