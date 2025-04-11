require('dotenv').config();
const axios = require('axios');

const NEWS_API_URL = process.env.NEWS_API_URL;
const API_KEY = process.env.API_KEY;

const getNews = async (req, res) => {
    const { category = 'technology', country = 'us' } = req.query;
    const max = 5;
    try {
        // Log API details to confirm values
        console.log('API Key:', API_KEY);
        console.log('News API URL:', NEWS_API_URL);

        // Make the request to the News API
        const response_news_api = await axios.get(NEWS_API_URL, {
            params: {
                apikey: API_KEY,
                category,
                country,
                max,
            },
        });

        // Log the status and data received
        console.log('Response Status:', response_news_api.status);
        console.log('Response Data:', response_news_api.data);

        // Check if the response contains the expected data
        if (response_news_api.data && response_news_api.data.articles) {
            const articles = response_news_api.data.articles;
            res.json(articles);
        } else {
            console.error('Unexpected response format:', response_news_api.data);
            res.status(500).json({ error: 'Invalid response from news API' });
        }
    } catch (e) {
        console.error('Error fetching news:');

        // Handle different types of Axios errors
        if (e.response) {
            console.error('Error Response:', e.response.status, e.response.data);
            res.status(e.response.status).json({
                error: `API Error: ${e.response.data.message || 'Unknown error'}`,
            });
        } else if (e.request) {
            console.error('No response received:', e.request);
            res.status(500).json({ error: 'No response from news API' });
        } else {
            console.error('Error setting up request:', e.message);
            res.status(500).json({ error: 'Error setting up request' });
        }
    }
};

module.exports = { getNews };
