FROM python:3.10-slim

WORKDIR /app

RUN apt-get update -y
RUN apt-get install -y --fix-missing gcc
RUN apt-get install -y python3-dev build-essential --fix-missing
RUN apt-get install -y pkg-config default-libmysqlclient-dev

COPY requirements.txt .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

COPY start.sh /start.sh

RUN chmod +x /start.sh

ENTRYPOINT ["/start.sh"]
