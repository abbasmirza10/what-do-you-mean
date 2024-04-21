# What Do you Mean

## Resources

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/3e23_jye)

## Tools and Frameworks

### Huggingface transformers for sentiment analysis

* [Huggingface](https://huggingface.co/blog/sentiment-analysis-python)

### Sentiment Analysis libraries

* [SpaCy](https://spacy.io/universe/project/spacy-textblob)
* [BERT](https://huggingface.co/docs/transformers/model_doc/bert)

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

3. Run development server

    ```bash
    cd backend/expressapp/
    DEBUG=expressapp:* npm start
    ```

4. Install python libraries

    ```bash
    pip3 install flask
    pip3 install transformers
    pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
    pip3 install scikit-learn
    pip3 install scipy
    pip3 install pandas
    ```

6. Run model server on another terminal on the same machine

    ```bash
    cd backend/model
    flask --app model-http run
    ```
