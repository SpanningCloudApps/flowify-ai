#!/bin/bash
# Update and install dependencies
yum update -y
yum install -y python3 git

# Install Docker
sudo yum install docker -y
service docker start
usermod -aG docker ec2-user

# Install java for migrations
sudo yum install java-17-amazon-corretto-devel -y

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Start Docker on boot
chkconfig docker on

# Verify Docker Compose installation
docker-compose --version

cd ~
git clone https://github.com/SpanningCloudApps/hackathon-ai.git

echo "export AI_HOME=~/hackathon-ai" >> .bash_profile
source .bash_profile
./scripts/run-service-local.sh --internal
