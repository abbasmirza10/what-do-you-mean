# What Do You Mean

## Group Members and Roles
* Abbas Mirza: Frontend and website design
* Swarnikaa Kiran: Frontend and website design
* Yen-Hung Huang: Backend development, NLP model, and analysis API
* Rishab Borah: Backend development and NLP model

## Overview
Texting is a very opaque medium, and it is difficult to interpret emotional state from the way a person types. But in conversations with friends, family, and important people it is especially important to understand how the other interlocutor feels in a given interaction. What Do You Mean (WDYM) aims to clarify these feelings using sentiment analysis. The application can help the user identify their friends’ emotional states, whether their classmates are being sarcastic, whether their crush is flirting with them, and more.
Full proposal linked [here](https://docs.google.com/document/d/1ecNHxRK2Cjk1Bu6yDNo16paIQOOBXnW3OerTvXX3kOM/edit).

## Motivations
* Facilitate communication through texting mediums
* Disambiguate opaque texting interactions
* Particularly helpful for people who have difficulty interpreting tonality and sarcasm from text

## Tools and Frameworks
![technical architecture of app](https://github.com/CS222-UIUC-SP24/group-project-team-72/blob/main/technical%20architecture.png)
<!--![technical architecture](https://github.com/CS222-UIUC-SP24/group-project-team-72/assets/59347012/45b13996-3943-4780-b86d-8dec4381280f)-->

* [BERT](https://huggingface.co/docs/transformers/model_doc/bert)
* [Huggingface](https://huggingface.co/blog/sentiment-analysis-python)

## WDYM API Documentation
By feathers | April 15, 2024

### What does this API do?

Want to use WDYM's models in your product? Don't work, let's start with a example to introduce you to the WDYM API.

WDYM API analyzes tones and sarcasm using BERT-based models. You can analyze your own sentences by making a **POST** request to *wdym.com/model*`*. The API respond with the analysis in the JSON format.

### Making a Request

*wdym.com/model* handles all API requests. **POST** to this address with content-type **JSON**. You can include optional parameter **mode** to specify which analysis model you would like to use. **mode** is set to `0` by default.

``` JSON
{
  "sentence": "She fell asleep preprocessing NLP datasets.",
  "mode": 0
}
```

### Understanding the Response

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

### A Javascript Example

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

## Server Installation

1. Clone

    ```bash
    git clone https://github.com/CS222-UIUC-SP24/group-project-team-72.git
    ```

2. Install Node using NVM

    **_NOTE:_** Close and reopen terminal after ```curl```.

    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    nvm install 20.11.1
    ```

3. Run Express server

    ```bash
    cd backend/expressapp/
    DEBUG=expressapp:* npm start
    ```

4. Start virtual environment

    ```bash
    cd backend/model
    sudo apt install python3-venv
    source env/bin/activate
    ```

5. Run NLP models

    **_NOTE:_** Run this command on a separate terminal on the same machine. Install python libraries as prompted.

    ```bash
    cd backend/model
    python3 model-http.py
    ```

## License
Copyright 2024 Abbas Mirza, Swarnikaa Kiran, Thomas Huang, Rishab Borah

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
