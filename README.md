# What Do you Mean

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/3e23_jye)

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

    **_NOTE:_** Run this command on a separate terminal on the same machine. Install python libraries according to error message.

    ```bash
    cd backend/model
    python3 model-http.py
    ```
