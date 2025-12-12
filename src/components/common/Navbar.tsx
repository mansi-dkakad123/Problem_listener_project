import React from 'react';
import { BarChart3, Brain, Map, MessageSquare, FileText, Settings } from 'lucide-react';

interface NavbarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'feedback', label: 'Submit Feedback', icon: MessageSquare },
    { id: 'map', label: 'Geo Analysis', icon: Map },
    { id: 'reports', label: 'AI Reports', icon: FileText },
    { id: 'admin', label: 'Admin Panel', icon: Settings },
  ];

  return (
    // MODIFIED: Changed bg-primary-50 to bg-primary-200 for a noticeable light blue background
    <nav className="sticky top-0 z-30 bg-primary-200 shadow-lg border-b border-primary-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Public Service Analyzer</h1>
                <p className="text-xs text-gray-500">Powered by Advanced AI</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeView === item.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-primary-800 hover:bg-primary-300' // Adjusted hover for contrast against new base
                    }
                  `}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;