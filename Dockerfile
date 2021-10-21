FROM python:latest
COPY . /
EXPOSE 7000
CMD python3 ./server.py
