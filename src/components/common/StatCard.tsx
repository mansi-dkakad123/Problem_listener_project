import React from 'react';
import { DivideIcon } from 'lucide-react'; // Changed import to use a concrete name/type

interface StatCardProps {
  title: string;
  value: string | number;
  // TS Fix: Use React.ElementType (or typeof Icon if all icons were the same component)
  icon: React.ElementType; 
  color: 'primary' | 'success' | 'warning' | 'danger';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  const colorClasses = {
    primary: 'bg-primary-500 text-white',
    success: 'bg-success-500 text-white',
    warning: 'bg-warning-500 text-white',
    danger: 'bg-danger-500 text-white',
  };

  const bgColorClasses = {
    primary: 'bg-primary-50 border-primary-200',
    success: 'bg-success-50 border-success-200',
    warning: 'bg-warning-50 border-warning-200',
    danger: 'bg-danger-50 border-danger-200',
  };

  return (
    <div className={`${bgColorClasses[color]} border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${trend.isPositive ? 'text-success-600' : 'text-danger-600'}`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`${colorClasses[color]} p-3 rounded-lg`}>
          {/* Icon must be capitalized as a component */}
          <Icon className="h-6 w-6" /> 
        </div>
      </div>
    </div>
  );
};

export default StatCard;