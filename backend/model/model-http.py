from flask import Flask, request, jsonify
from sentimentclassifier import SentimentClassifier

app = Flask(__name__)
classifier = SentimentClassifier()

@app.route('/', methods=['POST'])
def model():
  
  content = request.get_json()
  
  # Content must contain keyword 'sentence'
  if 'sentence' not in content.keys():
    return jsonify({'error': "Must contain keyword 'sentence'"}), 400

  # Classify sentiment
  sentence = content['sentence']
  mode = content.get('mode', 0)
  result = 0
  try:
    result = classifier.predict(sentence, mode)
  except Exception as e:
    print(e)
    return jsonify({'error': "Error occurs in model classification"}), 500

  # Respond with status 200
  out = {'result': result, 'error': None, 'content': content}
  return jsonify(out), 200

if __name__ == "__main__":
  app.run(debug=True)