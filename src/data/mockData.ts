import { Complaint, AnalyticsData, District, ServiceCategory } from '../types';

// Mock complaint data (retained previous India-centric examples)
export const mockComplaints: Complaint[] = [
  {
    id: '1',
    title: 'Frequent Power Outages in Sector 15',
    description: 'We are experiencing daily power cuts for 4-6 hours. This is affecting our work and daily life significantly. Please look into this urgent matter.',
    category: 'electricity',
    location: {
      district: 'Bhopal',
      coordinates: [23.2599, 77.4126] // Bhopal, India
    },
    timestamp: new Date('2024-01-15'),
    sentiment: 'negative',
    priority: 'high',
    status: 'in-progress',
    userId: 'user1',
    userName: 'Rajesh Sharma'
  },
  {
    id: '2',
    title: 'Water Quality Issues in North Nazimabad',
    description: 'The water supply has been contaminated for the past week. Many residents are falling sick. We need immediate action.',
    category: 'water',
    location: {
      district: 'Indore',
      coordinates: [22.7196, 75.8577] // Indore, India
    },
    timestamp: new Date('2024-01-14'),
    sentiment: 'negative',
    priority: 'urgent',
    status: 'pending',
    userId: 'user2',
    userName: 'Priya Verma'
  },
  {
    id: '3',
    title: 'Excellent Healthcare Service at DHQ Hospital',
    description: 'I want to appreciate the excellent service provided by the medical staff at DHQ Hospital. They were very professional and caring.',
    category: 'healthcare',
    location: {
      district: 'Gwalior',
      coordinates: [26.2183, 78.1828] // Gwalior, India
    },
    timestamp: new Date('2024-01-13'),
    sentiment: 'positive',
    priority: 'low',
    status: 'resolved',
    userId: 'user3',
    userName: 'Sunil Kumar'
  },
  {
    id: '4',
    title: 'Damaged Roads Need Urgent Repair',
    description: 'The main road in our area has large potholes that are causing accidents. Several vehicles have been damaged already.',
    category: 'roads',
    location: {
      district: 'Jabalpur',
      coordinates: [23.1815, 79.9864] // Jabalpur, India
    },
    timestamp: new Date('2024-01-12'),
    sentiment: 'negative',
    priority: 'high',
    status: 'pending',
    userId: 'user4',
    userName: 'Kiran Devi'
  },
  {
    id: '5',
    title: 'School Infrastructure Improvements Needed',
    description: 'Our local school needs better facilities including proper desks, clean washrooms, and library resources for students.',
    category: 'education',
    location: {
      district: 'Indore',
      coordinates: [22.7196, 75.8577] // Indore, India
    },
    timestamp: new Date('2024-01-11'),
    sentiment: 'neutral',
    priority: 'medium',
    status: 'in-progress',
    userId: 'user5',
    userName: 'Mohammad Tariq'
  }
];

// Mock analytics data
export const mockAnalytics: AnalyticsData = {
  totalComplaints: 1550, // Increased total complaints
  resolvedComplaints: 1100,
  pendingComplaints: 450,
  sentimentBreakdown: {
    positive: 200,
    negative: 950, // Higher negative sentiment for realism
    neutral: 400
  },
  categoryBreakdown: {
    electricity: 450, // High
    water: 350, // High
    healthcare: 180,
    roads: 250,
    education: 150,
    'waste-management': 80,
    transportation: 60,
    other: 30
  },
  priorityBreakdown: {
    low: 250,
    medium: 500,
    high: 450,
    urgent: 350 // High urgent cases
  },
  // Realistic Monthly Trends: Showing a spike in complaints leading into peak heat (May-Jul)
  monthlyTrends: [
    { month: 'Oct', complaints: 120, resolved: 90, water: 25, electricity: 30 },
    { month: 'Nov', complaints: 110, resolved: 85, water: 20, electricity: 25 },
    { month: 'Dec', complaints: 100, resolved: 75, water: 18, electricity: 20 },
    { month: 'Jan', complaints: 130, resolved: 105, water: 22, electricity: 35 },
    { month: 'Feb', complaints: 145, resolved: 110, water: 28, electricity: 40 },
    { month: 'Mar', complaints: 160, resolved: 120, water: 35, electricity: 45 },
    { month: 'Apr', complaints: 180, resolved: 130, water: 45, electricity: 55 },
    { month: 'May', complaints: 220, resolved: 150, water: 60, electricity: 70 }, // Peak heat spike
    { month: 'Jun', complaints: 200, resolved: 140, water: 55, electricity: 65 },
    // FUTURE MONTHS (for prediction - these are effectively 'mock current' data for analysis)
    { month: 'Jul', complaints: 190, resolved: 145, water: 50, electricity: 60 },
    { month: 'Aug', complaints: 180, resolved: 150, water: 45, electricity: 55 },
    { month: 'Sep', complaints: 170, resolved: 140, water: 40, electricity: 50 }
  ]
};

// Mock district data (India/MP focus)
export const mockDistricts: District[] = [
  { name: 'Bhopal', coordinates: [23.2599, 77.4126], complaints: 420, avgSentiment: -0.45 },
  { name: 'Indore', coordinates: [22.7196, 75.8577], complaints: 380, avgSentiment: -0.35 },
  { name: 'Gwalior', coordinates: [26.2183, 78.1828], complaints: 250, avgSentiment: -0.55 }, // Gwalior has worse sentiment
  { name: 'Jabalpur', coordinates: [23.1815, 79.9864], complaints: 190, avgSentiment: 0.15 },
  { name: 'Ujjain', coordinates: [23.1765, 75.7885], complaints: 150, avgSentiment: 0.05 },
  { name: 'Rewa', coordinates: [24.5385, 81.2985], complaints: 90, avgSentiment: 0.25 },
  { name: 'Sagar', coordinates: [23.8385, 78.7378], complaints: 70, avgSentiment: -0.15 }
];

export const categoryColors: Record<ServiceCategory, string> = {
  electricity: '#ef4444',
  water: '#3b82f6',
  healthcare: '#22c55e',
  roads: '#f59e0b',
  education: '#8b5cf6',
  'waste-management': '#06b6d4',
  transportation: '#f97316',
  other: '#6b7280'
};

export const priorityColors = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#f97316',
  urgent: '#ef4444'
};