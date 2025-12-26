import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Landing from './pages/Landing';
import Portfolio from './pages/Portfolio';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import StudentsProject from './pages/StudentsProject';
import ChatBot from './components/ChatBot';
import { trackPageView } from './utils/analytics';

// Component to track page views on route changes
function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <PageTracker />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/students-project" element={<StudentsProject />} />
      </Routes>
      <ChatBot />
    </Router>
  );
}

export default App;
