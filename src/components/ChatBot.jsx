import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { trackEvent } from '../utils/analytics';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversationStep, setConversationStep] = useState(0); // Track conversation flow: 0=initial, 1=got reply, 2=shown pricing, 3=shown CTA
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! Welcome to my portfolio.\n\nI design and develop professional business websites and full-stack web applications that are fast, responsive, and SEO-optimized.\n\nTo help you faster, please tell me:\n1️⃣ Type of website\n2️⃣ Budget range\n3️⃣ Timeline",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // EmailJS Configuration for chatbot notifications
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
  
  // Create a separate template ID for chatbot notifications (you'll need to create this in EmailJS)
  const CHATBOT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CHATBOT_TEMPLATE_ID || EMAILJS_TEMPLATE_ID;

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check if client provided proper details
  const hasProperDetails = (message) => {
    const lowerMessage = message.toLowerCase();
    // Check for type of website
    const hasType = lowerMessage.match(/(website|web app|ecommerce|business|portfolio|blog|landing page|full.?stack|admin panel|dashboard|application|app)/);
    // Check for budget
    const hasBudget = lowerMessage.match(/(budget|₹|rs|rupee|price|cost|pricing|10,?000|20,?000|30,?000|40,?000|50,?000|thousand|lakh)/);
    // Check for timeline
    const hasTimeline = lowerMessage.match(/(timeline|time|days|weeks|month|delivery|when|how long|duration|deadline)/);
    
    return hasType && (hasBudget || hasTimeline);
  };

  // Check if client is unsure about budget
  const isUnsureAboutBudget = (message) => {
    const lowerMessage = message.toLowerCase();
    return lowerMessage.match(/(not sure|unsure|don't know|don't have|no idea|not clear|confused|help|guide|suggest|recommend).*(budget|price|cost|pricing|how much)/);
  };


  // Simple AI response logic
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();

    // Handle conversation flow for client conversion
    if (conversationStep === 0) {
      // First reply after welcome message
      if (hasProperDetails(userMessage)) {
        // Client gave proper details - Message 2a
        setConversationStep(1);
        return "Perfect 👍 Thanks for sharing the details.\n\nBased on your requirements, I can build a modern, fully responsive and SEO-friendly website tailored to your business needs.\n\nI'll review your requirements and get back to you shortly with the best solution.";
      } else if (isUnsureAboutBudget(userMessage)) {
        // Client unsure about budget - Message 2b
        setConversationStep(1);
        return "No worries 👍 I can guide you.\n\nCould you please tell me:\n• Is this for a business or personal use?\n• How many pages do you need?\n• Do you have any reference websites?\n\nBased on this, I'll suggest the best plan.";
      } else {
        // Client didn't provide clear details
        setConversationStep(1);
        return "Thanks for your message! 👍\n\nTo provide you with the best solution, could you please share:\n1️⃣ Type of website (business, ecommerce, portfolio, etc.)\n2️⃣ Budget range (if you have one)\n3️⃣ Timeline (when you need it)\n\nThis will help me give you a tailored quote!";
      }
    }

    // Greetings (only if not in conversion flow)
    if (conversationStep === 0 && message.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
      return "Hey! 👋 I'm Jay. Nice to meet you! I'm here to help you with website development, mobile apps, UI/UX design, student projects, pricing, or any other services. What would you like to know?";
    }

    // About/Services
    if (message.match(/(what|tell me|about|services|what do you|what can you)/)) {
      if (message.match(/(service|services|offer|provide|do)/)) {
        return "I offer three main services:\n\n🌐 **Web Development** - Full-stack web applications\n📱 **Mobile App Development** - Native and cross-platform apps\n🎨 **UI/UX Design** - Beautiful and intuitive interfaces\n\nWould you like to know more about any specific service?";
      }
      if (message.match(/(about|who|introduce|background)/)) {
        return "Jay Kumar Yadav is a Full-Stack Developer and UI/UX Designer based in Bengaluru, India. He helps brands transform ideas into exceptional digital products with a focus on aesthetic precision, performance, and scalability.";
      }
    }

    // Pricing (check for student project pricing first)
    if (message.match(/(price|cost|pricing|how much|budget|fee|charge|rate)/)) {
      // If asking about student project pricing
      if (message.match(/(student|final year|bca|mca|b\.tech|m\.tech|college project|academic|thesis|dissertation|fyp|final year project)/)) {
        return "Student project pricing starts from **₹3,999** and depends on the intensity and complexity of your project! 💰\n\n**Factors that affect pricing:**\n• Project type (Web, Mobile, Desktop, ML/AI, Blockchain)\n• Complexity and features required\n• Technology stack\n• Timeline and urgency\n• Documentation requirements\n\n**What's included:**\n✅ Complete source code\n✅ Full documentation\n✅ Project report\n✅ Deployment support\n✅ Viva preparation help\n\nFor a detailed quote, I'd need to know more about your project requirements. Would you like to discuss your project or visit the Students Project page?";
      }
      // General pricing - Show conversion message
      if (conversationStep < 2) {
        setConversationStep(2);
        // Add CTA and trust messages after pricing
        setTimeout(() => {
          const ctaMessage = {
            id: Date.now() + 100,
            text: "If everything looks good, we can proceed further.\n\nYou can also message me directly on WhatsApp for faster discussion 👇\n💬 Chat on WhatsApp",
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, ctaMessage]);
        }, 2000);
        
        setTimeout(() => {
          const trustMessage = {
            id: Date.now() + 200,
            text: "⏱ Average response time: 2–4 hours\n🚀 Delivery timeline: 5–7 days (for business websites)",
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, trustMessage]);
        }, 4000);
      }
      return "📌 Project pricing starts from ₹10,000 and depends on features, design, and functionality.\n\nAll websites include:\n✔ Mobile-friendly design\n✔ SEO-optimized structure\n✔ Fast loading performance\n✔ Clean & scalable code";
    }

    // Contact
    if (message.match(/(contact|reach|email|phone|get in touch|connect|call)/)) {
      return "You can reach out through:\n\n📧 Email: jay94588@gmail.com\n📞 Phone: +91 9097088427\n💬 Contact Form: Available on the Contact page\n\nWould you like me to take you to the contact page?";
    }

    // Student Projects
    if (message.match(/(student|final year|bca|mca|b\.tech|m\.tech|college project|academic|thesis|dissertation|fyp|final year project)/)) {
      // Check if asking about pricing
      if (message.match(/(price|cost|pricing|how much|budget|fee|charge|rate)/)) {
        return "Student project pricing starts from **₹3,999** and depends on the intensity and complexity of your project! 💰\n\n**Factors that affect pricing:**\n• Project type (Web, Mobile, Desktop, ML/AI, Blockchain)\n• Complexity and features required\n• Technology stack\n• Timeline and urgency\n• Documentation requirements\n\n**What's included:**\n✅ Complete source code\n✅ Full documentation\n✅ Project report\n✅ Deployment support\n✅ Viva preparation help\n\nFor a detailed quote, I'd need to know more about your project requirements. Would you like to discuss your project or visit the Students Project page?";
      }
      return "I help students with their final year projects! 🎓\n\nI offer professional project development for:\n• MCA (Master of Computer Applications)\n• BCA (Bachelor of Computer Applications)\n• B.Tech (Computer Science/IT)\n• M.Tech (Computer Science/IT)\n\n**Project Types:**\n🌐 Web Development\n📱 Mobile App Development\n🖥️ Desktop Applications\n🤖 Machine Learning & AI\n⛓️ Blockchain & Cryptocurrency\n\n**Benefits:**\n✅ Affordable student-friendly pricing (Starting from ₹3,999)\n✅ Complete documentation\n✅ Source code delivery\n✅ 24/7 support\n✅ On-time delivery\n\nWould you like to know more about student projects? I can take you to the Students Project page!";
    }

    // Projects/Portfolio
    if (message.match(/(project|portfolio|work|showcase|examples|what have you built|projects)/)) {
      return "I've worked on several exciting projects:\n\n🏀 SportsInn - Sports community platform\n🛍️ Hoodie Ecommerce - E-commerce website\n🍽️ Restaurant Website - Food ordering platform\n🎓 Campus Recruitment Portal - Job portal\n💼 Fynally.io - Career development platform\n📝 IELTS Website - Educational platform\n\nWould you like to see the projects page?";
    }

    // Skills/Technologies
    if (message.match(/(skill|technology|tech|stack|what technologies|what do you use|tools|framework)/)) {
      return "I work with modern technologies:\n\n**Frontend:** React.js, Next.js, Tailwind CSS\n**Backend:** Node.js, Express.js, .NET\n**Databases:** MongoDB, MySQL, SQL Server\n**Mobile:** React Native, Flutter\n**Design:** Figma, Adobe XD\n\nWant to know more about my technical expertise?";
    }

    // Experience
    if (message.match(/(experience|how long|years|expertise|background|qualification)/)) {
      return "I'm a Full-Stack Developer with experience in building scalable web and mobile applications. I specialize in creating modern, responsive solutions that combine great design with robust engineering.";
    }

    // Location
    if (message.match(/(where|location|based|city|address|from)/)) {
      return "I'm based in Bengaluru, India. I work with clients globally and can collaborate remotely or on-site depending on the project requirements.";
    }

    // Availability
    if (message.match(/(available|free|busy|when|schedule|timeline|start)/)) {
      return "I'm currently available for new projects! I typically respond within 24 hours. Would you like to discuss your project? I can take you to the contact page to get started!";
    }

    // Help
    if (message.match(/(help|how can|what can|assist|support)/)) {
      return "I can help you with:\n\n✅ Website development services\n✅ Mobile app development\n✅ UI/UX design\n✅ Student final year projects (BCA, MCA, B.Tech, M.Tech)\n✅ Pricing details\n✅ Project portfolio\n✅ Contact information\n✅ Technical expertise\n\nJust ask me anything related to web development, mobile apps, or student projects!";
    }

    // Navigation requests
    if (message.match(/(show|take|go|navigate|open|visit|see)/)) {
      if (message.match(/(student|final year|bca|mca|b\.tech|m\.tech|college project|academic)/)) {
        setTimeout(() => navigate('/students-project'), 500);
        return "Taking you to the Students Project page! 🎓";
      }
      if (message.match(/(project|portfolio|work)/)) {
        setTimeout(() => navigate('/projects'), 500);
        return "Taking you to the projects page! 🚀";
      }
      if (message.match(/(service|services)/)) {
        setTimeout(() => navigate('/services'), 500);
        return "Taking you to the services page! 🚀";
      }
      if (message.match(/(price|pricing|cost)/)) {
        setTimeout(() => navigate('/pricing'), 500);
        return "Taking you to the pricing page! 🚀";
      }
      if (message.match(/(contact|get in touch|reach)/)) {
        setTimeout(() => navigate('/contact'), 500);
        return "Taking you to the contact page! 🚀";
      }
    }

    // Default responses
    const defaultResponses = [
      "That's an interesting question! I'm Jay, and I can help you with website development, mobile apps, UI/UX design, student projects, pricing, or contact information. Could you rephrase your question?",
      "I'm here to help! I'm Jay, and I specialize in website development, mobile apps, UI/UX design, and student final year projects. What would you like to know?",
      "Let me help you with that! I'm Jay. You can ask me about:\n- Website development services\n- Mobile app development\n- UI/UX design\n- Student final year projects (BCA, MCA, B.Tech, M.Tech)\n- Pricing plans\n- Portfolio projects\n- Contact information\n\nWhat interests you most?",
      "I'd be happy to help! I'm Jay. Try asking about website development, mobile apps, student projects, services, pricing, or contact information. What can I assist you with?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  // Send notification email when user sends a message
  const sendChatbotNotification = async (userMessage, conversationContext) => {
    // Only send notification if EmailJS is configured
    if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || 
        EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
        EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      console.log('EmailJS not configured for chatbot notifications');
      return;
    }

    try {
      // Get conversation summary (last 3 user messages)
      const recentUserMessages = messages
        .filter(msg => msg.sender === 'user')
        .slice(-3)
        .map(msg => msg.text)
        .join(' | ');

      // Extract potential contact info from message
      const potentialEmail = userMessage.match(/[\w\.-]+@[\w\.-]+\.\w+/)?.[0] || '';
      const potentialPhone = userMessage.match(/[\d\s\+\-\(\)]{10,}/)?.[0]?.trim() || '';

      // Prepare email content
      const emailParams = {
        to_email: 'jay94588@gmail.com',
        subject: '🤖 New Chatbot Message from Portfolio',
        user_message: userMessage,
        conversation_summary: recentUserMessages || 'First message',
        conversation_step: conversationStep.toString(),
        timestamp: new Date().toLocaleString('en-IN', { 
          timeZone: 'Asia/Kolkata',
          dateStyle: 'full',
          timeStyle: 'long'
        }),
        page_url: window.location.href,
        potential_email: potentialEmail || 'Not provided',
        potential_phone: potentialPhone || 'Not provided',
        message_count: (messages.filter(m => m.sender === 'user').length + 1).toString(),
      };

      // Send email notification
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        CHATBOT_TEMPLATE_ID,
        emailParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Chatbot notification sent successfully');
    } catch (error) {
      console.error('Failed to send chatbot notification:', error);
      // Don't show error to user, just log it silently
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Track message sent
    trackEvent('chatbot_message', {
      message_text: inputValue.substring(0, 50), // Track first 50 chars
      message_length: inputValue.length
    });

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToProcess = inputValue;
    setInputValue('');

    // Send notification email (async, don't wait for it)
    sendChatbotNotification(messageToProcess, {
      step: conversationStep,
      messageCount: messages.length + 1
    });

    // Simulate bot thinking
    setTimeout(() => {
      const botResponseText = getBotResponse(messageToProcess);
      const botResponse = {
        id: Date.now() + 1,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);

      // Handle conversation flow - add follow-up messages
      if (conversationStep === 1 && hasProperDetails(messageToProcess)) {
        // Add pricing message after 2 seconds
        setTimeout(() => {
          const pricingMessage = {
            id: Date.now() + 2,
            text: "📌 Project pricing starts from ₹10,000 and depends on features, design, and functionality.\n\nAll websites include:\n✔ Mobile-friendly design\n✔ SEO-optimized structure\n✔ Fast loading performance\n✔ Clean & scalable code",
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, pricingMessage]);
          setConversationStep(2);
        }, 2000);

        // Add CTA message after 4 seconds
        setTimeout(() => {
          const ctaMessage = {
            id: Date.now() + 3,
            text: "If everything looks good, we can proceed further.\n\nYou can also message me directly on WhatsApp for faster discussion 👇\n💬 Chat on WhatsApp",
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, ctaMessage]);
          setConversationStep(3);
        }, 4000);

        // Add trust boost message after 6 seconds
        setTimeout(() => {
          const trustMessage = {
            id: Date.now() + 4,
            text: "⏱ Average response time: 2–4 hours\n🚀 Delivery timeline: 5–7 days (for business websites)",
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, trustMessage]);
        }, 6000);
      }
    }, 500);
  };

  const handleQuickAction = (action) => {
    // Track quick action
    trackEvent('chatbot_quick_action', { action });

    const quickMessages = {
      services: "What services do you offer?",
      pricing: "What are your pricing plans?",
      projects: "Show me your projects",
      'student-project': "Tell me about student projects",
      contact: "How can I contact you?"
    };

    setInputValue(quickMessages[action]);
    setTimeout(() => {
      const userMessage = {
        id: messages.length + 1,
        text: quickMessages[action],
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);

      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: getBotResponse(quickMessages[action]),
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 500);
    }, 100);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            trackEvent('chatbot_open', {});
          }
        }}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-netflix-red rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
        {!isOpen && (
          <motion.span
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-netflix-black"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[600px] max-h-[calc(100vh-8rem)] bg-netflix-dark rounded-lg shadow-2xl border border-gray-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-netflix-red px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-netflix-red text-xl font-bold">AI</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">AI Assistant</h3>
                  <p className="text-red-100 text-xs">Online • Usually replies instantly</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-netflix-black/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} flex-col`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-netflix-red text-white'
                        : 'bg-netflix-dark text-gray-100 border border-gray-700'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                  {/* WhatsApp button in bot messages that mention WhatsApp */}
                  {message.sender === 'bot' && message.text.includes('WhatsApp') && (
                    <motion.a
                      href="https://wa.me/919097088427?text=Hi!%20I'm%20interested%20in%20your%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-2 px-4 py-2 bg-[#25D366] text-white rounded-lg text-sm font-semibold flex items-center gap-2 w-fit"
                      onClick={() => trackEvent('whatsapp_click', { source: 'chatbot' })}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Chat on WhatsApp
                    </motion.a>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-gray-800 bg-netflix-dark">
                <p className="text-xs text-gray-400 mb-2">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {['services', 'pricing', 'projects', 'student-project', 'contact'].map((action) => (
                    <motion.button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-netflix-black text-gray-300 text-xs rounded-full border border-gray-700 hover:border-netflix-red hover:text-netflix-red transition-colors capitalize"
                    >
                      {action === 'student-project' ? 'Student Project' : action}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800 bg-netflix-dark">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-netflix-black border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-netflix-red transition-colors"
                  autoFocus
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-netflix-red text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;

