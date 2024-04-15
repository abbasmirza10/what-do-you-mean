const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile('homepage.html', {root: __dirname});
});

app.get('/signup', (req, res) => {        
    res.sendFile('signup.html', {root: __dirname});      
});

app.get('/login', (req, res) => {        
    res.sendFile('login.html', {root: __dirname});      
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
    //Modify accordingly - to check interface
    console.log(`Server is running on port ${port}`);
});
