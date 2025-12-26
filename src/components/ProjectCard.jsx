import { motion } from 'framer-motion';
import { useState } from 'react';

const ProjectCard = ({ project, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="relative cursor-pointer group"
    >
      <div className="relative overflow-hidden rounded-lg bg-netflix-black border border-gray-800 hover:border-netflix-red transition-all duration-300">
        {/* Project Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent opacity-80"></div>
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-netflix-red text-white text-sm font-semibold rounded-full">
              {project.category}
            </span>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-netflix-dark text-gray-300 text-xs rounded-full border border-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* View Details Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-netflix-red text-white font-semibold rounded-md hover:bg-red-700 transition-colors duration-300"
          >
            View Details
          </motion.button>
        </div>

        {/* Hover Overlay */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-netflix-red/10 pointer-events-none"
          />
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;

