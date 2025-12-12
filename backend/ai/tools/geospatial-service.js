// backend/ai/tools/geospatial-service.js
// Mock geospatial service using corrected relative path

/**
 * Mock function to simulate a call to a Geospatial API like Google Maps.
 * @param {{location: string, serviceType: 'hospital' | 'police' | 'office'}} args
 */
async function getNearbyService(args) {
  const { location, serviceType } = args;

  // Mock data simulation - real app would use Google Maps/Government API
  const mockResponses = {
    hospital: {
      success: true,
      data: [
        { name: "Government Civil Hospital", distance: "3 km", contact: "07541-234567" },
        { name: "Private Balaji Clinic", distance: "1.5 km", contact: "9876543210" }
      ]
    },
    police: {
      success: true,
      data: [
        { name: "Police Station - City Center", distance: "5 km", contact: "100 (Emergency)" }
      ]
    },
    office: {
      success: true,
      data: [
        { name: "Local Government Office", distance: "7 km", contact: "07541-800000" }
      ]
    }
  };

  const response = mockResponses[serviceType] || { success: false, data: [] };

  if (response.success) {
    const serviceMap = {
        hospital: 'अस्पताल',
        police: 'पुलिस स्टेशन',
        office: 'सरकारी कार्यालय'
    };
    const serviceName = serviceMap[serviceType] || serviceType;
    
    // --- UPDATED: Check for "Current Location" placeholder or explicit location ---
    let locationText = 'आपके सामान्य क्षेत्र';
    if (location && location.trim().toLowerCase().includes('current location')) {
        // When AI gets coordinates, it uses "Current Location"
        locationText = 'आपके वर्तमान डिवाइस स्थान'; 
    } else if (location && location.trim()) {
        locationText = location;
    }
    // --------------------------------------------------------------------------
    
    const serviceList = response.data.map(
      (s, index) => `${index + 1}. ${s.name} (${s.distance} दूर, संपर्क: ${s.contact})`
    ).join('; ');
    
    return {
      success: true,
      // --- UPDATED MESSAGE ---
      message: `${locationText} के लिए ${serviceName} के परिणाम: ${serviceList}.`,
      // -----------------------
    };
  }

  return {
    success: false,
    message: `माफ़ करना, हमें इस क्षेत्र में कोई नजदीकी सेवा नहीं मिल सकी।`,
  };
}


const getNearbyServiceToolDefinition = {
  name: "getNearbyService",
  description: "Finds nearby hospitals, police stations, or government offices for the user using mock geospatial data.",
  parameters: {
    type: "object",
    properties: {
      location: {
        type: "string",
        description: "The location provided by the user (or a placeholder like 'current location' if not specified).",
        // Added 'Current Location' to enum for clarity, though model uses it as free text
        enum: ["hospital", "police", "office", "Current Location"], 
      },
      serviceType: {
        type: "string",
        description: "The type of service the user is looking for. Must be one of: 'hospital', 'police', or 'office'.",
        enum: ["hospital", "police", "office"],
      },
    },
    required: ["serviceType"],
  },
};

export { getNearbyService, getNearbyServiceToolDefinition };