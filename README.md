# Docker commands

## Build from dockerfile

$ docker build -t <IMAGE_NAME> <THIS_FOLDER>

### eg.)

docker build -t area-checker ./

## Create container

$ docker run -d -p 8080:80 --name <CONTAINER_NAME> --privileged --mount type=bind,source="<PROJECT/dist/www>",target=/var/app/dist/www <IMAGE_NAME> /sbin/init

### eg.)

docker run -d -p 8080:80 --name area-checker-container --privileged --mount type=bind,source="/Users/name/project/dist/www",target=/var/app/dist/www area-checker /sbin/init

## Enter container to use bash command

$ docker exec -it <CONTAINER_NAME> /bin/bash

## Start and stop container

$ docker stop <CONTAINER_NAME>

$ docker start <CONTAINER_NAME>



# Command inside container

## Start Nginx

$ sudo nginx 
-> admin123

## Start Development

$ gulp watch

## Build

$ gulp build