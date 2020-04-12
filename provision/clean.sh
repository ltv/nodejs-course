#!/bin/bash
echo 'DOCKER VERSION'
docker -v

echo 'DOCKER COMPOSE VERSION'
docker-compose -v

echo 'CREATE DATA DIRECTORY'
mkdir -p ./data

echo 'COMPOSE DOWN'
docker-compose --project-name=ltv down
