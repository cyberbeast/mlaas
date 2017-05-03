#!/bin/bash
# cd /app/api/tasks
dockerize -wait redis:6379
su -m myuser -c "celery -A tasks.tasks worker --loglevel=info"
