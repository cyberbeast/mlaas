import sys
sys.path.append("./tasks")
print(sys.path)
from celery import Celery
import time
from manager import train_model

app = Celery('tasks')
app.config_from_object('celeryconfig')

@app.task(name='tasks.add')
def add(x, y, delay:int):
    time.sleep(int(delay))    
    return x + y