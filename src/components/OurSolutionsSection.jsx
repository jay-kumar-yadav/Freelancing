import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OurSolutionsSection = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredSolution, setHoveredSolution] = useState(null);

  const solutions = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies.',
      icon: '🌐',
      color: 'from-blue-600 to-cyan-500'
    },
    {
      id: 2,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications.',
      icon: '📱',
      color: 'from-purple-600 to-pink-500'
    },
    {
      id: 3,
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces.',
      icon: '🎨',
      color: 'from-orange-600 to-red-500'
    },
    {
      id: 4,
      title: 'Full-Stack Solutions',
      description: 'End-to-end development services.',
      icon: '⚡',
      color: 'from-green-600 to-emerald-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-netflix-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            My Solutions
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {solutions.map((solution) => (
            <motion.div
              key={solution.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredSolution(solution.id)}
              onHoverEnd={() => setHoveredSolution(null)}
              className="aspect-square bg-netflix-black rounded-lg p-4 border border-gray-800 hover:border-netflix-red transition-all duration-300 relative group overflow-hidden flex flex-col items-center justify-between"
            >
              {/* Red Blur Overlay on Hover */}
              {hoveredSolution === solution.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-netflix-red/10 pointer-events-none"
                />
              )}

              <div className="relative z-10 text-center flex-1 flex flex-col items-center justify-center">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${solution.color} mb-4 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                  {solution.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2">{solution.title}</h3>

                {/* Description */}
                <p className="text-gray-400 text-xs leading-relaxed mb-4">{solution.description}</p>
              </div>

              {/* Learn More Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/services');
                }}
                className={`relative z-10 w-full py-2 bg-gradient-to-r ${solution.color} text-white font-semibold text-sm rounded-md hover:shadow-lg transition-all duration-300`}
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
            className="px-8 py-4 bg-netflix-red text-white font-semibold text-lg rounded-md hover:bg-red-700 transition-colors duration-300 shadow-lg"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default OurSolutionsSection;

