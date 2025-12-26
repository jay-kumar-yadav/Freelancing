import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Footer from '../components/Footer';

const StudentsProject = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const carouselRef = useRef(null);
  const slidesRef = useRef([]);
  const containerRef = useRef(null);

  const courses = [
    {
      id: 1,
      name: 'MCA',
      description: 'Master of Computer Applications',
      icon: '🎓'
    },
    {
      id: 2,
      name: 'BCA',
      description: 'Bachelor of Computer Applications',
      icon: '💻'
    },
    {
      id: 3,
      name: 'B.Tech',
      description: 'Bachelor of Technology (CS/IT)',
      icon: '⚙️'
    },
    {
      id: 4,
      name: 'M.Tech',
      description: 'Master of Technology (CS/IT)',
      icon: '🔬'
    }
  ];

  const projectTypes = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Full-stack web applications using modern technologies like React.js, Node.js, MongoDB, and more.',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Tailwind CSS'],
      icon: '🌐',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80'
    },
    {
      id: 2,
      title: 'Mobile App Development',
      description: 'Cross-platform mobile applications for iOS and Android using React Native or Flutter.',
      technologies: ['React Native', 'Flutter', 'Firebase', 'REST APIs'],
      icon: '📱',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80'
    },
    {
      id: 3,
      title: 'Desktop Applications',
      description: 'Windows and macOS applications built with modern frameworks.',
      technologies: ['Electron', 'Python', 'Java', '.NET'],
      icon: '🖥️',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&q=80'
    },
    {
      id: 4,
      title: 'Machine Learning & AI',
      description: 'AI-powered projects including chatbots, recommendation systems, and data analysis.',
      technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas'],
      icon: '🤖',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80'
    },
    {
      id: 5,
      title: 'Blockchain & Cryptocurrency',
      description: 'Decentralized applications and blockchain-based solutions.',
      technologies: ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts'],
      icon: '⛓️',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop&q=80'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Rahul Sharma',
      course: 'BCA Final Year',
      project: 'E-Commerce Platform',
      quote: 'Jay helped me build an amazing e-commerce platform for my final year project. The code quality and documentation were excellent. I got an A+ grade!',
      rating: 5
    },
    {
      id: 2,
      name: 'Priya Patel',
      course: 'MCA Final Year',
      project: 'Hospital Management System',
      quote: 'Working with Jay was a great experience. He guided me through every step and helped me understand complex concepts. Highly recommended for students!',
      rating: 5
    },
    {
      id: 3,
      name: 'Amit Kumar',
      course: 'B.Tech CSE',
      project: 'Food Delivery App',
      quote: 'The mobile app development project exceeded my expectations. Jay provided affordable pricing and excellent support throughout the project.',
      rating: 5
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      course: 'MCA Final Year',
      project: 'Learning Management System',
      quote: 'I was struggling with my project, but Jay helped me complete it on time. The affordable pricing made it accessible for students like me.',
      rating: 5
    }
  ];

  const benefits = [
    {
      id: 1,
      title: 'Affordable Pricing',
      description: 'Special student-friendly rates that fit your budget',
      icon: '💰'
    },
    {
      id: 2,
      title: 'Complete Documentation',
      description: 'Well-documented code and project reports included',
      icon: '📄'
    },
    {
      id: 3,
      title: 'Source Code Delivery',
      description: 'Get full source code with detailed comments',
      icon: '💾'
    },
    {
      id: 4,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for your queries',
      icon: '🆘'
    },
    {
      id: 5,
      title: 'On-Time Delivery',
      description: 'Projects delivered before your submission deadline',
      icon: '⏰'
    },
    {
      id: 6,
      title: 'Viva Preparation',
      description: 'Guidance and support for project presentation',
      icon: '🎤'
    }
  ];

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerView(1); // Mobile: 1 item
      } else if (width < 1024) {
        setItemsPerView(2); // Tablet: 2 items
      } else {
        setItemsPerView(3); // Desktop: 3 items
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total slides
  const totalSlides = Math.ceil(projectTypes.length / itemsPerView);

  // GSAP Carousel Animation
  useEffect(() => {
    if (slidesRef.current.length === 0 || !containerRef.current) return;

    const slides = slidesRef.current;
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const slideWidth = containerWidth / itemsPerView;

    // Animate to current slide
    const startIndex = currentSlide * itemsPerView;
    
    slides.forEach((slide, index) => {
      const isVisible = index >= startIndex && index < startIndex + itemsPerView;
      const position = (index - startIndex) * slideWidth;
      
      gsap.to(slide, {
        x: position,
        opacity: isVisible ? 1 : 0.4,
        scale: isVisible ? 1 : 0.85,
        duration: 0.8,
        ease: 'power3.out',
        zIndex: isVisible ? 10 : 1
      });
    });
  }, [currentSlide, itemsPerView]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
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
                onClick={() => navigate('/portfolio')}
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
                onClick={() => navigate('/contact')}
                className="text-gray-300 hover:text-white transition-colors font-bold uppercase tracking-wide"
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => navigate('/')}
              className="md:hidden text-gray-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-16 relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              Student Final Year Projects
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Professional final year project development for MCA, BCA, B.Tech, and M.Tech students at affordable prices
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-netflix-red text-white font-semibold text-lg rounded-md hover:bg-red-700 transition-colors duration-300 shadow-lg"
              >
                Get Your Project Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/projects')}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold text-lg rounded-md hover:bg-white hover:text-netflix-black transition-colors duration-300"
              >
                View Sample Projects
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-netflix-dark/50">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-white text-center mb-12"
            >
              We Help Students From
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  onHoverStart={() => setHoveredCard(course.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="bg-netflix-black rounded-lg p-6 border border-gray-800 hover:border-netflix-red transition-all duration-300 relative group overflow-hidden cursor-pointer"
                >
                  {hoveredCard === course.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-netflix-red/10 pointer-events-none"
                    />
                  )}
                  <div className="text-5xl mb-4 text-center">{course.icon}</div>
                  <h3 className="text-xl font-bold text-white text-center mb-2">{course.name}</h3>
                  <p className="text-gray-400 text-sm text-center">{course.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Types Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
            >
              Project Categories
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto"
            >
              We develop projects across various domains related to Computer Science
            </motion.p>
            
            {/* Carousel Container */}
            <div className="relative">
              {/* Carousel Wrapper */}
              <div 
                ref={containerRef}
                className="relative overflow-hidden rounded-lg mb-8"
                style={{ height: '500px' }}
              >
                <div 
                  ref={carouselRef}
                  className="relative h-full"
                  style={{ width: '100%' }}
                >
                  {projectTypes.map((project, index) => (
                    <div
                      key={project.id}
                      ref={(el) => {
                        if (el) slidesRef.current[index] = el;
                      }}
                      className="absolute top-0 px-3 h-full"
                      style={{ 
                        width: `${100 / itemsPerView}%`,
                        left: 0
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05, y: -10 }}
                        onHoverStart={() => setHoveredCard(project.id)}
                        onHoverEnd={() => setHoveredCard(null)}
                        className="bg-netflix-dark rounded-lg border border-gray-800 hover:border-netflix-red transition-all duration-300 relative group overflow-hidden h-full flex flex-col"
                      >
                        {hoveredCard === project.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-netflix-red/10 pointer-events-none z-10"
                          />
                        )}
                        
                        {/* Image Section */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black/80 to-transparent"></div>
                          <div className="absolute top-4 left-4 text-4xl z-10">{project.icon}</div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                          <p className="text-gray-400 mb-4 leading-relaxed flex-grow">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 bg-netflix-black text-gray-300 text-xs rounded-full border border-gray-700"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <motion.button
                  onClick={prevSlide}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-netflix-red rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors duration-300 shadow-lg"
                  aria-label="Previous slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                {/* Dots Indicator */}
                <div className="flex gap-2">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index
                          ? 'bg-netflix-red w-8'
                          : 'bg-gray-600 hover:bg-gray-500 w-3'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={nextSlide}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-netflix-red rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors duration-300 shadow-lg"
                  aria-label="Next slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-netflix-dark/50">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-white text-center mb-12"
            >
              Why Choose Us for Your Final Year Project?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-netflix-black rounded-lg p-6 border border-gray-800 hover:border-netflix-red transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
            >
              What Students Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto"
            >
              Real feedback from students who completed their final year projects with us
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-netflix-dark rounded-lg p-6 border border-gray-800 hover:border-netflix-red transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed italic">"{testimonial.quote}"</p>
                  <div className="border-t border-gray-800 pt-4">
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.course}</p>
                    <p className="text-netflix-red text-sm mt-1">{testimonial.project}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center bg-gradient-to-r from-netflix-red/20 to-red-600/20 rounded-lg p-12 border border-netflix-red/30"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Ready to Start Your Final Year Project?
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                Get professional help with your final year project at student-friendly prices. We ensure quality, timely delivery, and complete documentation.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-netflix-red text-white font-semibold text-lg rounded-md hover:bg-red-700 transition-colors duration-300 shadow-lg"
              >
                Contact Us Now
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default StudentsProject;

