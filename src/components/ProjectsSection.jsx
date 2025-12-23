import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      id: 'campus-recruitment',
      title: 'Campus Recruitment Portal',
      description: 'Streamlined platform for connecting students with recruiters and managing campus placements.',
      techStack: ['React.js', '.NET', 'SQL Server', 'JWT'],
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
      category: 'Full-Stack'
    }
  ];

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-netflix-dark">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl font-bold mb-12 text-white"
        >
          Projects
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => navigate(`/project/${project.id}`)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;

