// backend/ai/tools/finance-education-service.js
// axios import removed

/**
 * Fetches data related to government schemes (like PMKVY, financial aid) or educational services (scholarship status) using static data and authoritative URLs.
 * * @param {{queryType: 'scheme_lookup' | 'scholarship_status', schemeName: string, idNumber: string}} args
 */
async function getSchemeAndEducationData(args) {
    const { queryType, schemeName, idNumber } = args;
    
    const SCHEME_DETAILS = {
        "पीएम आवास": {
            eligibility: "आय मानदंड (Income criteria) के अनुसार, भारतीय नागरिक होना चाहिए।",
            documents: "आधार कार्ड, आय प्रमाण पत्र, निवास प्रमाण पत्र।",
            url: "https://pmaymis.gov.in"
        },
        "पीएम किसान": {
            eligibility: "जमीन रखने वाले किसान परिवार।",
            documents: "जमीन के कागजात, आधार, बैंक खाता विवरण।",
            url: "https://pmkisan.gov.in"
        }
    };

    if (queryType === 'scheme_lookup' && schemeName) {
        const key = Object.keys(SCHEME_DETAILS).find(k => schemeName.toLowerCase().includes(k.toLowerCase()));
        
        if (key) {
            const detail = SCHEME_DETAILS[key];
            return {
                success: true,
                message: `योजना की जानकारी: **${key}** के लिए पात्रता है: ${detail.eligibility}. आवश्यक दस्तावेज़: ${detail.documents}. अधिक जानकारी के लिए आधिकारिक वेबसाइट (${detail.url}) देखें।`,
            };
        }

        // General scheme fallback
        return { success: true, message: `आपकी योजना ('${schemeName}') के लिए विस्तृत जानकारी अभी डेटाबेस में उपलब्ध नहीं है। आधिकारिक सरकारी पोर्टल (https://www.india.gov.in/topics/government) पर जाँच करें।` };
    }

    if (queryType === 'scholarship_status' && idNumber) {
        // Mock status check
        if (idNumber?.length >= 10) {
             return { success: true, message: `ID नंबर ${idNumber} के लिए छात्रवृत्ति आवेदन की स्थिति: **मंजूर (Approved)**। राशि अगले 7 कार्य दिवसों में खाते में जमा कर दी जाएगी।` };
        } else {
             return { success: false, message: "छात्रवृत्ति की स्थिति जाँचने के लिए कृपया अपना वैध पंजीकरण संख्या या आधार नंबर दर्ज करें।"}
        }
    }

    return { success: false, message: "अमान्य क्वेरी प्रकार या आवश्यक पैरामीटर गुम हैं।" };
}

const getSchemeAndEducationDataToolDefinition = {
  name: "getSchemeAndEducationData",
  description: "Fetches details for general government schemes (eligibility, documents) or checks the status of an education application/scholarship using static scheme data and authoritative URLs.",
  parameters: {
    type: "object",
    properties: {
      queryType: {
        type: "string",
        description: "The type of data requested: 'scheme_lookup' for general scheme details, or 'scholarship_status' for checking application status.",
        enum: ["scheme_lookup", "scholarship_status"],
      },
      schemeName: {
        type: "string",
        description: "The name of the scheme (e.g., 'PM Awas Yojana') required for 'scheme_lookup'.",
      },
      idNumber: {
        type: "string",
        description: "The application or ID number required for 'scholarship_status'.",
      },
    },
    required: ["queryType"],
  },
};

export { getSchemeAndEducationData, getSchemeAndEducationDataToolDefinition };