require('dotenv').config();
const axios = require('axios');
const NEWS_API_URL = process.env.NEWS_API_URL;
const API_KEY = process.env.API_KEY;
const getUrls = async (req, res) => {
    const { category = 'technology', country = 'us' } = req.query;
    const max = 5;
    try {
        const response_news_api = await axios.get(NEWS_API_URL, {
            params: {
                apikey: API_KEY,
                category,
                country,
                max,
            },
        });
        const articles = response_news_api.data.articles;
        const urls = articles.map((article) => article.url)
        console.log(urls);
        res.json(urls);
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ error: 'Error fetching news' });
    }
};

module.exports = { getUrls };