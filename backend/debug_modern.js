require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function debugModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log('No GEMINI_API_KEY found!');
    return;
  }
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Testing potential 2026 model names
    const modelsToTest = [
      'gemini-2.0-flash', 
      'gemini-2.0-flash-lite', 
      'gemini-2.5-flash',
      'gemini-1.5-flash', 
      'gemini-1.5-flash-latest'
    ];
    
    for (const modelName of modelsToTest) {
        try {
            console.log(`Testing: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say 'Ready'");
            const response = await result.response;
            console.log(`✅ Success with ${modelName}: ${response.text()}`);
            return;
        } catch (e) {
            console.log(`❌ Failed ${modelName}: ${e.message}`);
        }
    }
  } catch (err) {
    console.error('Fatal Error:', err.message);
  }
}

debugModels();
