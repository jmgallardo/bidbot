FROM python:3.10.6-slim

# set working directory
WORKDIR /app

# Update pip
RUN pip install --upgrade pip

# add and install requirements
COPY ./requirement.txt /app/requirement.txt
RUN pip install -r requirement.txt

# add app
COPY . /app

EXPOSE 8000

CMD [ "uvicorn", "main:app", "--reload", "--host", "0.0.0.0" ]