import sys
sys.path.append("./tasks")
print(sys.path)
import os
from celery import Celery
import time
from manager import train_model, process_data

app = Celery('tasks')
app.config_from_object('celeryconfig')

@app.task(name='tasks.train_model')
def train_model(objectid):
    process_data(os.path.join('.','data','sample.csv'))
    train_model(objectid)
    print("Worker is working on: " + objectid)
    time.sleep(int(10))
    return 2 + 3
