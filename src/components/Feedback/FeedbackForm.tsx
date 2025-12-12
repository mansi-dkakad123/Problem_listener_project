import React, { useState } from 'react';
import { Send, Brain, MapPin, AlertCircle } from 'lucide-react';
import { analyzeSentiment, classifyComplaint, predictPriority } from '../../utils/aiAnalyzer';
import { ServiceCategory } from '../../types';

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '' as ServiceCategory | '',
    district: '',
    userName: ''
  });

  const [aiAnalysis, setAiAnalysis] = useState<{
    sentiment: string;
    category: ServiceCategory;
    priority: string;
  } | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const districts = [
    'Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal',
    'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior',
    'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur',
    'Morena', 'Narsinghpur', 'Neemuch', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna',
    'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh',
    'Ujjain', 'Umaria', 'Vidisha'
  ];

  const categories: { value: ServiceCategory; label: string }[] = [
    { value: 'electricity', label: 'Electricity' },
    { value: 'water', label: 'Water Supply' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'roads', label: 'Roads & Infrastructure' },
    { value: 'education', label: 'Education' },
    { value: 'waste-management', label: 'Waste Management' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'other', label: 'Other' }
  ];

  const handleDescriptionChange = (description: string) => {
    setFormData({ ...formData, description });

    if (description.length > 10) {
      const sentiment = analyzeSentiment(description);
      const category = classifyComplaint(description);
      const priority = predictPriority(description);

      setAiAnalysis({ sentiment, category, priority });

      if (!formData.category) {
        setFormData(prev => ({ ...prev, category }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        title: '',
        description: '',
        category: '',
        district: '',
        userName: ''
      });
      setAiAnalysis(null);
    }, 2000);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-success-600 bg-success-50';
      case 'negative': return 'text-danger-600 bg-danger-50';
      default: return 'text-warning-600 bg-warning-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-danger-600 bg-danger-50';
      case 'high': return 'text-warning-600 bg-warning-50';
      case 'medium': return 'text-primary-600 bg-primary-50';
      default: return 'text-success-600 bg-success-50';
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-900">Processing your feedback with AI...</p>
          <p className="text-gray-600">Analyzing sentiment and categorizing complaint</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Submit Public Service Feedback</h2>
        <p className="text-gray-600">Your feedback is analyzed by AI for better understanding and faster resolution</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Issue Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Describe your feedback or complaint in detail..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as ServiceCategory })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Send className="h-5 w-5" />
              <span>Submit Feedback</span>
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-5 w-5 text-primary-600" />
              <h3 className="font-semibold text-gray-900">AI Analysis</h3>
            </div>

            {aiAnalysis ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Detected Sentiment</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(aiAnalysis.sentiment)}`}>
                    {aiAnalysis.sentiment.charAt(0).toUpperCase() + aiAnalysis.sentiment.slice(1)}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Suggested Category</p>
                  <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-medium">
                    {categories.find(c => c.value === aiAnalysis.category)?.label}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Predicted Priority</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(aiAnalysis.priority)}`}>
                    {aiAnalysis.priority.charAt(0).toUpperCase() + aiAnalysis.priority.slice(1)}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Start typing your description to see AI analysis...</p>
            )}
          </div>

          <div className="bg-primary-50 p-6 rounded-xl border border-primary-200">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="h-5 w-5 text-primary-600" />
              <h3 className="font-semibold text-primary-900">How AI Helps</h3>
            </div>
            <ul className="text-sm text-primary-800 space-y-2">
              <li>• Automatically detects sentiment in your feedback</li>
              <li>• Suggests the most appropriate category</li>
              <li>• Predicts priority level for faster processing</li>
              <li>• Ensures your complaint reaches the right department</li>
            </ul>
          </div>

          <div className="bg-success-50 p-6 rounded-xl border border-success-200">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-5 w-5 text-success-600" />
              <h3 className="font-semibold text-success-900">Your Privacy</h3>
            </div>
            <p className="text-sm text-success-800">
              All feedback is processed securely. Your personal information is protected and only used for service improvement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;