// backend/ai/tools/agriculture-service.js
// axios import removed

/**
 * किसानों के लिए मौसम, मंडी भाव या फसल बीमा डेटा प्राप्त करने का टूल।
 * @param {{queryType: 'weather' | 'mandi' | 'insurance', location: string, cropName: string}} args
 */
async function getAgricultureData(args) {
  const { queryType, location, cropName } = args;

  if (queryType === 'mandi' && cropName) {
    // Mandi Prices - Using Mock Data based on general government information
    const mockMandiData = { 
      'गेहूं': '₹2400-₹2550/क्विंटल', 
      'प्याज': '₹25-₹40/किलो',
      'चना': '₹5000-₹5300/क्विंटल',
      'धान': '₹2200-₹2400/क्विंटल'
    };
    const price = mockMandiData[cropName.toLowerCase()] || 'जानकारी उपलब्ध नहीं';
    
    return { 
      success: true, 
      message: `${cropName} का अनुमानित भाव ${location || 'स्थानीय बाज़ार'} में लगभग ${price} है। नवीनतम और आधिकारिक मंडी भाव के लिए AGMARKNET पोर्टल (https://agmarknet.gov.in) देखें।` 
    };
  }

  if (queryType === 'weather' && location) {
    // Weather - Using Mock Data and IMD reference URL
    const mockWeather = { 
        'दिल्ली': "आज आंशिक रूप से बादल छाए हुए हैं, तापमान 28°C है, और हवा की गति कम है।",
        'मुंबई': "गरज के साथ हल्की बारिश की संभावना है। तापमान 26°C है।",
        'सामान्य': "आंशिक रूप से बादल छाए हुए हैं, तापमान 28°C है, और अगले 24 घंटों में हल्की बारिश की संभावना है।"
    };
    const weatherInfo = mockWeather[location.toLowerCase()] || mockWeather['सामान्य'];
    
    return { 
        success: true, 
        message: `${location} में मौसम: ${weatherInfo}. भारतीय मौसम विभाग (IMD) की आधिकारिक वेबसाइट पर अधिक जानकारी प्राप्त करें।`
    };
  }
  
  if (queryType === 'insurance') {
      // Crop Insurance - Using Static Scheme Information and Government URL
      const schemeInfo = `प्रधानमंत्री फसल बीमा योजना (PMFBY) का उद्देश्य फसल के नुकसान पर किसानों को वित्तीय सहायता प्रदान करना है। पात्रता और आवेदन के लिए आधिकारिक PMFBY पोर्टल (https://pmfby.gov.in) देखें।`;
      return { success: true, message: schemeInfo };
  }

  return { success: false, message: "अमान्य क्वेरी प्रकार या आवश्यक पैरामीटर गुम हैं।" };
}

const getAgricultureDataToolDefinition = {
  name: "getAgricultureData",
  description: "Fetches information related to farming, such as estimated market (mandi) prices, weather conditions, or crop insurance scheme details, using local data and public portal references.",
  parameters: {
    type: "object",
    properties: {
      queryType: {
        type: "string",
        description: "The type of data requested: 'weather' for temperature, 'mandi' for crop prices, or 'insurance' for scheme details.",
        enum: ["weather", "mandi", "insurance"],
      },
      location: {
        type: "string",
        description: "The city/area/state name relevant to the query.",
      },
      cropName: {
        type: "string",
        description: "The name of the crop for which the user is seeking mandi price (e.g., 'गेहूं' or 'onion').",
      }
    },
    required: ["queryType"],
  },
};

export { getAgricultureData, getAgricultureDataToolDefinition };