import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const OurSolutionsSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const solutionCardsRef = useRef([]);
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

  // GSAP Cinematic Animation - Solutions falling from sky
  useEffect(() => {
    const cards = solutionCardsRef.current.filter(Boolean);
    
    if (cards.length === 0) return;

    // Set initial state for all cards
    cards.forEach((card, index) => {
      const randomY = -(400 + Math.random() * 400); // Random Y between -400 and -800
      const randomScale = 0.7 + Math.random() * 0.2; // Scale between 0.7 and 0.9
      const randomRotation = -20 + Math.random() * 40; // Slight 3D rotation for depth
      
      gsap.set(card, {
        opacity: 0,
        y: randomY,
        scale: randomScale,
        rotationX: randomRotation,
        transformOrigin: "center center",
      });
    });

    // Create master timeline
    const tl = gsap.timeline({
      delay: 0.3, // Reduced delay after section comes into view
    });

    // Animate each card falling down with stagger
    cards.forEach((card, index) => {
      const staggerDelay = index * 0.1; // Reduced stagger delay to 0.1s between each card
      
      // Main falling animation
      tl.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.0, // Reduced duration to 1.0s
        ease: "power3.out",
      }, staggerDelay);

      // Subtle bounce/settle effect - bounce up slightly
      tl.to(card, {
        y: -8,
        duration: 0.2, // Reduced to 0.2s
        ease: "power2.out",
      }, staggerDelay + 1.0);
      
      // Settle back down
      tl.to(card, {
        y: 0,
        duration: 0.3, // Reduced to 0.3s
        ease: "expo.out",
      }, staggerDelay + 1.2);
    });

    // Cleanup
    return () => {
      tl.kill();
      cards.forEach(card => {
        gsap.killTweensOf(card);
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-netflix-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              ref={(el) => {
                if (el) solutionCardsRef.current[index] = el;
              }}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredSolution(solution.id)}
              onHoverEnd={() => setHoveredSolution(null)}
              className="aspect-square bg-netflix-black rounded-lg p-4 border border-gray-800 hover:border-netflix-red transition-all duration-300 relative group overflow-hidden flex flex-col items-center justify-between"
              style={{ 
                transformStyle: 'preserve-3d',
                willChange: 'transform'
              }}
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
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
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

