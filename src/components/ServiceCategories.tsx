import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import {
  AlertCircle,
  FileText,
  Lightbulb,
  Droplet,
  Leaf,
  GraduationCap,
  Heart, // Added to cover medical help
  Headset, // Added to cover technical support or emergency help
} from "lucide-react";

// Service type
interface Service {
  _id?: string;
  name: string;
  description: string;
}

interface ServiceCategoriesProps {
  onAIToggle: () => void;
  services: Service[];
  loading: boolean;
  error: string;
}

const ServiceCategories: React.FC<ServiceCategoriesProps> = ({
  onAIToggle,
  services,
  loading,
  error,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getIcon = (serviceName: string) => {
    switch (serviceName.toLowerCase()) {
      case "government forms":
        return <FileText className="w-8 h-8 text-white" />;
      case "electricity issue":
        return <Lightbulb className="w-8 h-8 text-white" />;
      case "water problem":
        return <Droplet className="w-8 h-8 text-white" />;
      case "medical help":
        return <Heart className="w-8 h-8 text-white" />;
      case "farming support":
        return <Leaf className="w-8 h-8 text-white" />;
      case "education help":
        return <GraduationCap className="w-8 h-8 text-white" />;
      case "technical support":
      case "emergency help":
        return <Headset className="w-8 h-8 text-white" />;
      default:
        return <AlertCircle className="w-8 h-8 text-white" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (loading) {
    return (
      <section id="services" className="py-20 px-4 text-center min-h-[400px] flex items-center justify-center">
        <div className="container mx-auto">
          <motion.p
            className="text-xl text-primary-600"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading services...
          </motion.p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 px-4 text-textDark">
      <div className="container mx-auto">
        {/* Title */}
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
              हमारी सेवाएं
            </span>
          </h2>
          <p className="text-xl text-textMuted max-w-3xl mx-auto">
            Choose any service and let our AI assistant guide you through the
            process with simple voice commands
          </p>
        </motion.div>

        {/* Error */}
        {error && (
          <div className="text-center text-red-600 my-8 text-lg font-medium border border-red-600/30 p-4 rounded-xl bg-red-50/50">
            ⚠️ Connection Error: {error}
            <p className="mt-2 text-sm text-textMuted">
                Please make sure your backend server is running on {import.meta.env.VITE_API_URL || "http://localhost:5000"} and accepting requests.
            </p>
          </div>
        )}

        {/* Services Grid: ADDED Array.isArray CHECK in App.tsx (already handled) */}
        {Array.isArray(services) && services.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {services.map((service, index) => (
              <motion.div
                key={service._id || index}
                variants={itemVariants}
                onClick={onAIToggle}
                // Light card look
                className="group relative bg-backgroundCard border border-gray-200 rounded-xl p-6 hover:scale-[1.03] transition-all duration-300 cursor-pointer overflow-hidden shadow-md"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Hover background: Subtle blue wash */}
                <div className="absolute inset-0 bg-primary-600/10 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center mb-4">
                    {/* Icon Gradient: Primary Blue to Accent Teal */}
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-accentPrimary-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-300">
                      {getIcon(service.name)}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-textDark mb-2 group-hover:text-textDark transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-textMuted group-hover:text-textDark transition-colors">
                    {service.description}
                  </p>
                </div>

                {/* Glow dot: Subtle Blue pulse */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center text-textMuted">
            {/* Display message if services array is empty or API failed gracefully */}
            {!loading && !error && "No services available. Please check the backend's database seed."}
          </div>
        )}

        {/* Voice Assistant Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            onClick={onAIToggle}
            // Primary Action Button: Blue to Teal
            className="bg-gradient-to-r from-primary-600 to-accentPrimary-500 hover:from-primary-700 hover:to-accentPrimary-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl flex items-center space-x-3 mx-auto transition-all duration-300 text-white"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(37, 99, 235, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>🎤</span>
            <span>Start Voice Assistant</span>
            <FileText className="w-5 h-5" />
          </motion.button>
          <p className="text-textMuted mt-4 text-sm">
            Click on any service above or use voice commands to get started
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCategories;