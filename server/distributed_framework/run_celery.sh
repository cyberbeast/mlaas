#!/bin/bash
cd api/tasks
su -m myuser -c "celery -A tasks worker --loglevel=info"

