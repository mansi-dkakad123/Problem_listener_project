// backend/seed.js

import mongoose from 'mongoose'; 
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Service from './models/Service.js'; 

// --- Setup File Paths for ESM ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --- End Setup ---

// Load .env file from the project root folder (../)
const envPath = path.resolve(__dirname, '..', '.env');
const envConfig = dotenv.config({ path: envPath });

if (envConfig.error) {
    console.error(`❌ ERROR: Could not load .env file at ${envPath}`);
    // Do NOT exit here, to allow for environment variables set elsewhere
}

const services = [
  {
    name: "Government Forms",
    description: "Fill forms with voice guidance",
    // NLP Improvement: Added the exact button text (including emoji) to keywords for perfect matching.
    keywords: ["form", "forms", "सरकारी फॉर्म", "फॉर्म भरना", "योजना", "ragistration", "apply", "आवेदन", "🏛️ सरकारी फॉर्म भरना है"],
    response: "फॉर्म भरने में मैं expert हूं! **कृपया बताएं कौन सा फॉर्म आपको भरना है?** (उदाहरण: सरकारी योजना का फॉर्म, बैंक का फॉर्म, राशन कार्ड, आधार कार्ड या पासपोर्ट)।"
  },
  {
    name: "Electricity Issue",
    description: "Register & track complaints",
    // NLP Improvement: Added diverse keywords
    keywords: ["electricity", "light", "बिजली", "बिजली की शिकायत", "पावर कट", "meter problem", "new connection"],
    response: "बिजली की समस्या के लिए मैं आपकी पूरी मदद करूंगा। **कृपया बताएं कि कौन सी समस्या है:** नया बिजली कनेक्शन चाहिए, बिजली बिल की समस्या है, या बिजली नहीं आ रही?"
  },
  {
    name: "Water Problem",
    description: "Lodge water-related issues",
    // NLP Improvement: Added diverse keywords
    keywords: ["water", "पानी", "पानी की समस्या", "nal", "tanker", "leak", "रिसाव"],
    response: "पानी की समस्या के लिए मैं यहाँ हूं। **बताइए:** नया पानी कनेक्शन चाहिए, पानी नहीं आ रहा, या पाइप लीक हो रहा है? फिर मैं आपकी शिकायत दर्ज करने में मदद करूंगा。"
  },
  {
    name: "Medical Help",
    description: "Find hospitals & health services",
    // NLP Improvement: Added diverse keywords, links to geospatial tool
    keywords: ["medical", "doctor", "अस्पताल", "दवाई", "डॉक्टर", "clinic", "health"],
    response: "स्वास्थ्य सेवा के लिए मैं तुरंत मदद करूंगा। बताइए: नजदीकी अस्पताल, दवाई की दुकान, या डॉक्टर की appointment? **आप 'नजदीकी अस्पताल कहाँ है?' कहकर Geospatial Tool का उपयोग कर सकते हैं।**"
  },
  {
    name: "Farming Support",
    description: "Agriculture guidance & schemes",
    // NLP Improvement: Added diverse keywords, links to agriculture tool
    keywords: ["farming", "किसान", "खेती", "फसल", "बीमा", "मंडी", "मौसम", "agriculture"],
    response: "किसान भाई, खेती-बाड़ी की हर समस्या का समाधान यहाँ है: बीज और खाद की जानकारी, सरकारी योजनाएं, फसल बीमा, मंडी के भाव, या मौसम की जानकारी। **आप 'गेहूं का मंडी भाव क्या है?' कहकर Agriculture Tool का उपयोग कर सकते हैं।**"
  },
  {
    name: "Education Help",
    description: "Course info & form assistance",
    // NLP Improvement: Added diverse keywords
    keywords: ["education", "पढ़ाई", "स्कूल", "college", "scholarship", "छात्रवृत्ति", "admisssion"],
    response: "पढ़ाई और शिक्षा संबंधित सहायता के लिए मैं यहाँ हूं। बताइए: **किस कोर्स के बारे में जानकारी चाहिए, एडमिशन फॉर्म भरना है, या छात्रवृत्ति योजनाएं?**"
  },
  {
    name: "Technical Support",
    description: "Phone, app & website help",
    // NLP Improvement: Added diverse keywords
    keywords: ["technical", "support", "तकनीकी", "app", "website", "phone", "website", "server"],
    response: "मैं तकनीकी सहायता के लिए तैयार हूं। **बताइए, क्या समस्या है?** फोन, ऐप, या वेबसाइट से संबंधित?"
  },
  {
    name: "Emergency Help",
    description: "Urgent assistance & contacts",
    // NLP Improvement: Added diverse keywords, links to geospatial tool
    keywords: ["emergency", "help", "आपातकालीन", "मदद", "police", "fire", "ambulance"],
    response: "आपातकालीन मदद के लिए मैं यहाँ हूँ। मैं आपके लिए नजदीकी पुलिस स्टेशन या अस्पताल का पता और फोन नंबर ढूंढ सकता हूँ। **आप 'नजदीकी पुलिस स्टेशन कहाँ है?' कहकर Geospatial Tool का उपयोग कर सकते हैं।**"
  }
];

const seedDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  // CRITICAL CHECK: Ensure the URI is loaded
  if (!MONGO_URI) {
    console.error('\n❌ FATAL ERROR: MONGO_URI is missing!');
    console.error('   Please ensure you have a file named ".env" in your project root (one level above the "backend" folder) with the correct "MONGO_URI=..." setting.');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected for seeding.');

    await Service.deleteMany({});
    console.log('Existing services deleted.');

    await Service.insertMany(services);
    console.log('Dummy data inserted successfully.');

    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding the database:', err);
    mongoose.connection.close(); // Ensure connection is closed on error
    process.exit(1); 
  }
};

seedDB();