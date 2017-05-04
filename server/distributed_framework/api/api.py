import hug
from tasks.tasks import train_model_task, predict_model_task
from celery.result import AsyncResult
import requests
# from pymongo.objectid import ObjectId


@hug.get('/train', output=hug.output_format.html)
def train(objectid):
    # output = add.delay(4, 4, d)
    output = train_model_task.delay(objectid)
    print("Received TRAIN request for: " + objectid)
    ip = requests.get('http://checkip.amazonaws.com').text
    return '<a href="http://' + ip + ':5000/status?id=' + output.id + '"> ' + output.id + '</a>'

@hug.get('/status')
def status(id):
    return AsyncResult(id).ready()

@hug.post('/predict', output=hug.output_format.json)
def predict_endpoint(objectid, predict_data):
    return {'predictions': predict_model_task(objectid, predict_data)}
