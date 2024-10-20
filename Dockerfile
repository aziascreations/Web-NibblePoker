FROM python:alpine

WORKDIR /www
ADD ./ ./

RUN apk add --no-cache cargo
RUN pip install -r requirements.txt
RUN pip install gunicorn

ENTRYPOINT ["top", "-b"]
