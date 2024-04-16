from transformers import BertTokenizer, BertModel
import torch
from torch import nn
from torch.optim import Adam
import torchinfo

from tqdm import tqdm
import pandas as pd
import numpy as np
from sklearn.metrics import classification_report, roc_auc_score
from scipy.special import softmax

class BertClassifier(nn.Module):

  def __init__(self, dropout=0.5):
    super(BertClassifier, self).__init__()
    self.bert = BertModel.from_pretrained('prajjwal1/bert-tiny')
    self.dropout = nn.Dropout(dropout)
    self.linear = nn.Linear(128, 2)
    self.relu = nn.ReLU()

  def forward(self, input_id, mask):
    _, pooled_output = self.bert(input_ids= input_id, attention_mask=mask,return_dict=False)
    dropout_output = self.dropout(pooled_output)
    linear_output = self.linear(dropout_output)
    final_layer = self.relu(linear_output)
    return final_layer

class SarcasmClassifier:
  def __init__(self):
    self.tokenizer = BertTokenizer.from_pretrained('prajjwal1/bert-tiny')
    self.device = torch.device('cpu')
    self.labels = ['NO', 'YES']

    self.model = BertClassifier().to(self.device)
    self.model.load_state_dict(torch.load('sarcasm.model'))

    torchinfo.summary(self.model, dtypes=['torch.IntTensor'])

  def predict(self, x):
    with torch.no_grad():
      texts = self.tokenizer(x, padding='max_length', max_length = 512, return_tensors='pt')
      
      mask = texts['attention_mask'].to(self.device)
      input_id = texts['input_ids'].squeeze(1).to(self.device) # squueze remove all dimensions size 1

      prediction = self.model(input_id, mask)
    
      prediction = softmax(prediction[0])
      label = self.labels[prediction.argmax()]
      score = prediction[prediction.argmax()]
      return {'label': label, 'score': round(float(score), 5)}