class SentimentClassifier:
  def __init__(self, mode = 0):
    self.mode = mode

  def predict(self, sentence):
    return hash(sentence)