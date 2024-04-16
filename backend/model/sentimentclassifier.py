from transformers import pipeline

# This classifier uses cardiffnlp/twitter-roberta-base-sentiment-latest from Huggingface.

class SentimentClassifier:
  def __init__(self):
    self.sentiment_pipeline = pipeline('sentiment-analysis')
  
  def predict(self, x):
    prediction = self.sentiment_pipeline([x])[0]
    label = prediction['label']
    score = prediction['score']
    return {'label': label, 'score': round(float(score), 5)}