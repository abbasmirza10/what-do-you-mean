from transformers import pipeline, AutoTokenizer, AutoModelWithLMHead

# This classifier uses cardiffnlp/twitter-roberta-base-sentiment-latest from Huggingface.

class SentimentClassifier:
  def __init__(self):
    self.sentiment_pipeline = pipeline(model='cardiffnlp/twitter-roberta-base-sentiment-latest')

  def predict(self, sentence, mode):
    sentiment = self.sentiment_analysis(sentence)
    result = {'sentiment': sentiment}
    print(result)
    return result
  
  def sentiment_analysis(self, sentence):
    data = [sentence]
    sentiment = self.sentiment_pipeline(data)[0]
    return sentiment