const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // parse the JSON
app.get('/', (req, res) => {
    res.sendFile('homepage.html', {root: __dirname});
});

app.get('/analysis', (req, res) => {
    res.sendFile('analysis.html', {root: __dirname});
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

app.use(express.static(__dirname + '/public'));

app.get('/analysis', (req, res) => {
    res.sendFile('analysis.html', {root: __dirname});
});

app.post('/model', (req, res) => {

    let demoModel = (input) => {
        let sentimentLabels = ['NEGATIVE', 'POSITIVE'];
        let sarcasmLabels = ['NO', 'YES'];
        let sentimentLabel = sentimentLabels[Math.random() > 0.5];
        let sarcasmLabel = sarcasmLabels[Math.random() > 0.5];

        let output = {analysis: {
            sentiment: {label: sentimentLabel, score: Math.random()},
            sarcasm: {label: sarcasmLabel, score: Math.random()}
        }, error: null, content: input}
        return output;
    };

    let modelInput = req.body;
    let modelOutput = demoModel(modelInput);
    res.json(modelOutput);
});

app.listen(port, () => {
    //Modify accordingly - to check interface
    console.log(`Server is running on port ${port}`);
    console.log('Link to server : http://localhost:3000/');
});
