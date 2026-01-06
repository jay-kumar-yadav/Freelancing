import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Footer from '../components/Footer';

const Pricing = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [expandedPlan, setExpandedPlan] = useState(null);

  const pricingPlans = [
    {
      id: 1,
      name: 'BASIC',
      description: 'Best for small businesses & personal brands',
      price: '₹10,000',
      period: 'per project',
      color: 'from-blue-600 to-cyan-500',
      delivery: '5–7 days delivery',
      ideal: 'Ideal for local businesses, startups, portfolios',
      features: [
        'Up to 5 pages (Home, About, Services, Contact, etc.)',
        'Fully responsive (mobile + desktop)',
        'SEO-friendly structure',
        'Fast loading performance',
        'Contact form integration',
        '5–7 days delivery'
      ],
      popular: false
    },
    {
      id: 2,
      name: 'STANDARD',
      description: 'Most popular choice ⭐',
      price: '₹20,000',
      period: 'per project',
      color: 'from-purple-600 to-pink-500',
      delivery: '7–10 days delivery',
      ideal: 'Ideal for growing businesses',
      features: [
        'Up to 8–10 pages',
        'Custom UI/UX design',
        'Advanced SEO setup',
        'WhatsApp + contact form',
        'Performance optimization',
        'Deployment & basic support',
        '7–10 days delivery'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'PREMIUM / FULL-STACK',
      description: 'Custom web applications',
      price: '₹30,000+',
      period: 'starts from',
      color: 'from-orange-600 to-red-500',
      delivery: 'Timeline depends on features',
      ideal: 'Ideal for complex business needs',
      features: [
        'Custom full-stack development',
        'Authentication (login/signup)',
        'Admin panel / dashboard',
        'Database integration',
        'Secure backend APIs',
        'Scalable architecture',
        'Timeline depends on features'
      ],
      popular: false
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
            Pricing Plans
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect plan for your business needs. All plans include quality assurance and ongoing support.
          </p>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <div ref={ref} className="px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                onHoverStart={() => setHoveredPlan(plan.id)}
                onHoverEnd={() => setHoveredPlan(null)}
                className={`relative bg-netflix-dark rounded-lg p-8 border-2 transition-all duration-300 overflow-hidden ${
                  plan.popular 
                    ? 'border-netflix-red md:scale-105 md:-mt-4' 
                    : 'border-gray-800 hover:border-netflix-red'
                }`}
              >
                {/* Red Blur Overlay on Hover */}
                {hoveredPlan === plan.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-netflix-red/10 pointer-events-none"
                  />
                )}

                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-netflix-red text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="relative z-10">
                  {/* Plan Name */}
                  <h2 className="text-3xl font-bold text-white mb-2">{plan.name}</h2>
                  <p className="text-gray-400 mb-2 text-sm leading-relaxed">{plan.description}</p>
                  {plan.ideal && (
                    <p className="text-netflix-red mb-6 text-xs font-semibold">👉 {plan.ideal}</p>
                  )}

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                        {plan.price}
                      </span>
                      <span className="text-gray-400 text-lg">/{plan.period}</span>
                    </div>
                    {plan.delivery && (
                      <p className="text-gray-500 text-sm mt-2">{plan.delivery}</p>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <span className="text-netflix-red mr-3 mt-1 font-bold flex-shrink-0">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/contact')}
                      className={`w-full py-3 bg-gradient-to-r ${plan.color} text-white font-semibold rounded-md hover:shadow-lg transition-all duration-300`}
                    >
                      Get Started
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                      className="w-full py-2 bg-transparent border border-gray-700 text-gray-300 font-semibold rounded-md hover:border-netflix-red hover:text-white transition-all duration-300"
                    >
                      {expandedPlan === plan.id ? 'Hide Breakdown' : 'View Breakdown'}
                    </motion.button>
                  </div>

                  {/* Expanded Breakdown */}
                  {expandedPlan === plan.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-6 border-t border-gray-700"
                    >
                      <h3 className="text-lg font-semibold text-white mb-4">What's Included:</h3>
                      <div className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-gray-300 text-sm">
                            <span className="w-1.5 h-1.5 bg-netflix-red rounded-full mr-3"></span>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-netflix-dark rounded-lg p-8 md:p-12 border border-gray-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">What's Included in All Plans</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-netflix-red mr-3 mt-1">✓</span>
                    <span>Responsive Design</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-netflix-red mr-3 mt-1">✓</span>
                    <span>Quality Assurance & Testing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-netflix-red mr-3 mt-1">✓</span>
                    <span>Source Code Delivery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-netflix-red mr-3 mt-1">✓</span>
                    <span>Documentation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-netflix-red mr-3 mt-1">✓</span>
                    <span>Deployment Support</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Need a Custom Solution?</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  If your requirements don't fit into these plans, I can create a custom solution tailored to your specific needs. Let's discuss your project and find the perfect fit.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/contact')}
                  className="px-8 py-3 bg-netflix-red text-white font-semibold rounded-md hover:bg-red-700 transition-colors duration-300"
                >
                  Contact Me
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12"
          >
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-netflix-dark rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-2">Can I upgrade my plan later?</h3>
                <p className="text-gray-400">Yes, you can upgrade to a higher plan at any time. We'll adjust the pricing accordingly.</p>
              </div>
              <div className="bg-netflix-dark rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-400">We accept bank transfers, UPI, and other standard payment methods. Payment terms can be discussed.</p>
              </div>
              <div className="bg-netflix-dark rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-2">How long does development take?</h3>
                <p className="text-gray-400">BASIC plans take 5–7 days, STANDARD plans take 7–10 days, and PREMIUM/FULL-STACK timeline depends on features and complexity.</p>
              </div>
              <div className="bg-netflix-dark rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-2">Do you provide ongoing support?</h3>
                <p className="text-gray-400">Yes, all plans include maintenance periods. Extended support can be arranged for Enterprise clients.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
