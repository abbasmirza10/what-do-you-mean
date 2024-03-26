# What Do you Mean

## Resources

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/3e23_jye)

## Tools and Frameworks

### Sentiment Analysis libraries

* [SpaCy](https://spacy.io/universe/project/spacy-textblob) (SpaCy)
* [BERT](https://huggingface.co/docs/transformers/model_doc/bert)

### Backend Framework

**Express** is chosen over Nest. Express offers greater flexibility, while Nest is very structured and is generally built with Typescript. The scale of this project makes Express the better framework

## Environment Setup - Development

### Backend

1. Install Node Version Manager

    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    ```

2. Install Node using nvm

    ```bash
    nvm install 20.11.1
    ```

3. Install Express using npm

    ```bash
    npm install express
    ```

4. Run development server

    ```bash
    cd backend/expressapp/
    DEBUG=expressapp:* npm start
    ```
