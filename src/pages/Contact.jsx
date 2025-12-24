import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Footer from '../components/Footer';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // EmailJS Configuration
  // You'll need to replace these with your actual EmailJS credentials
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validate environment variables
    if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || 
        EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
        EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      setIsSubmitting(false);
      setError('EmailJS is not configured. Please check your .env file and EmailJS setup.');
      return;
    }

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          sender_name: formData.name,
          sender_email: formData.email,
          user_email: formData.email,
          message: formData.message,
          to_email: 'jay94588@gmail.com',
          reply_to: formData.email,
        },
        EMAILJS_PUBLIC_KEY
      );

      // Success
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setIsSubmitting(false);
      
      // Provide specific error messages
      if (err.status === 412) {
        setError('Gmail authentication error. Please reconnect your Gmail service in EmailJS dashboard with proper permissions, or use EmailJS default email service instead.');
      } else if (err.status === 400) {
        setError('Invalid template or service configuration. Please check your EmailJS template variables match: {{from_name}}, {{from_email}}, {{message}}');
      } else if (err.status === 403) {
        setError('EmailJS service is not active. Please check your EmailJS dashboard.');
      } else {
        setError(`Failed to send message (Error: ${err.status || 'Unknown'}). Please try again or contact me directly at jay94588@gmail.com`);
      }
    }
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/jay-kumar-yadav-3410aa264/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'Email',
      url: 'mailto:jay94588@gmail.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      )
    }
  ];

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

      {/* Main Content */}
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-400">
              Have a project in mind? Let's collaborate and bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-netflix-dark rounded-lg p-8 border border-gray-800">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2 font-semibold">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-netflix-black border border-gray-700 rounded-md text-white focus:outline-none focus:border-netflix-red transition-colors"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2 font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-netflix-black border border-gray-700 rounded-md text-white focus:outline-none focus:border-netflix-red transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-2 font-semibold">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 bg-netflix-black border border-gray-700 rounded-md text-white focus:outline-none focus:border-netflix-red transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-900/30 border border-red-700 rounded-md text-red-300 text-sm">
                      {error}
                    </div>
                  )}

                  {isSubmitted && (
                    <div className="p-4 bg-green-900/30 border border-green-700 rounded-md text-green-300 text-sm">
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    className="w-full py-4 bg-netflix-red text-white font-semibold text-lg rounded-md hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : isSubmitted ? 'Message Sent! ✓' : 'Send Message'}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="bg-netflix-dark rounded-lg p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">Connect With Me</h2>
                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-4 p-4 bg-netflix-black rounded-md border border-gray-700 hover:border-netflix-red transition-all duration-300 group"
                    >
                      <span className="text-gray-400 group-hover:text-netflix-red transition-colors">
                        {link.icon}
                      </span>
                      <span className="text-gray-300 group-hover:text-white font-semibold">
                        {link.name}
                      </span>
                    </motion.a>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
                    <p className="text-gray-400">Bengaluru, India</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
                    <a href="mailto:jay94588@gmail.com" className="text-gray-400 hover:text-netflix-red transition-colors block mb-1">
                      jay94588@gmail.com
                    </a>
                    <a href="tel:+919097088427" className="text-gray-400 hover:text-netflix-red transition-colors block">
                      +91 9097088427
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

