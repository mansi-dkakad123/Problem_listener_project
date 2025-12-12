export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  location: {
    district: string;
    coordinates: [number, number];
  };
  timestamp: Date;
  sentiment: 'positive' | 'negative' | 'neutral';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  userId: string;
  userName: string;
}

export type ServiceCategory = 
  | 'electricity'
  | 'water'
  | 'healthcare'
  | 'roads'
  | 'education'
  | 'waste-management'
  | 'transportation'
  | 'other';

export interface AnalyticsData {
  totalComplaints: number;
  resolvedComplaints: number;
  pendingComplaints: number;
  sentimentBreakdown: {
    positive: number;
    negative: number;
    neutral: number;
  };
  categoryBreakdown: Record<ServiceCategory, number>;
  priorityBreakdown: {
    low: number;
    medium: number;
    high: number;
    urgent: number;
  };
  monthlyTrends: Array<{
    month: string;
    complaints: number;
    resolved: number;
    // FIX: Added 'water' and 'electricity' for predictive analysis data structure
    water: number; 
    electricity: number; 
  }>;
}

export interface District {
  name: string;
  coordinates: [number, number];
  complaints: number;
  avgSentiment: number;
}