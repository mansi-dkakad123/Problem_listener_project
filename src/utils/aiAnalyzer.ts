import { Complaint, ServiceCategory, AnalyticsData } from '../types'; // Kept AnalyticsData import
import { mockAnalytics } from '../data/mockData';

// Utility type for the trend data structure
type MonthlyTrend = AnalyticsData['monthlyTrends'][number];

// Mock AI sentiment analysis (retained)
export const analyzeSentiment = (text: string): 'positive' | 'negative' | 'neutral' => {
  const positiveWords = ['good', 'excellent', 'great', 'amazing', 'wonderful', 'fantastic', 'appreciate', 'thank', 'helpful', 'professional'];
  const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'urgent', 'emergency', 'damaged', 'broken', 'contaminated', 'sick', 'dangerous'];
  
  const lowerText = text.toLowerCase();
  const positiveScore = positiveWords.filter(word => lowerText.includes(word)).length;
  const negativeScore = negativeWords.filter(word => lowerText.includes(word)).length;
  
  if (positiveScore > negativeScore) return 'positive';
  if (negativeScore > positiveScore) return 'negative';
  return 'neutral';
};

// Mock AI complaint classification (retained)
export const classifyComplaint = (text: string): ServiceCategory => {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('power') || lowerText.includes('electricity') || lowerText.includes('outage')) return 'electricity';
  if (lowerText.includes('water') || lowerText.includes('supply') || lowerText.includes('contaminated')) return 'water';
  if (lowerText.includes('hospital') || lowerText.includes('health') || lowerText.includes('medical')) return 'healthcare';
  if (lowerText.includes('road') || lowerText.includes('pothole') || lowerText.includes('street')) return 'roads';
  if (lowerText.includes('school') || lowerText.includes('education') || lowerText.includes('teacher')) return 'education';
  if (lowerText.includes('waste') || lowerText.includes('garbage') || lowerText.includes('trash')) return 'waste-management';
  if (lowerText.includes('transport') || lowerText.includes('bus') || lowerText.includes('train')) return 'transportation';
  
  return 'other';
};

// Mock AI priority prediction (retained)
export const predictPriority = (text: string): 'low' | 'medium' | 'high' | 'urgent' => {
  const lowerText = text.toLowerCase();
  const urgentWords = ['urgent', 'emergency', 'dangerous', 'life-threatening', 'immediate'];
  const highWords = ['serious', 'major', 'significant', 'important', 'critical'];
  const mediumWords = ['moderate', 'concerning', 'needs attention'];
  
  if (urgentWords.some(word => lowerText.includes(word))) return 'urgent';
  if (highWords.some(word => lowerText.includes(word))) return 'high';
  if (mediumWords.some(word => lowerText.includes(word))) return 'medium';
  
  return 'low';
};

// NEW FUNCTION: Predictive Model based on Mock Time Series Data
export const predictNextMonthTrend = (category: 'water' | 'electricity'): { alert: string, message: string } => {
    const data = mockAnalytics.monthlyTrends;
    
    // Get the last three months of *category-specific* data
    const lastFourMonths: MonthlyTrend[] = data.slice(-4);
    
    if (lastFourMonths.length < 4) {
        return { alert: 'neutral', message: 'Insufficient historical data for reliable prediction.' };
    }

    // TS Fix: Explicitly define how to access the dynamic property
    const latest = lastFourMonths[3][category]; 
    const twoMonthsAgo = lastFourMonths[1][category];

    // Simple trend: comparing latest month to two months prior for percentage change
    const absoluteChange = latest - twoMonthsAgo;
    // Ensure division is not by zero and handle potential calculation issues
    const baseValue = twoMonthsAgo > 0 ? twoMonthsAgo : 1; 
    const percentChange = (absoluteChange / baseValue) * 100;
    
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

    if (percentChange > 15 && latest > 30) { // High absolute increase (realistic seasonal spike)
        return { 
            alert: 'critical', 
            message: `${categoryName} complaints are projected to increase by ${Math.round(percentChange)}% next month, based on a sharp rise over the last three months. Proactive resource allocation is required.` 
        };
    }
    if (percentChange > 5) { // Moderate increase
        return { 
            alert: 'warning', 
            message: `${categoryName} complaints show a steady upward trend (${Math.round(percentChange)}% predicted growth). Monitor staffing and resource levels.` 
        };
    }
    if (percentChange < -5) { // Significant decrease
        return { 
            alert: 'positive', 
            message: `${categoryName} complaints are declining (${Math.abs(Math.round(percentChange))}% predicted drop). Recent resolutions are highly effective.` 
        };
    }
    
    return { alert: 'neutral', message: `${categoryName} complaint volume is stable. Maintain current operational levels.` };
};

// Mock AI report generation (retained and updated)
export const generateSmartReport = (complaints: Complaint[]): string => {
  const totalComplaints = complaints.length;
  const mostCommonCategory = getMostCommonCategory(complaints);
  const avgSentiment = getAverageSentiment(complaints);
  const urgentCount = complaints.filter(c => c.priority === 'urgent').length;
  
  // Get realistic prediction for the top categories
  const waterPrediction = predictNextMonthTrend('water').message;
  const electricityPrediction = predictNextMonthTrend('electricity').message;

  return `
📊 AI Generated Monthly Report (Realistic Analysis)

📈 Executive Summary (Last Month):
• Total complaints received: ${totalComplaints}
• Most pressing issue (Volume): ${getCategoryDisplayName(mostCommonCategory)}
• Overall public sentiment: ${avgSentiment > 0.1 ? 'Generally Positive' : avgSentiment < -0.1 ? 'Strongly Negative' : 'Mixed/Neutral'}
• Critical cases (Urgent priority): ${urgentCount}

🔮 Predictive Insights (Next Month):
• Water Supply: ${waterPrediction}
• Electricity: ${electricityPrediction}

🔍 Detailed Analysis:
• The high volume in ${getCategoryDisplayName(mostCommonCategory)} (${mockAnalytics.categoryBreakdown[mostCommonCategory]} cases) coupled with the strong negative sentiment suggests a severe bottleneck in handling this specific service.
• **Actionable Alert**: The predictive model suggests that Water and Electricity complaints follow seasonal trends, with the steepest rise observed in the last two months leading into summer. This requires pre-emptive maintenance and increased staffing capacity in the respective control rooms.

💡 Recommendations:
1. Immediately audit the resolution process for ${getCategoryDisplayName(mostCommonCategory)} complaints.
2. Pre-stock essential maintenance supplies (e.g., transformers, pipes) in high-risk districts (e.g., Bhopal, Gwalior).
3. Launch a proactive public communication campaign about expected seasonal issues.
  `.trim();
};

const getMostCommonCategory = (complaints: Complaint[]): ServiceCategory => {
  const categoryCounts: Record<ServiceCategory, number> = {
    electricity: 0, water: 0, healthcare: 0, roads: 0, education: 0,
    'waste-management': 0, transportation: 0, other: 0
  };
  
  complaints.forEach(complaint => {
    categoryCounts[complaint.category]++;
  });
  
  return Object.entries(categoryCounts).reduce((a, b) => categoryCounts[a[0] as ServiceCategory] > categoryCounts[b[0] as ServiceCategory] ? a : b)[0] as ServiceCategory;
};

// TS Fix: Explicitly type the accumulator as 'number' to fix the TS2769 error
const getAverageSentiment = (complaints: Complaint[]): number => {
  const sentimentScores = complaints.map(c => 
    c.sentiment === 'positive' ? 1 : c.sentiment === 'negative' ? -1 : 0
  );
  // Explicitly set initial value and accumulator type to number
  return sentimentScores.reduce((a: number, b: number) => a + b, 0) / sentimentScores.length; 
};

const getCategoryDisplayName = (category: ServiceCategory): string => {
  const displayNames: Record<ServiceCategory, string> = {
    electricity: 'Electricity',
    water: 'Water Supply',
    healthcare: 'Healthcare',
    roads: 'Roads & Infrastructure',
    education: 'Education',
    'waste-management': 'Waste Management',
    transportation: 'Transportation',
    other: 'Other Services'
  };
  return displayNames[category];
};