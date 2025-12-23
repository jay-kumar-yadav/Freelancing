import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      company: 'Valaxia LLP',
      role: 'Full-Stack Developer',
      period: 'Current',
      description: 'Developing and maintaining full-stack web applications using modern technologies. Collaborating with cross-functional teams to deliver high-quality software solutions.',
      color: 'from-blue-600 to-blue-400'
    },
    {
      company: 'ExclCloud',
      role: 'Software Development Intern',
      period: 'Previous',
      description: 'Gained hands-on experience in software development, working on real-world projects and learning industry best practices.',
      color: 'from-green-600 to-green-400'
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl font-bold mb-12 text-white"
        >
          Experience
        </motion.h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 10 }}
              className="bg-netflix-dark rounded-lg p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                  <p className="text-xl text-netflix-red font-semibold">{exp.company}</p>
                </div>
                <span className={`mt-2 md:mt-0 px-4 py-2 rounded-full bg-gradient-to-r ${exp.color} text-white text-sm font-semibold`}>
                  {exp.period}
                </span>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">{exp.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;

