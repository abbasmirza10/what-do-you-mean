import sys
import json
from sentimentclassifier import SentimentClassifier

def main():
  # Keyworded arguments are passed as argument 1 in JSON format
  content = json.loads(sys.argv[1])

  # content must have keyword 'sentence' and can haveoptional keywords 'mode' and 'args'
  if 'sentence' not in content.keys():
    raise TypeError("argument must contain the keyword 'sentence'")

  # content can not contain invalid keywords
  for key in content.keys():
    if key not in ['sentence', 'mode', 'args']:
      raise TypeError(f"'{key}' is an invalid keyword argument")
  
  # Fill in empty values pairs
  content['mode'] = content.get('mode', 0)
  content['args'] = content.get('args', 0)

  # Create classifier
  classifier = SentimentClassifier()

  # Classify sentiment
  sentiment = classifier.predict(content['sentence'], content['mode'])

  # respond to the server through stdout
  out = {'sentiment': sentiment, 'error': None, 'content': content}
  print(json.dumps(out), end = '')
  sys.stdout.flush()

if __name__ == '__main__':
  main()