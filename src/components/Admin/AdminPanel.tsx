import React, { useState } from 'react';
import { Settings, Users, BarChart3, Bell, Shield, Database, Zap, Eye } from 'lucide-react';
import { mockComplaints } from '../../data/mockData'; // FIX: Removed unused 'mockAnalytics' import
import { Complaint } from '../../types';
import { format } from 'date-fns';

const AdminPanel: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [complaints] = useState<Complaint[]>(mockComplaints);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'complaints', label: 'Manage Complaints', icon: Eye },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'settings', label: 'AI Settings', icon: Settings },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-success-100 text-success-800';
      case 'in-progress': return 'bg-primary-100 text-primary-800';
      case 'pending': return 'bg-warning-100 text-warning-800';
      case 'rejected': return 'bg-danger-100 text-danger-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-danger-100 text-danger-800';
      case 'high': return 'bg-warning-100 text-warning-800';
      case 'medium': return 'bg-primary-100 text-primary-800';
      case 'low': return 'bg-success-100 text-success-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Status</p>
              <p className="text-lg font-bold text-success-600">Operational</p>
            </div>
            <Shield className="h-8 w-8 text-success-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI Performance</p>
              <p className="text-lg font-bold text-primary-600">94.8%</p>
            </div>
            <Zap className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Database Health</p>
              <p className="text-lg font-bold text-success-600">Excellent</p>
            </div>
            <Database className="h-8 w-8 text-success-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-lg font-bold text-gray-900">2,847</p>
            </div>
            <Users className="h-8 w-8 text-primary-600" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent System Activity</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { action: 'AI Model Updated', time: '2 hours ago', type: 'system' },
            { action: 'New Complaint Processed', time: '3 hours ago', type: 'complaint' },
            { action: 'Monthly Report Generated', time: '5 hours ago', type: 'report' },
            { action: 'User Registration Spike', time: '1 day ago', type: 'user' },
          ].map((activity, index) => (
            <div key={index} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'system' ? 'bg-primary-500' :
                    activity.type === 'complaint' ? 'bg-warning-500' :
                    activity.type === 'report' ? 'bg-success-500' : 'bg-gray-500'
                  }`}></div>
                  <span className="font-medium text-gray-900">{activity.action}</span>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderComplaints = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Complaint Management</h3>
          <div className="flex items-center space-x-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All Priority</option>
              <option>Urgent</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaint</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {complaints.map((complaint) => (
              <tr key={complaint.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{complaint.title}</p>
                    <p className="text-sm text-gray-500 truncate max-w-xs">{complaint.description}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{complaint.userName}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                    {complaint.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(complaint.priority)}`}>
                    {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(complaint.status)}`}>
                    {complaint.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {format(complaint.timestamp, 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4">
                  <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">2,847</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success-600">1,923</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning-600">156</div>
            <div className="text-sm text-gray-600">New This Month</div>
          </div>
        </div>
        
        <div className="text-center text-gray-500">
          <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>Detailed user management interface would be implemented here</p>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">AI Model Configuration</h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sentiment Analysis Threshold</label>
            <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" className="w-full" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Conservative</span>
              <span>Balanced</span>
              <span>Aggressive</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Auto-categorization Confidence</label>
            <input type="range" min="0" max="1" step="0.05" defaultValue="0.8" className="w-full" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Enable Real-time Processing</label>
              <p className="text-xs text-gray-500">Process complaints as they arrive</p>
            </div>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
        </div>
        <div className="p-6 space-y-4">
          {[
            { label: 'Urgent complaints detected', enabled: true },
            { label: 'Daily AI report ready', enabled: true },
            { label: 'System performance alerts', enabled: false },
            { label: 'Weekly trend analysis', enabled: true },
          ].map((setting, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-700">{setting.label}</span>
              </div>
              <input type="checkbox" defaultChecked={setting.enabled} className="rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Control Panel</h2>
        <p className="text-gray-600">Manage system settings, monitor performance, and configure AI parameters</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'complaints' && renderComplaints()}
        {selectedTab === 'users' && renderUsers()}
        {selectedTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

export default AdminPanel;