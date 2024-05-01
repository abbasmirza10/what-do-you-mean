# What Do you Mean

## Group Members and Roles
* Abbas Mirza: Frontend and website design
* Swarnikaa Kiran: Frontend and website design
* Yen-Hung Huang: Backend development, NLP model, and analysis API
* Rishab Borah: Backend development and NLP model


## Tools and Frameworks

* [SpaCy](https://spacy.io/universe/project/spacy-textblob)
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
