require('dotenv').config();
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY_GEMINI = process.env.API_KEY_GEMINI;
const API_KEY = process.env.API_KEY;
const NEWS_API_URL = 'http://localhost:5000/api/news'; 

const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// const pLimit = require('p-limit'); 
// const limit = pLimit(3); // Limit to 3 requests concurrently

const generateSummary = async (url) => {
    const content = `Summarize this news from this URL: ${url} in 100 words or less.`;

    try {
        // Add rate limiting to avoid 429 errors
        // const result = await limit(() => model.generateContent(content));
        const result = await  model.generateContent(content);
        const summary = result.response.text();
        return summary;
    } catch (error) {
        console.error(`Error summarizing URL: ${url}`, error.message);
        return `Error generating summary for ${url}`;
    }
};


// const generateSummary = async (url) => {
//     const content = `Summarize this news from this URL: ${url} in 100 words or less.`;

//     try {
//         const result = await model.generateContent(content);
//         const summary = result.response.text();
//         return summary;
//     } catch (error) {
//         console.error(`Error summarizing URL: ${url}`, error.message);
//         return ('Error generating summary',url);
//     }
// };

const getSummaryByUrl = async (req, res) => {
    try {

        const { category = 'technology', country = 'us' } = req.query;
        const response_news_api = await axios.get(NEWS_API_URL, {
            params: {
                apikey: API_KEY,
                category,
                country,
            },
        });
        console.log('data retrieved: ')
        console.log(response_news_api)
        const articles = response_news_api.data;
        const summaries = await Promise.all(
            articles.map(async (article) => {
                const summary = await generateSummary(article.url);
                return { ...article, summary };
            })
        );

        res.json(summaries);
    } catch (error) {
        console.error('Error fetching URLs or summarizing:', error.message);
        res.status(500).json({ error: 'Error fetching URLs or summarizing' });
    }
};

module.exports = { getSummaryByUrl };
