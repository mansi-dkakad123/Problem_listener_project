import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mic, Brain, FileCheck, CheckCircle } from 'lucide-react';

interface HowItWorksProps {
  onAIToggle: () => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onAIToggle }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Updated colors for steps
  const steps = [
    {
      step: 1,
      icon: Mic,
      title: 'User Just Speaks',
      description: 'बस अपनी आवाज़ में बताएं कि आपको क्या चाहिए',
      color: 'from-primary-500 to-primary-400',
      bgColor: 'bg-primary-500/10'
    },
    {
      step: 2,
      icon: Brain,
      title: 'AI Understands',
      description: 'AI आपकी बात समझकर पुष्टि करता है',
      color: 'from-accentPrimary-500 to-accentPrimary-400',
      bgColor: 'bg-accentPrimary-500/10'
    },
    {
    // Keeping this accent secondary color for contrast/variety
      step: 3,
      icon: FileCheck,
      title: 'AI Takes Action',
      description: 'AI फॉर्म भरता है या शिकायत दर्ज करता है',
      color: 'from-accentSecondary-500 to-accentSecondary-400', 
      bgColor: 'bg-accentSecondary-500/10'
    },
    {
      step: 4,
      icon: CheckCircle,
      title: 'Confirmation',
      description: 'AI बताता है कि क्या किया गया है',
      color: 'from-primary-700 to-primary-600',
      bgColor: 'bg-primary-700/10'
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="how-it-works" className="py-20 px-4 text-textDark">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {/* Gradient: Primary Blue to Accent Teal */}
            <span className="bg-gradient-to-r from-primary-600 to-accentPrimary-600 bg-clip-text text-transparent">
              यह कैसे काम करता है
            </span>
          </h2>
          <p className="text-xl text-textMuted max-w-3xl mx-auto">
            Simple 4-step process to get your work done without any hassle
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              {/* Connection line - Light gray line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-300 transform translate-x-4 z-0" />
              )}

              <motion.div
                // Light card background
                className={`relative bg-backgroundCard border border-gray-200 rounded-2xl p-8 text-center group hover:scale-[1.02] transition-all duration-300 z-10 shadow-md`} 
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                }}
              >
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className={`w-7 h-7 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md`}>
                    {step.step}
                  </div>
                </div>

                {/* Icon - Foreground color is dark, background is gradient */}
                <motion.div
                  className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-md transition-all duration-300`}
                >
                  <step.icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-bold text-textDark mb-3 group-hover:text-textDark transition-colors">
                  {step.title}
                </h3>
                <p className="text-textMuted transition-colors leading-relaxed text-sm">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Demo Section - Clean look */}
        <motion.div
          className="mt-20 bg-backgroundCard border border-gray-200 rounded-3xl p-8 md:p-12 shadow-lg text-textDark"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-textDark mb-4">
              Try It Now! 
            </h3>
            <p className="text-textMuted">
              Experience the power of voice-first AI assistance
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">1</span>
                  </div>
                  <span className="text-textDark font-medium">Say:</span>
                </div>
                <p className="text-primary-600 italic">"मुझे बिजली कनेक्शन के लिए फॉर्म भरना है"</p>
              </div>
              
              <div className="bg-accentPrimary-500/10 border border-accentPrimary-500/20 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-6 h-6 bg-accentPrimary-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">2</span>
                  </div>
                  <span className="text-textDark font-medium">AI responds:</span>
                </div>
                <p className="text-accentPrimary-600 italic">"बिल्कुल! मैं आपकी बिजली कनेक्शन का फॉर्म भरने में मदद करूंगा..."</p>
              </div>
            </div>

            <motion.button
              onClick={onAIToggle}
              // Primary Action Button: Blue to Teal
              className="bg-gradient-to-r from-primary-600 to-accentPrimary-500 hover:from-primary-700 hover:to-accentPrimary-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-3 w-full transition-all duration-300 text-white"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Mic className="w-6 h-6" />
              <span>Start Demo</span>
              <motion.div>
                🎤
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;