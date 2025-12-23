import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import Footer from '../components/Footer';

const Portfolio = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    // Handle scroll to section from URL hash or landing page
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, []);

  const scrollToSection = (ref) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 w-full z-50 bg-netflix-black/80 backdrop-blur-md border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="text-2xl font-bold text-netflix-red"
            >
              JKY
            </motion.button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6">
              <button
                onClick={() => scrollToSection(aboutRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection(skillsRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection(experienceRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection(projectsRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-3">
                  <button
                    onClick={() => scrollToSection(aboutRef)}
                    className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2"
                  >
                    About
                  </button>
                  <button
                    onClick={() => scrollToSection(skillsRef)}
                    className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2"
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => scrollToSection(experienceRef)}
                    className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2"
                  >
                    Experience
                  </button>
                  <button
                    onClick={() => scrollToSection(projectsRef)}
                    className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2"
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/contact');
                    }}
                    className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2"
                  >
                    Contact
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-16">
        <div id="about" ref={aboutRef}>
          <AboutSection />
        </div>
        <div id="skills" ref={skillsRef}>
          <SkillsSection />
        </div>
        <div id="experience" ref={experienceRef}>
          <ExperienceSection />
        </div>
        <div id="projects" ref={projectsRef}>
          <ProjectsSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;

