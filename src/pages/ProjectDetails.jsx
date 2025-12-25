import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { trackProjectView } from '../utils/analytics';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  const projectsData = {
    sportsinn: {
      title: 'SportsInn',
      description: 'A comprehensive sports community platform that connects athletes, coaches, and sports enthusiasts. The platform enables users to create profiles, join teams, organize events, and engage with the sports community.',
      longDescription: 'SportsInn is a full-featured sports community platform designed to bring together athletes, coaches, and sports enthusiasts. The platform provides a seamless experience for managing teams, organizing events, tracking performance, and building a vibrant sports community.',
      features: [
        'User authentication and profile management',
        'Team creation and management',
        'Event organization and scheduling',
        'Real-time chat and messaging',
        'Performance tracking and analytics',
        'Social feed and community engagement',
        'Responsive design for all devices'
      ],
      techStack: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Socket.io', 'JWT'],
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=600&fit=crop',
      liveDemo: 'https://sportsinn.co/login',
      github: '#',
      category: 'Full-Stack Web Application'
    },
    'campus-recruitment': {
      title: 'Campus Recruitment Portal',
      description: 'A streamlined platform designed to connect students with recruiters and manage campus placements efficiently. The system simplifies the recruitment process for both students and companies.',
      longDescription: 'The Campus Recruitment Portal is an enterprise-level solution that streamlines the entire campus recruitment process. It provides a centralized platform where students can apply for positions, companies can post job openings, and administrators can manage the entire recruitment workflow.',
      features: [
        'Student and company registration',
        'Job posting and application management',
        'Resume upload and profile management',
        'Interview scheduling system',
        'Admin dashboard for oversight',
        'Email notifications and alerts',
        'Advanced search and filtering'
      ],
      techStack: ['React.js', '.NET', 'SQL Server', 'JWT', 'RBAC', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop',
      liveDemo: 'https://job-portal-frontend-teal-zeta.vercel.app/',
      github: '#',
      category: 'Full-Stack Web Application'
    },
    'hoodie-ecommerce': {
      title: 'Hoodie Ecommerce Website',
      description: 'Modern ecommerce platform specializing in hoodies with seamless shopping experience and secure checkout.',
      longDescription: 'A fully-featured ecommerce website designed specifically for selling hoodies. The platform offers a smooth shopping experience with product filtering, cart management, secure payment processing, and order tracking. Built with modern technologies to ensure fast performance and excellent user experience.',
      features: [
        'Product catalog with filtering and search',
        'Shopping cart and wishlist functionality',
        'Secure payment gateway integration',
        'User authentication and profiles',
        'Order tracking and management',
        'Admin dashboard for inventory',
        'Responsive design for all devices',
        'Product reviews and ratings'
      ],
      techStack: ['React.js', 'Node.js', 'MongoDB', 'Stripe', 'Express.js', 'JWT'],
      image: 'https://images.unsplash.com/photo-1517298257259-f72ccd2db392?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9kZGllfGVufDB8fDB8fHww',
      liveDemo: 'https://srl-creations.netlify.app/',
      github: '#',
      category: 'E-Commerce Platform'
    },
    'restaurant-website': {
      title: 'Restaurant Website',
      description: 'Beautiful restaurant website with online menu, reservation system, and food ordering capabilities.',
      longDescription: 'A comprehensive restaurant website that showcases the restaurant\'s menu, allows customers to make reservations online, and enables food ordering for delivery or pickup. The platform includes an admin panel for managing menu items, reservations, and orders.',
      features: [
        'Interactive menu with categories',
        'Online reservation system',
        'Food ordering and checkout',
        'Table booking management',
        'Admin dashboard',
        'Order tracking',
        'Customer reviews',
        'Responsive design'
      ],
      techStack: ['React.js', 'Node.js', 'MySQL', 'Express.js', 'Tailwind CSS', 'JWT'],
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop',
      liveDemo: 'https://resturent-chi.vercel.app',
      github: '#',
      category: 'Restaurant Management System'
    },
    fynally: {
      title: 'Fynally.io',
      description: 'A life companion platform supporting individuals through every stage of their career development.',
      longDescription: 'Fynally.io is designed to be a life companion platform that supports individuals through every stage of their career development. The platform provides tailored resources and support for Students (foundational resources and academic support), Learners (specialized courses and skill development), and Employees (career advancement and professional growth).',
      features: [
        'Student resources and academic support',
        'Specialized courses and skill development',
        'Career advancement tools',
        'Professional growth resources',
        'Personalized learning paths',
        'Progress tracking and analytics',
        'Community engagement',
        'Responsive design for all devices'
      ],
      techStack: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JWT', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
      liveDemo: 'https://finally-qh86-git-main-jay-kumar-yadavs-projects-8d4c55af.vercel.app/',
      github: '#',
      category: 'Career Development Platform'
    },
    'ielts-website': {
      title: 'IELTS Website',
      description: 'A static responsive website for IELTS preparation and information.',
      longDescription: 'A static responsive website built with React.js and Tailwind CSS, designed to provide information and resources for IELTS preparation. The website features a clean, modern design with smooth animations and is fully responsive across all devices.',
      features: [
        'Fully responsive design',
        'Modern and clean UI',
        'Smooth animations',
        'IELTS information and resources',
        'Fast loading performance',
        'Mobile-friendly interface',
        'SEO optimized',
        'Cross-browser compatible'
      ],
      techStack: ['React.js', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop',
      liveDemo: 'https://ielts-website-five.vercel.app/',
      github: '#',
      category: 'Static Website'
    }
  };

  useEffect(() => {
    if (projectsData[id]) {
      const projectData = projectsData[id];
      setProject(projectData);
      // Track project view
      trackProjectView(projectData.title);
    } else {
      navigate('/portfolio');
    }
  }, [id, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

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
              onClick={() => navigate('/portfolio')}
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[60vh] overflow-hidden mt-16 z-10"
      >
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-netflix-black/50 to-netflix-black"></div>
        </div>
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold text-white mb-4"
            >
              {project.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl text-gray-300"
            >
              {project.category}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">Description</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                {project.longDescription}
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">Features</h2>
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                    className="flex items-start text-gray-300"
                  >
                    <span className="text-netflix-red mr-3 mt-1">✓</span>
                    <span className="text-lg">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-netflix-dark rounded-lg p-6 border border-gray-800 sticky top-24"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Project Info</h3>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-300 mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-netflix-black text-gray-300 text-sm rounded-full border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <motion.a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full py-3 bg-netflix-red text-white font-semibold rounded-md hover:bg-red-700 transition-colors duration-300 text-center"
                >
                  🔗 Live Demo
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetails;

