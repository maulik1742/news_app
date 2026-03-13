require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log('No GEMINI_API_KEY found!');
    return;
  }
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // There isn't a direct listModels in the SDK for easy use without deeper calls usually,
    // but let's try to just hit a known reliable one first or another version.
    
    const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
    
    for (const modelName of models) {
        try {
            console.log(`Testing model: ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello");
            const response = await result.response;
            console.log(`✅ ${modelName} works: ${response.text().substring(0, 20)}...`);
            return; // Stop if one works
        } catch (e) {
            console.log(`❌ ${modelName} failed: ${e.message}`);
        }
    }
  } catch (error) {
    console.error('General Error:', error.message);
  }
}

listModels();
