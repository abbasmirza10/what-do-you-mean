# WDYM API Documentation

By feathers | April 15, 2024

## What does this API do?

Want to use WDYM's models in your product? Don't work, let's start with a example to introduce you to the WDYM API.

WDYM API analyzes tones and sarcasm using BERT-based models. You can analyze your own sentences by making a **POST** request to *wdym.com/model*`*. The API respond with the analysis in the JSON format.

## Making a Request

*wdym.com/model* handles all API requests. **POST** to this address with content-type **JSON**. You can include optional parameter **mode** to specify which analysis model you would like to use. **mode** is set to `0` by default.

``` JSON
{
  "sentence": "She fell asleep preprocessing NLP datasets.",
  "mode": 0
}
```

## Understanding the Response

A successful analysis responds in **JSON** with status `400`. **Analysis** includes the prediction from models. Currently, the response contains **sentiment** and **sarcasm**. **error** includes errors such not including **sentence** in the request. Finally, **content** contains an exact copy of the request **JSON** you sent. This can be helpful for debuging.

``` JSON
{
  "analysis":
  {
    "sentiment": {"label": "POSITIVE", "score": 0.97},
    "sarcasm": {"label": "NO", "score": 0.97}
  }, 
  "error": null, 
  "content": {"sentence": "She fell asleep preprocessing NLP datasets.", "mode": 0}
}
```

## A Javascript Example

Let's say you are building a web frontend. Send a request using the **fetch** function. Set the method and content-type to **POST** and **application/json**, respectively. After receiving the response, you access the response, as a dictionary, by calling `res.json()`.

``` Javascript
  fetch('/model', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sentence: $('#text-input').val(), // value in the text input box
      mode: 0
    })
  })
  .then( (res) => res.json())
  .then( (res) => {
    $('#sentiment-bar').text(res.analysis.sentiment.label); // update the a text block
    $('#sentiment-score').attr('value', res.analysis.sentiment.score); // update a progress bar
    console.log('response JSON', res);
  });
```

## See It In Action

See **backend/expressapp/public/javascripts/analysis.js** for a production example. Together with **backend/expressapp/views/analysis.pug**, **analysis.js** handles all frontnd action on **wdym.com/analysis**.
