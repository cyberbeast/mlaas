import sys
sys.path.append("./tasks")
print(sys.path)
from celery import Celery
import time
from manager import train_model

app = Celery('tasks')
app.config_from_object('celeryconfig')

@app.task(name='tasks.train_model')
def train_model(objectid):
    print("Worker is working on: " + objectid)
    time.sleep(int(5))
    return 2 + 3
