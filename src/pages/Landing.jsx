import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Landing = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const name = "JAY KUMAR YADAV";
  const subtitle = "Full-Stack Developer | Freelancer";

  useEffect(() => {
    // Start animation after a brief delay
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-netflix-black flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://plus.unsplash.com/premium_photo-1726754457459-d2dfa2e3a434?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-netflix-black/80 via-netflix-black/70 to-netflix-black/90 z-[1]"></div>
      
      {/* Additional gradient overlay for cinematic effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-netflix-black/50 z-[1]"></div>
      
      <div className="relative z-10 text-center px-4">
          {/* Name Animation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={showContent ? "visible" : "hidden"}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight">
              {name.split('').map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  className="inline-block"
                  style={{ color: char === ' ' ? 'transparent' : '#fff' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Subtitle Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-400 font-light tracking-wide px-4">
              {subtitle}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/portfolio')}
              className="px-8 py-4 bg-netflix-red text-white font-semibold text-lg rounded-md shadow-lg hover:bg-red-700 transition-colors duration-300 flex items-center gap-2"
            >
              <span>▶</span>
              <span>View Projects</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigate('/portfolio');
                setTimeout(() => {
                  const aboutElement = document.getElementById('about');
                  if (aboutElement) {
                    aboutElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 300);
              }}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold text-lg rounded-md hover:bg-white hover:text-netflix-black transition-all duration-300 flex items-center gap-2"
            >
              <span>ℹ</span>
              <span>About Me</span>
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
  );
};

export default Landing;

