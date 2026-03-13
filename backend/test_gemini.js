require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
  console.log('Using Key:', process.env.GEMINI_API_KEY);
  if (!process.env.GEMINI_API_KEY) {
    console.log('No GEMINI_API_KEY found!');
    return;
  }
  
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent("Hello, are you working?");
    const response = await result.response;
    console.log('Success:', response.text());
  } catch (error) {
    console.error('Gemini Test Error:', error.message);
    if (error.response) {
        console.error('Status:', error.response.status);
    }
  }
}

testGemini();
