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

* [BERT](https://huggingface.co/docs/transformers/model_doc/bert)
* [Huggingface](https://huggingface.co/blog/sentiment-analysis-python)

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
