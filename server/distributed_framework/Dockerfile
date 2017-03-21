FROM skiftcreative/gunicorn:latest
MAINTAINER Sandesh Gade "sandeshgade@gmail.com"

# add requirements.txt to the image
ADD requirements.txt /app/requirements.txt

# create unprivileged user
# RUN adduser --disabled-password --gecos '' myuser

COPY . /app
RUN cd /app; ls

# install python dependencies
RUN pip3 install -U -r /app/requirements.txt

RUN cp /app/api/tasks/celeryconfig.py /app/api/celeryconfig.py
# RUN chmod +x run_api.sh
RUN ls /app/
RUN cp /app/supervisord.conf /etc/supervisord.conf

EXPOSE 5000



# set working directory to /app/
WORKDIR /app
