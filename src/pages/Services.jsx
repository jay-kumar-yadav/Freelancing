import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Footer from '../components/Footer';

const Services = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Building responsive, modern websites that deliver exceptional user experiences and drive business growth.',
      longDescription: 'I specialize in creating full-stack web applications using cutting-edge technologies. From simple landing pages to complex web platforms, I build scalable solutions that are fast, secure, and user-friendly.',
      features: [
        'Responsive & Mobile-First Design',
        'Full-Stack Development',
        'E-Commerce Solutions',
        'API Integration',
        'Performance Optimization',
        'SEO Friendly',
        'Modern Frameworks (React, Node.js, etc.)'
      ],
      icon: '🌐',
      color: 'from-blue-600 to-cyan-500',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Next.js']
    },
    {
      id: 2,
      title: 'Mobile App Development',
      description: 'Creating native and cross-platform mobile applications that provide seamless experiences on iOS and Android.',
      longDescription: 'I develop high-performance mobile applications using modern frameworks. Whether you need a native app or a cross-platform solution, I deliver apps that are intuitive, fast, and engaging.',
      features: [
        'Cross-Platform Development',
        'Native iOS & Android',
        'UI/UX Implementation',
        'App Store Deployment',
        'Real-time Features',
        'Push Notifications',
        'API Integration'
      ],
      icon: '📱',
      color: 'from-purple-600 to-pink-500',
      techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'REST APIs']
    },
    {
      id: 3,
      title: 'UI/UX Design',
      description: 'Designing beautiful, intuitive interfaces that enhance user engagement and improve conversion rates.',
      longDescription: 'I create user-centered designs that are not only visually appealing but also highly functional. My design process focuses on understanding user needs and creating experiences that delight and convert.',
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Visual Design',
        'Design Systems',
        'User Testing',
        'Responsive Design',
        'Accessibility Standards'
      ],
      icon: '🎨',
      color: 'from-orange-600 to-red-500',
      techStack: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'Design Systems', 'User Research']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
            My Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive solutions to bring your digital vision to life
          </p>
        </div>
      </motion.div>

      {/* Services Grid */}
      <div ref={ref} className="px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                onHoverStart={() => setHoveredService(service.id)}
                onHoverEnd={() => setHoveredService(null)}
                className="relative bg-netflix-dark rounded-lg p-8 border border-gray-800 hover:border-netflix-red transition-all duration-300 group overflow-hidden"
              >
                {/* Red Blur Overlay on Hover */}
                {hoveredService === service.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-netflix-red/10 pointer-events-none"
                  />
                )}
                
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${service.color} mb-6 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  {service.icon}
                </div>
                <h2 className="text-2xl font-bold text-white mb-4 relative z-10">{service.title}</h2>
                <p className="text-gray-400 mb-6 leading-relaxed relative z-10">{service.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/contact')}
                  className={`w-full py-3 bg-gradient-to-r ${service.color} text-white font-semibold rounded-md hover:shadow-lg transition-all duration-300 relative z-10`}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Detailed Service Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-12"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                onHoverStart={() => setHoveredService(`detail-${service.id}`)}
                onHoverEnd={() => setHoveredService(null)}
                className="relative bg-netflix-dark rounded-lg p-8 md:p-12 border border-gray-800 hover:border-netflix-red transition-all duration-300 overflow-hidden"
              >
                {/* Red Blur Overlay on Hover */}
                {hoveredService === `detail-${service.id}` && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-netflix-red/10 pointer-events-none"
                  />
                )}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
                  <div>
                    <div className={`inline-block w-20 h-20 rounded-lg bg-gradient-to-br ${service.color} mb-6 flex items-center justify-center text-4xl`}>
                      {service.icon}
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4">{service.title}</h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                      {service.longDescription}
                    </p>
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-white mb-3">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.techStack.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-netflix-black text-gray-300 text-sm rounded-full border border-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/contact')}
                      className={`px-8 py-3 bg-gradient-to-r ${service.color} text-white font-semibold rounded-md hover:shadow-lg transition-all duration-300`}
                    >
                      Discuss Your Project
                    </motion.button>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">What's Included</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ delay: 1 + index * 0.2 + featureIndex * 0.1, duration: 0.4 }}
                          className="flex items-start text-gray-300"
                        >
                          <span className={`text-netflix-red mr-3 mt-1 font-bold`}>✓</span>
                          <span className="text-lg">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-20 text-center bg-gradient-to-r from-netflix-red/20 to-red-600/20 rounded-lg p-12 border border-netflix-red/30"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how I can help bring your ideas to life with cutting-edge solutions.
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

export default Services;

