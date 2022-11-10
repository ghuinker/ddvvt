#!/bin/sh
if [ ! "$1" ]; then
    echo "Project name is required."
    exit
fi

sed -i '' "s/{{project_name}}/$1/g" ./DockerFile ./docker-compose.yml ./docker/docker-compose.test.yml ./docker/docker-compose.prod.yml .env.example
