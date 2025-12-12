import React, { useState } from 'react';
import { FileText, Download, Calendar, Brain, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { generateSmartReport } from '../../utils/aiAnalyzer';
import { mockComplaints, mockAnalytics } from '../../data/mockData';

const AIReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string>('monthly');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string>('');

  const reportTypes = [
    { id: 'monthly', label: 'Monthly Summary', icon: Calendar },
    { id: 'sentiment', label: 'Sentiment Analysis', icon: TrendingUp },
    { id: 'category', label: 'Category Breakdown', icon: FileText },
    { id: 'priority', label: 'Priority Analysis', icon: AlertCircle }
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const report = generateSmartReport(mockComplaints);
    setGeneratedReport(report);
    setIsGenerating(false);
  };

  const handleDownloadReport = () => {
    const blob = new Blob([generatedReport], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-report-${selectedReport}-${format(new Date(), 'yyyy-MM-dd')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI-Generated Reports</h2>
        <p className="text-gray-600">Intelligent insights and comprehensive analysis powered by advanced AI</p>
      </div>

      {/* Report Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {reportTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setSelectedReport(type.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedReport === type.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-25'
              }`}
            >
              <Icon className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm font-medium">{type.label}</p>
            </button>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reports Generated</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <FileText className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI Accuracy Rate</p>
              <p className="text-2xl font-bold text-gray-900">94.8%</p>
            </div>
            <Brain className="h-8 w-8 text-success-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Processing Time</p>
              <p className="text-2xl font-bold text-gray-900">2.3s</p>
            </div>
            <Clock className="h-8 w-8 text-warning-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Insights Generated</p>
              <p className="text-2xl font-bold text-gray-900">47</p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary-600" />
          </div>
        </div>
      </div>

      {/* Report Generation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Generate AI Report</h3>
              <p className="text-sm text-gray-600">Create comprehensive analysis reports using artificial intelligence</p>
            </div>
            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Brain className="h-5 w-5" />
              <span>{isGenerating ? 'Generating...' : 'Generate Report'}</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {isGenerating ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-lg font-medium text-gray-900">AI is analyzing data...</p>
              <p className="text-gray-600">Processing complaints, categorizing sentiments, and generating insights</p>
            </div>
          ) : generatedReport ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Generated Report</h4>
                <button
                  onClick={handleDownloadReport}
                  className="bg-success-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-success-700 transition-colors flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">{generatedReport}</pre>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900">Ready to Generate Report</p>
              <p className="text-gray-600">Click the "Generate Report" button to create an AI-powered analysis</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { title: 'Monthly Analysis - January 2024', date: '2024-01-31', type: 'Monthly', status: 'completed' },
            { title: 'Sentiment Breakdown - Q4 2023', date: '2024-01-15', type: 'Sentiment', status: 'completed' },
            { title: 'Category Performance Report', date: '2024-01-10', type: 'Category', status: 'completed' },
            { title: 'Priority Analysis - December', date: '2024-01-05', type: 'Priority', status: 'completed' }
          ].map((report, index) => (
            <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{report.title}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">{format(new Date(report.date), 'MMM d, yyyy')}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-primary-600">{report.type}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="flex items-center text-sm text-success-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Completed
                  </span>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Capabilities */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 rounded-xl text-white">
        <h3 className="text-2xl font-bold mb-6">AI Report Capabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 p-6 rounded-lg">
            <Brain className="h-8 w-8 mb-4" />
            <h4 className="font-semibold mb-2">Smart Analysis</h4>
            <p className="text-sm opacity-90">Advanced NLP algorithms analyze text patterns, sentiment, and extract meaningful insights from thousands of complaints.</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <TrendingUp className="h-8 w-8 mb-4" />
            <h4 className="font-semibold mb-2">Predictive Insights</h4>
            <p className="text-sm opacity-90">AI predicts future trends, identifies potential issues before they escalate, and suggests proactive measures.</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <FileText className="h-8 w-8 mb-4" />
            <h4 className="font-semibold mb-2">Automated Reporting</h4>
            <p className="text-sm opacity-90">Generate comprehensive reports in seconds, with executive summaries, detailed analysis, and actionable recommendations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIReports;