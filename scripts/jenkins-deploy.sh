#!/bin/bash

set -e

echo "===== Jenkins Deployment Started ====="

cd /home/ec2-user/WatchList-Tracker


echo "Pulling latest Docker images..."
docker compose pull

echo "Stopping old containers..."
docker compose down || true

echo "Starting containers..."
docker compose up -d

echo "Running containers..."
docker ps

echo "===== Deployment Successful ====="
