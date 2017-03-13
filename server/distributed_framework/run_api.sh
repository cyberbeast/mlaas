#!/bin/bash
cd api
# su -m myuser -c ""
su -m myuser -c "gunicorn api:__hug_wsgi__ -b 0.0.0.0:5000"
su -m myuser -c "export PYTHONPATH=$PYTHONPATH:/api/tasks/"
# su -m myuser -c "rabbitmq-server"


