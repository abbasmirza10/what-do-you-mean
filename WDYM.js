const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    //res.send('Welcome to the What Do You Mean App!');
});

app.get('/sentiment-analysis', (req, res) => {
    // TODO: Implement sentiment analysis
    //res.send('Sentiment analysis results display over here');
});

app.get('/crush-level-calculator', (req, res) => {
    // TODO: Implement crushcalculator
    //res.send('Crush level calculator results display over here');
});

app.get('/is-that-sarcasm', (req, res) => {
    // TODO: Implement sarcasm detection 
    //res.send('Sarcasm detection results will be displayed here');
});

app.listen(port, () => {
    //Modify accordingly
    console.log(`Server is running on port ${port}`);
});