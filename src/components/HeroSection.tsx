import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onAIToggle: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onAIToggle }) => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceClick = () => {
    setIsListening(!isListening);
    onAIToggle();
  };

  const examples = [
    "बिजली की समस्या है",
    "फॉर्म भरना है", 
    "दवाई चाहिए",
    "पानी की शिकायत करनी है"
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text Content */}
        <motion.div
          className="space-y-6 text-textDark" // Dark text for light background
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4">
            <motion.div
              // Light pill background
              className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-3 py-1" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-sm text-textMuted font-medium">AI-Powered Government Assistant</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Dark text for visibility */}
              <span className="text-textDark">
                बस बोलिए,
              </span>
              <br />
              {/* Used Teal accent color */}
              <span className="text-accentPrimary-600">
                आपकी मदद तैयार है
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-textMuted max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Voice-first assistance for public services, no typing required.
            </motion.p>
          </div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* FIX: Changed P tag to DIV tag to resolve DOM nesting warning */}
            <div className="text-textMuted font-medium">Try saying:</div> 
            
            <div className="flex flex-wrap gap-2">
              {examples.map((example, index) => (
                <motion.span
                  key={index}
                  // Light example pills
                  className="bg-backgroundCard border border-gray-200 rounded-full px-3 py-1 text-xs text-textDark hover:bg-gray-100 transition-all duration-300 cursor-pointer shadow-sm"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  "{example}"
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - AI Entry */}
        <motion.div
          className="flex flex-col items-center space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Mic Button - Clean Blue/Teal Gradient */}
          <motion.div
            className="relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.button
              onClick={handleVoiceClick}
              // Clean Blue to Teal Gradient
              className={`relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-primary-600 to-accentPrimary-500 flex items-center justify-center shadow-lg transition-all duration-300 ${
                isListening ? 'animate-pulse' : ''
              } text-white`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mic className="w-10 h-10 md:w-12 md:h-12 text-white" />
              
              {/* Pulse rings: Use two matching colors (Primary/Accent 1) */}
              {isListening && (
                <>
                  <div className="absolute inset-0 rounded-full bg-primary-500/30 animate-pulse-ring" />
                  <div className="absolute inset-0 rounded-full bg-accentPrimary-500/30 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
                </>
              )}
            </motion.button>
          </motion.div>

          {/* AI Avatar */}
          <motion.div
            // Accent color for contrast: Teal/Blue
            className="w-16 h-16 bg-gradient-to-r from-accentPrimary-500 to-primary-500 rounded-full flex items-center justify-center shadow-md"
          >
            <span className="text-2xl text-white">🤖</span>
          </motion.div>

          {/* AI Chat Preview - Light look */}
          <motion.div
            // Light background, dark text
            className="bg-backgroundCard border border-gray-200 rounded-xl p-5 max-w-sm shadow-lg text-textDark"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              {/* Logo gradient: Blue to Teal */}
              <div className="w-7 h-7 bg-gradient-to-r from-primary-600 to-accentPrimary-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">🤖</span>
              </div>
              <div>
                <p className="font-semibold text-textDark text-sm">Digital Saathi</p>
                <p className="text-xs text-green-600 flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-1 animate-pulse"></div>
                  Online
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-primary-500/10 rounded-lg p-3">
                <p className="text-sm text-textDark">आपको किस चीज़ में मदद चाहिए?</p>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  // Light button style
                  className="flex-1 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg p-2 text-xs text-textDark transition-all duration-300 flex items-center justify-center space-x-1"
                  onClick={handleVoiceClick}
                >
                  <Mic className="w-3 h-3 text-primary-600" />
                  <span>बोलकर बताएं</span>
                </button>
                <button 
                  // Light button style
                  className="flex-1 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg p-2 text-xs text-textDark transition-all duration-300"
                  onClick={onAIToggle}
                >
                  या लिखें
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;