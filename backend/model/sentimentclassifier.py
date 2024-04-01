from transformers import pipeline

# This classifier uses cardiffnlp/twitter-roberta-base-sentiment-latest from Huggingface.

class SentimentClassifier:
  def __init__(self):
    self.sentiment_pipeline = pipeline('sentiment-analysis')

  def predict(self, text, mode):
    sentiment = self.sentiment_analysis(text)
    result = {'sentiment': sentiment}
    print(result)
    return result
  
  def sentiment_analysis(self, text):
    data = [text]
    sentiment = self.sentiment_pipeline(data)[0]
    return sentiment