import sys
sys.path.append("./tasks")
print(sys.path)
import os
import glob
from celery import Celery
import time
from manager import train_model, process_data, predict_on_model

app = Celery('tasks')
app.config_from_object('celeryconfig')

@app.task(name='tasks.train_model')
def train_model_task(objectid):
    # print(glob.glob("sample.csv", recursive=True))
    process_data(os.path.join('tasks','data','sample.csv'))
    response = train_model(objectid)
    print("Worker is working on: " + objectid)
    # time.sleep(int(10))
    return "done"

@app.task(name='tasks.predict_model')
def predict_model_task(objectid, data):
    return predict_on_model(objectid, data)
