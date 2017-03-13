FROM python:latest
MAINTAINER Sandesh Gade "sandeshgade@gmail.com"

# add requirements.txt to the image
ADD requirements.txt /app/requirements.txt

# create unprivileged user
RUN adduser --disabled-password --gecos '' myuser

# set working directory to /app/
WORKDIR /app

COPY . /app
RUN ls
RUN cp ./api/tasks/celeryconfig.py ./api/celeryconfig.py
RUN chmod +x run_api.sh

# install python dependencies
RUN pip3 install -r requirements.txt


