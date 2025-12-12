import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Home, 
  Grid3X3, 
  HelpCircle, 
  Mic, 
  BarChart3, 
  ChevronDown, 
  MessageSquare, 
  Map, 
  FileText, 
  Settings 
} from 'lucide-react';

interface HeaderProps {
  currentSection: string;
  onAIToggle: () => void;
  // Prop now takes the target view and optionally the secondary tab ID
  onDashboardViewChange: (view: 'landing' | 'analytics', secondaryTab?: string) => void;
}

// Defines the tabs inside the dropdown
const ANALYTIC_TABS = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'feedback', label: 'Submit Feedback', icon: MessageSquare },
    { id: 'map', label: 'Geo Analysis', icon: Map },
    { id: 'reports', label: 'AI Reports', icon: FileText },
    { id: 'admin', label: 'Admin Panel', icon: Settings },
];

const Header: React.FC<HeaderProps> = ({ currentSection, onAIToggle, onDashboardViewChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler to switch view and set the correct secondary tab
  const handleDropdownClick = (secondaryTab: string) => {
      onDashboardViewChange('analytics', secondaryTab);
      setIsDropdownOpen(false);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 500, damping: 30 } },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  return (
    <motion.header 
      // MODIFIED: Changed background to a slightly darker light blue (primary-200)
      className="fixed top-0 left-0 right-0 z-40 bg-primary-200/95 shadow-md text-textDark"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => onDashboardViewChange('landing')}
        >
          {/* Logo: Blue to Teal */}
          <div className="w-9 h-9 bg-gradient-to-r from-primary-600 to-accentPrimary-500 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            {/* Title text is dark */}
            <h1 className="text-lg font-bold text-textDark">
              Digital Saathi AI
            </h1>
            <p className="text-xs text-textMuted">आपका डिजिटल सहायक</p>
          </div>
        </motion.div>

        <nav className="hidden md:flex items-center space-x-4">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'services', label: 'Services', icon: Grid3X3 },
            { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
          ].map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-all duration-300 ${
                currentSection === id
                  ? 'bg-primary-600 text-white'
                  : 'text-textMuted hover:text-textDark hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{label}</span>
            </motion.button>
          ))}
          
          {/* Dropdown Menu for Admin & Tools */}
          <div className="relative">
            <motion.button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-all duration-300 
                ${isDropdownOpen 
                  ? 'bg-accentPrimary-600 text-white shadow-md' 
                  : 'text-textMuted hover:text-textDark hover:bg-gray-100'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm font-medium">Admin & Tools</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
            </motion.button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className="absolute right-0 mt-2 w-56 bg-backgroundCard border border-gray-200 rounded-lg shadow-xl py-1 z-50"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-xs text-textMuted font-semibold border-b border-gray-100">Analytics Views</div>
                  {ANALYTIC_TABS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => handleDropdownClick(item.id)}
                        // Hover styling
                        className="w-full text-left flex items-center space-x-3 px-3 py-2 text-sm text-textDark hover:bg-primary-50 hover:text-primary-600 transition-colors duration-150"
                        whileHover={{ backgroundColor: '#eff6ff', color: '#2563eb' }}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <motion.button
          onClick={onAIToggle}
          // Primary Action Button: Blue to Teal
          className="bg-gradient-to-r from-primary-600 to-accentPrimary-500 hover:from-primary-700 hover:to-accentPrimary-600 px-5 py-2 rounded-full font-semibold shadow-md flex items-center space-x-2 transition-all duration-300 text-white"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(37, 99, 235, 0.3)" }}
          whileTap={{ scale: 0.95 }}
        >
          <Mic className="w-4 h-4" />
          <span className="hidden sm:inline">Start AI Help</span>
          <span className="sm:hidden">AI</span>
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;