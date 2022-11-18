## Bid-Bot

This project is DPA's own bid-bot which scrapes bids from the list of DPA's frequently checked tendering services. 

### Requirments

Please install [Docker Desktop](https://docs.docker.com/docker-for-windows/install/) desktop and make sure you have the ```docker``` and ``` docker-compose ``` commands installed and defined in your ``` $PATH ```.


### Running APi and UI Apps
API - Python app that serve a api whith FastApi library and Sqlite BD to storage scrapped bids
UI - Next JS (Frontend JavaSript Framework) app 

#### Building

Building this application will:
- download the OS
- install desired os programs (R-base, etc...)
- install python
- install python libraries
- install node js enviroment
- install node modules specified in package.json

The first time you build the program, it will take a lot of time mainly to download and install node modules. After that everything will be cached on your local machine and thus will not take so much time. 

You should run the build command whenever you change anything about the container setup mostly in ``` docker-compose.yml ``` or ``` Dockerfile ```

``` bash
docker-compose --profile bidbot build
```
or for run the build and run bidbot at the same time, you can use:
``` bash
docker-compose --profile bidbot up --build
```

#### Running

Running the app will launch a container with two containers one for each app. A profile called bidbot is used to unify the union of both

``` bash
docker-compose --profile bidbot down  && docker-compose --profile bidbot up --no-build
```
**Flag Explanations**

- ``` --profile bidbot ``` To specify profile used to start both apps.

- ```--no-build``` for no build again dockers images.

**Docker-compose comands Explanations**

- ``` down ```if  containers with a similar name exists, stop and delete they and create these ones.

- ``` up ```create  and up containers running services spcify on ``` docker-compose.yml ```. 

  
