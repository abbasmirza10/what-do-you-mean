
from transformers import AutoModelForSequenceClassification
from transformers import TFAutoModelForSequenceClassification
from transformers import AutoTokenizer, AutoConfig
import numpy as np
# from scipy.special import softmax

text = 'Opossums are so cute!!'

sentiment_MODEL ='cardiffnlp/twitter-roberta-base-sentiment-latest'
sentiment_tokenizer = AutoTokenizer.from_pretrained(sentiment_MODEL)
sentiment_config = AutoConfig.from_pretrained(sentiment_MODEL)
sentiment_model = AutoModelForSequenceClassification.from_pretrained(sentiment_MODEL)


encoded_input = sentiment_tokenizer(text, return_tensors='pt')
output = sentiment_model(**encoded_input)
print(output)
scores = output[0][0].detach().numpy()
print(scores)
# scores = softmax(scores)
# print(scores)