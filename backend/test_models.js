require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function checkModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Attempting to use a very basic model name
    const modelNames = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro', 'gemini-1.0-pro'];
    
    for (const name of modelNames) {
        try {
            const model = genAI.getGenerativeModel({ model: name });
            const result = await model.generateContent("test");
            console.log(`Model ${name} works!`);
            process.exit(0);
        } catch (err) {
            console.log(`Model ${name} failed: ${err.message}`);
        }
    }
}

checkModels();
