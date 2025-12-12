// backend/ai/tools/complain-service.js
import Service from '../../models/Service.js'; 
// axios import removed

/**
 * @param {{serviceName: string, problemDescription: string}} args
 */
async function complainService(args) {
  const { serviceName, problemDescription } = args;

  if (!serviceName || !problemDescription) {
    return {
      success: false,
      message: 'शिकायत दर्ज करने के लिए सेवा का नाम और समस्या का विवरण दोनों आवश्यक हैं।',
    };
  }

  // Fallback/Local Save to MongoDB (Primary Action)
  try {
      const newService = await Service.create({
          name: `Complaint: ${serviceName}`, 
          description: `User complained about: ${problemDescription}`,
          keywords: ["complaint", "filed", serviceName.toLowerCase()], 
          response: `Complaint regarding ${serviceName} received and logged.`
      });

      return {
          success: true,
          message: `आपकी शिकायत **स्थानीय रूप से दर्ज** कर ली गई है। संदर्भ ID है: ${newService._id}. इसे जल्द ही संबंधित विभाग को भेजा जाएगा।`,
          referenceId: newService._id,
      };
  } catch (dbError) {
      return {
          success: false,
          message: `शिकायत दर्ज करते समय गंभीर त्रुटि हुई। (Error: ${dbError.message})`,
      };
  }
}

const complainServiceToolDefinition = {
  name: "complainService",
  description: "Files a service complaint (e.g., electricity, water, road issue) on behalf of the user and saves it to the local database.",
  parameters: {
    type: "object",
    properties: {
      serviceName: {
        type: "string",
        description: "The name of the service the user is complaining about (e.g., 'Electricity Issue', 'Water Problem').",
      },
      problemDescription: {
        type: "string",
        description: "A detailed description of the specific problem provided by the user. Do not make this up or shorten it unnecessarily.",
      },
    },
    required: ["serviceName", "problemDescription"],
  },
};

export { complainService, complainServiceToolDefinition };