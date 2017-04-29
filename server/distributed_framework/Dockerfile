FROM python:latest
MAINTAINER Sandesh Gade "sandeshgade@gmail.com"

COPY . /app

# install python dependencies
RUN pip3 install -r /app/requirements.txt
WORKDIR /app/api/

RUN ls -l .

CMD /usr/local/bin/uwsgi --http 0.0.0.0:5000 --wsgi-file /app/api/api.py --callable __hug_wsgi__

EXPOSE 5000
