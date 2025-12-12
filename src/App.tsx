import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

// --- Components from pr repo (Landing Page) ---
import Header from "./components/Header";
import HeroSection from './components/HeroSection';
import ServiceCategories from './components/ServiceCategories';
import HowItWorks from './components/HowItWorks';
import AIAssistant from './components/AIAssistant';
import ParticleBackground from './components/ParticleBackground';

// --- New Components from tanu repo (Dashboard) ---
import Navbar from './components/common/Navbar'; 
import Dashboard from './components/Dashboard/Dashboard';
import FeedbackForm from './components/Feedback/FeedbackForm';
import GeoMap from './components/Map/GeoMap';
import AIReports from './components/Reports/AIReports';
import AdminPanel from './components/Admin/AdminPanel';

interface Service {
  _id: string;
  name: string;
  description: string;
}

const API_URL = 'http://localhost:5000';

// Component to handle the multi-view Dashboard logic
const MultiViewApp: React.FC<{ 
  onReturnToLanding: () => void;
  initialView: string; // New prop to set the initial/active tab
}> = ({ onReturnToLanding, initialView }) => {
  // Use initialView from props to start on the correct tab
  const [activeView, setActiveView] = useState(initialView); 
  
  // Update state when initialView prop changes (e.g., from header dropdown click)
  useEffect(() => {
      setActiveView(initialView);
  }, [initialView]);
  
  // ... (renderContent remains the same) ...
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'feedback':
        return <FeedbackForm />;
      case 'map':
        return <GeoMap />;
      case 'reports':
        return <AIReports />;
      case 'admin':
        return <AdminPanel />;
      default:
        // Default to Dashboard if an invalid initialView is somehow passed
        return <Dashboard />; 
    }
  };

  return (
    <div className="min-h-screen bg-backgroundLight"> 
      {/* Navbar receives the current active view, which is controlled by this component's state */}
      <Navbar activeView={activeView} onViewChange={setActiveView} />
      
      {/* Back button logic placed directly above main content */}
      <motion.button
          onClick={onReturnToLanding}
          className="fixed top-24 left-4 z-40 bg-primary-600 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-primary-700 transition-colors shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
      >
          ← Back to Home / Voice Assistant
      </motion.button>
      
      {/* Margin top ensures content starts below the main navigation */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 mt-16"> 
        {renderContent()}
      </main>
    </div>
  );
};

// Component for the original Landing Page content
const LandingPage: React.FC<{
  isAIOpen: boolean;
  setIsAIOpen: (isOpen: boolean) => void;
  // Prop now passes a string for the target secondary tab ID
  setCurrentView: (view: 'landing' | 'analytics', secondaryTab?: string) => void; 
  services: Service[];
  loading: boolean;
  error: string;
}> = ({ isAIOpen, setIsAIOpen, setCurrentView, services, loading, error }) => {
  const [currentSection, setCurrentSection] = useState('home');

  // Existing scroll logic for Header highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'how-it-works'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <Header
        currentSection={currentSection}
        onAIToggle={() => setIsAIOpen(!isAIOpen)}
        onDashboardViewChange={setCurrentView} // Pass the combined handler
      />
      
      <main className="relative z-10">
        <HeroSection onAIToggle={() => setIsAIOpen(true)} />
        <ServiceCategories
          services={services}
          loading={loading}
          error={error}
          onAIToggle={() => setIsAIOpen(true)}
        />
        <HowItWorks onAIToggle={() => setIsAIOpen(true)} />
      </main>

      {/* Existing Floating AI Button and Banner logic */}
      {!isAIOpen && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
        >
             <motion.button
            onClick={() => setIsAIOpen(true)}
            className="relative w-16 h-16 bg-gradient-to-r from-primary-600 to-accentPrimary-500 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition-all duration-300 group"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(37, 99, 235, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 15px rgba(37, 99, 235, 0.4)",
                "0 0 25px rgba(20, 184, 166, 0.6)",
                "0 0 15px rgba(37, 99, 235, 0.4)"
              ]
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity },
              scale: { duration: 0.2 }
            }}
          >
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-2xl mb-0.5">🤖</span>
            </div>
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-textDark text-white px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              बोलकर मदद लें
            </div>
          </motion.button>
        </motion.div>
      )}

      {!isAIOpen && (
        <motion.div
          className="fixed bottom-24 right-6 z-40 bg-backgroundCard border border-gray-200 rounded-xl p-3 max-w-xs text-textDark shadow-lg" 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
        >
            <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-gradient-to-r from-primary-600 to-accentPrimary-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">🤖</span>
            </div>
            <div>
              <p className="font-medium text-textDark text-sm">Digital Saathi</p>
              <p className="text-textMuted text-xs">मदद के लिए क्लिक करें</p>
            </div>
          </div>
          <motion.div
            className="mt-2 text-xs text-primary-600"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎤 "बिजली की समस्या है" बोलकर देखें
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}


// Final App Router Component
function App() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [currentView, setCurrentView] = useState('landing'); 
  const [activeSecondaryView, setActiveSecondaryView] = useState('dashboard'); // New state for secondary tab
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Combined handler for view switching
  const handleViewChange = (view: 'landing' | 'analytics', secondaryTab = 'dashboard') => {
      setCurrentView(view);
      setActiveSecondaryView(secondaryTab);
  };
  
  // Fetch services for the Landing Page / Service Categories
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/services`);
        setServices(response.data);
        setError('');
      } catch (error) {
        console.error('Failed to fetch services:', error);
        setError('Failed to load services. Please ensure the backend is running and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-backgroundLight text-textDark font-poppins relative"> 
      <ParticleBackground />

      {currentView === 'landing' ? (
        <LandingPage 
            isAIOpen={isAIOpen}
            setIsAIOpen={setIsAIOpen}
            setCurrentView={handleViewChange} // Pass the combined handler
            services={services}
            loading={loading}
            error={error}
        />
      ) : (
        <MultiViewApp 
          onReturnToLanding={() => handleViewChange('landing')}
          initialView={activeSecondaryView} // Pass the active tab
        />
      )}
      
      <AIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </div>
  );
}

export default App;