import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';

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
      liveDemo: '#',
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
      liveDemo: '#',
      github: '#',
      category: 'Full-Stack Web Application'
    }
  };

  useEffect(() => {
    if (projectsData[id]) {
      setProject(projectsData[id]);
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
    <div className="min-h-screen bg-netflix-black">
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
        className="relative h-[60vh] overflow-hidden mt-16"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full py-3 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-netflix-black transition-all duration-300 text-center"
                >
                  💻 GitHub Repository
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

