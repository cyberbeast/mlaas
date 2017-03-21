import hug
from tasks.tasks import add
from celery.result import AsyncResult
import requests


@hug.get('/test', output=hug.output_format.html)
def test(delay):
    output = add.delay(4, 4, delay)
    ip = requests.get('http://checkip.amazonaws.com').text
    return '<a href="http://' + ip + ':5000/status?id=' + output.id + '"> ' + output.id + '</a>'

@hug.get('/status')
def status(id):
    return AsyncResult(id).ready()
