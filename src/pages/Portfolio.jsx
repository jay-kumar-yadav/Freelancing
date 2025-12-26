import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import AboutSection from '../components/AboutSection';
import OurSolutionsSection from '../components/OurSolutionsSection';
import Footer from '../components/Footer';

const Portfolio = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const aboutRef = useRef(null);
  const testimonialsRef = useRef(null);
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });

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
    <div className="min-h-screen bg-netflix-black relative overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-0"
      >
        <img
          src="https://plus.unsplash.com/premium_photo-1726754457459-d2dfa2e3a434?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Dark overlay for text readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-netflix-black/80 via-netflix-black/70 to-netflix-black/90 z-[1]"></div>
      
      {/* Additional gradient overlay for cinematic effect */}
      <div className="fixed inset-0 bg-gradient-to-t from-netflix-black via-transparent to-netflix-black/50 z-[1]"></div>

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
            <div className="hidden md:flex flex-1 justify-center items-center gap-8 ml-8">
              <button
                onClick={() => scrollToSection(aboutRef)}
                className="text-gray-300 hover:text-white transition-colors font-bold uppercase tracking-wide"
              >
                About
              </button>
              <button
                onClick={() => navigate('/projects')}
                className="text-gray-300 hover:text-white transition-colors font-bold uppercase tracking-wide"
              >
                Projects
              </button>
              <button
                onClick={() => navigate('/services')}
                className="text-gray-300 hover:text-white transition-colors font-bold uppercase tracking-wide"
              >
                Services
              </button>
              <button
                onClick={() => navigate('/pricing')}
                className="text-gray-300 hover:text-white transition-colors font-bold uppercase tracking-wide"
              >
                Pricing
              </button>
              <button
                onClick={() => navigate('/students-project')}
                className="text-gray-300 hover:text-white transition-colors font-bold uppercase tracking-wide"
              >
                Students Project
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="text-gray-300 hover:text-white transition-colors font-bold uppercase tracking-wide"
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
                    className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2 font-bold uppercase tracking-wide"
                  >
                    About
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/projects');
                    }}
                    className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2 font-bold uppercase tracking-wide"
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/services');
                    }}
                    className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2 font-bold uppercase tracking-wide"
                  >
                    Services
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/pricing');
                    }}
                    className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2 font-bold uppercase tracking-wide"
                  >
                    Pricing
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/students-project');
                    }}
                    className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2 font-bold uppercase tracking-wide"
                  >
                    Students Project
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/contact');
                    }}
                    className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2 font-bold uppercase tracking-wide"
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
      <div className="pt-16 relative z-10">
        <div id="about" ref={aboutRef}>
          <AboutSection />
        </div>

        {/* Our Solutions Section */}
        <OurSolutionsSection />

        {/* Statistics Section */}
        <div ref={testimonialsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-netflix-dark">
          <div className="max-w-7xl mx-auto">
            {/* Statistics Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            >
              {[
                { icon: '🚀', value: '5+', label: 'Projects Completed' },
                { icon: '⭐', value: '100%', label: 'Client Satisfaction' },
                { icon: '⚡', value: '15+', label: 'Expert Team Members' },
                { icon: '🛡️', value: '24/7', label: 'Support Available' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={testimonialsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  className="text-center p-6 bg-netflix-black rounded-lg border border-gray-800 hover:border-netflix-red transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Ready to Transform Section */}
        <div className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-center bg-gradient-to-r from-netflix-red/20 to-red-600/20 rounded-lg p-12 border border-netflix-red/30"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                Become part of a thriving community of successful businesses that have elevated their digital presence and achieved remarkable growth through innovative technology solutions.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-netflix-red text-white font-semibold text-lg rounded-md hover:bg-red-700 transition-colors duration-300 shadow-lg"
              >
                Start Your Journey
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;

