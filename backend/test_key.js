const axios = require('axios');
require('dotenv').config();

async function testNewsAPI() {
    const key = process.env.NEWS_API_KEY;
    console.log(`Testing key: "${key}"`);
    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=tech&pageSize=1&apiKey=${key}`);
        console.log('Success:', response.status);
    } catch (error) {
        console.error('Error Status:', error.response?.status);
        console.error('Error Message:', error.response?.data?.message);
    }
}

testNewsAPI();
