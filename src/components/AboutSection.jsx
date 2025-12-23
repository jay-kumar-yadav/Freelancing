import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutSection = () => {
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
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
            I'm a passionate <span className="text-netflix-red font-semibold">Full-Stack Developer</span> based in 
            <span className="text-netflix-red font-semibold"> Bengaluru, India</span>, with expertise in building 
            modern, scalable web applications. I specialize in creating seamless user experiences with cutting-edge 
            technologies.
          </p>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
            With a strong foundation in both frontend and backend development, I bring ideas to life through 
            clean code, innovative solutions, and attention to detail. I'm always eager to take on new challenges 
            and contribute to meaningful projects.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Education</h3>
              <p className="text-gray-400">MCA – CMR University</p>
              
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Previous Education</h3>
              <p className="text-gray-400">B.Sc IT – Ranchi University</p>
              
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

