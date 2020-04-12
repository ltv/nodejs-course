#!/bin/bash
# Install docker
curl -fsSL get.docker.com -o get-docker.sh
sudo sh get-docker.sh
docker -v

# Install docker-compose
sudo curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose -v

sudo sed -i '/^ExecStart.*$/c\ExecStart=/usr/bin/dockerd -H unix:// -H tcp://0.0.0.0:6513' /lib/systemd/system/docker.service
# Restart docker daemon
sudo systemctl daemon-reload
sudo systemctl restart docker
