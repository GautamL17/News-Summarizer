require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const newsRoute = require('./routes/news.routes');
const summaryRoute = require('./routes/getSummary.routes');
const urlsRoute = require('./routes/urls.routes');

mongoose.connect('mongodb://localhost:27017/newsAggregator', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/news', newsRoute);
app.use('/api/summary', summaryRoute);
app.use('/api/urls', urlsRoute);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});