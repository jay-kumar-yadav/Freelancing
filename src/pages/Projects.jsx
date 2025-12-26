import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';

const Projects = () => {
  const navigate = useNavigate();
  const projectsContainerRef = useRef(null);
  const projectCardsRef = useRef([]);
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 'sportsinn',
      title: 'SportsInn',
      description: 'A comprehensive sports community platform connecting athletes, coaches, and sports enthusiasts.',
      techStack: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop',
      category: 'Full-Stack'
    },
    {
      id: 'hoodie-ecommerce',
      title: 'Hoodie Ecommerce Website',
      description: 'Modern ecommerce platform specializing in hoodies with seamless shopping experience and secure checkout.',
      techStack: ['React.js', 'Node.js', 'MongoDB', 'Stripe', 'Express.js'],
      image: 'https://images.unsplash.com/photo-1517298257259-f72ccd2db392?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9kZGllfGVufDB8fDB8fHww',
      category: 'E-Commerce'
    },
    {
      id: 'restaurant-website',
      title: 'Restaurant Website',
      description: 'Beautiful restaurant website with online menu, reservation system, and food ordering capabilities.',
      techStack: ['React.js', 'Node.js', 'MySQL', 'Express.js', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      category: 'Full-Stack'
    },
    {
      id: 'campus-recruitment',
      title: 'Campus Recruitment Portal',
      description: 'Streamlined platform for connecting students with recruiters and managing campus placements.',
      techStack: ['React.js', '.NET', 'SQL Server', 'JWT'],
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
      category: 'Full-Stack'
    },
    {
      id: 'fynally',
      title: 'Fynally.io',
      description: 'A life companion platform supporting individuals through every stage of their career development.',
      techStack: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
      category: 'Career Platform'
    },
    {
      id: 'ielts-website',
      title: 'IELTS Website',
      description: 'A static responsive website for IELTS preparation and information.',
      techStack: ['React.js', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
      category: 'Static Website'
    }
  ];

  // GSAP Cinematic Animation - Projects falling from sky
  useEffect(() => {
    const cards = projectCardsRef.current.filter(Boolean);
    
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
      delay: 0.3, // Reduced delay after page load
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

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/portfolio')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              ← Back to Portfolio
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Delivered Projects
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Explore my portfolio of innovative web applications and solutions
          </p>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div
            ref={projectsContainerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => {
                  if (el) projectCardsRef.current[index] = el;
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ 
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onClick={() => navigate(`/project/${project.id}`)}
                />
              </div>
            ))}
          </div>

          {/* Empty State (if no projects) */}
          {projects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No projects available at the moment.</p>
            </div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-20 text-center bg-gradient-to-r from-netflix-red/20 to-red-600/20 rounded-lg p-12 border border-netflix-red/30"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Have a Project in Mind?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's collaborate and bring your ideas to life with cutting-edge solutions.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-netflix-red text-white font-semibold text-lg rounded-md hover:bg-red-700 transition-colors duration-300 shadow-lg"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Projects;

