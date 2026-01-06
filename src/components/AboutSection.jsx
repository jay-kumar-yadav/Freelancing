import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AboutSection = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl font-bold mb-8 text-white"
        >
          About Me
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
            I design and develop modern business websites and full-stack web applications that are fast, responsive, and SEO-optimized.
          </p>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
            As a <span className="text-netflix-red font-semibold">Full-Stack Developer</span> and <span className="text-netflix-red font-semibold">UI/UX Designer</span>, I help businesses turn ideas into scalable digital products built with clean code, strong performance, and user-focused design. From frontend experience to backend logic, every solution is crafted to support long-term growth.
          </p>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
            Projects start from <span className="text-netflix-red font-semibold">₹10,000</span>, based on scope and features.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/services')}
              className="px-8 py-4 bg-netflix-red text-white font-semibold text-lg rounded-md shadow-lg hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-300">▶</span>
              <span>Explore My Services</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-transparent border-2 border-netflix-red text-netflix-red font-semibold text-lg rounded-md hover:bg-netflix-red hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Get Started Today</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

