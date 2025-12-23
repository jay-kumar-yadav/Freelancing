import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-netflix-black border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {currentYear} Jay Kumar Yadav. All rights reserved.
          </div>
          <div className="flex gap-6">
            <motion.a
              href="https://www.linkedin.com/in/jay-kumar-yadav-3410aa264/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-400 hover:text-netflix-red transition-colors"
            >
              LinkedIn
            </motion.a>
            <motion.a
              href="https://github.com/jay-kumar-yadav"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-400 hover:text-netflix-red transition-colors"
            >
              GitHub
            </motion.a>
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.1 }}
              className="text-gray-400 hover:text-netflix-red transition-colors"
            >
              Contact
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

