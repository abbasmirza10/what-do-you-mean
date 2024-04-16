from flask import Flask, request, jsonify
from sentimentclassifier import SentimentClassifier
from sarcasmclassifier import SarcasmClassifier

app = Flask(__name__)
sentimentclassifier = SentimentClassifier()
sarcasmclassifier = SarcasmClassifier()

@app.route('/', methods=['POST'])
def model():

  content = request.get_json()
  sentence = content.get('sentence', '')
  mode = content.get('mode', 0)

  try:
    sentiment = sentimentclassifier.predict(sentence)
    sarcasm = sarcasmclassifier.predict(sentence)
    analysis = {'sentiment': sentiment, 'sarcasm': sarcasm}
    print(analysis)
    out = {'analysis': analysis, 'error': None, 'content': content}
    return jsonify(out), 200
  except Exception as e:
    print('ERROR:', e)
    out = {'error': f'Error occurred during prediction: {e}'}
    return jsonify(), 500

if __name__ == "__main__":
  app.run(debug=True)