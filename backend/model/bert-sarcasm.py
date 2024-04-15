from transformers import BertTokenizer, BertModel
import torch
from torch import nn
from torch.optim import Adam
from tqdm import tqdm
import pandas as pd
import numpy as np
from sklearn.metrics import classification_report, roc_auc_score

import sys
from IPython.core import ultratb
sys.excepthook = ultratb.FormattedTB(color_scheme='Linux', call_pdb=False)

tokenizer = BertTokenizer.from_pretrained('prajjwal1/bert-tiny')

class Dataset(torch.utils.data.Dataset):

  def __init__(self, X, Y):

    self.labels = np.array(Y)
    self.texts = [tokenizer(text, 
                            padding='max_length', max_length = 512,
                            # truncation=True,
                            return_tensors="pt") for text in X]

  def classes(self):
    return self.labels

  def __len__(self):
    return len(self.labels)

  def get_batch_labels(self, idx):
    # Fetch a batch of labels
    return np.array(self.labels[idx])

  def get_batch_texts(self, idx):
    # Fetch a batch of inputs
    return self.texts[idx]

  def __getitem__(self, idx):

    batch_texts = self.get_batch_texts(idx)
    batch_y = self.get_batch_labels(idx)

    return batch_texts, batch_y

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

def train(model, X,Y, learning_rate, epochs, batch_size):

  train = Dataset(X,Y)
  # , Dataset(val_data)

  train_dataloader = torch.utils.data.DataLoader(train, batch_size, shuffle=True)
  # val_dataloader = torch.utils.data.DataLoader(val, batch_size=2)

  use_cuda = torch.cuda.is_available()
  device = torch.device("cuda" if use_cuda else "cpu")

  criterion = nn.CrossEntropyLoss()
  optimizer = Adam(model.parameters(), lr= learning_rate)

  if use_cuda:

    model = model.cuda()
    criterion = criterion.cuda()

  for epoch_num in range(epochs):

    total_acc_train = 0
    total_loss_train = 0

    for train_input, train_label in tqdm(train_dataloader):

      train_label = train_label.to(device)
      mask = train_input['attention_mask'].to(device)
      input_id = train_input['input_ids'].squeeze(1).to(device)

      output = model(input_id, mask)
      
      batch_loss = criterion(output, train_label)
      total_loss_train += batch_loss.item()
      
      acc = (output.argmax(dim=1) == train_label).sum().item()
      total_acc_train += acc

      model.zero_grad()
      batch_loss.backward()
      optimizer.step()
    
    
    print(
        f'Epochs: {epoch_num + 1} | Train Loss: {total_loss_train / len(X): .3f} | Train Accuracy: {total_acc_train / len(X): .3f}')


def evaluate(model, X,Y, batch_size):

  test = Dataset(X, Y)

  test_dataloader = torch.utils.data.DataLoader(test, batch_size,shuffle=False)

  use_cuda = torch.cuda.is_available()
  device = torch.device("cuda" if use_cuda else "cpu")

  if use_cuda:

    model = model.cuda()

  total_acc_test = 0
  y_pred = []
  with torch.no_grad():

    for test_input, test_label in test_dataloader:

      test_label = test_label.to(device)
      mask = test_input['attention_mask'].to(device)
      input_id = test_input['input_ids'].squeeze(1).to(device)

      output = model(input_id, mask)
      y_pred.append(output.argmax(dim=1))

  return y_pred


df = pd.read_json("./Sarcasm_Headlines_Dataset_v2.json", lines=True)

X = df['headline']
Y = df['is_sarcastic']

data_split = int(df.shape[0] * 0.75)
X_train, X_test = X[:data_split], X[data_split:]
y_train, y_test = Y[:data_split], Y[data_split:]

EPOCHS = 1 #5
batch_size = 32
model = BertClassifier()
LR = 1e-4
              
train(model, X_train, y_train, LR, EPOCHS, batch_size)

y_pred = evaluate(model, X_test,y_test, batch_size)

y_pred_ = torch.cat(y_pred, dim=0)

y_pred_=y_pred_.cpu().detach().numpy()

print(classification_report(y_test.values, y_pred_))
print(roc_auc_score(y_test, y_pred_))