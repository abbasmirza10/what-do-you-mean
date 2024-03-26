import sys
import json
from sentimentclassifier import SentimentClassifier

def main():
  # Keyworded arguments are passed as argument 1 in JSON format
  kwargs = json.loads(sys.argv[1])

  # kwargs must have keyword 'sentence' and can haveoptional keywords 'mode' and 'args'
  if 'sentence' not in kwargs.keys():
    raise TypeError("argument must contain the keyword 'sentence'")

  # kwargs can not contain invalid keywords
  for key in kwargs.keys():
    if key not in ['sentence', 'mode', 'args']:
      raise TypeError(f"'{key}' is an invalid keyword argument")
  
  # Fill in empty values pairs
  kwargs['mode'] = kwargs.get('mode', 0)
  kwargs['args'] = kwargs.get('args', 0)

  # Create classifier
  classifier = SentimentClassifier(kwargs['mode'])

  # Classify sentiment
  sentiment = classifier.predict(kwargs['sentence'])

  # respond to the server through stdout
  out = {'sentiment': sentiment, 'error': None, 'kwargs': kwargs}
  print(json.dumps(out), end = '')
  sys.stdout.flush()

if __name__ == '__main__':
  main()