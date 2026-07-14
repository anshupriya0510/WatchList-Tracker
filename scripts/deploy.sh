#!/bin/bash

set -e

echo "===== Starting Deployment ====="

cd /home/ec2-user/WatchList-Tracker

echo "Pulling latest code..."
git pull origin main

echo "Stopping old containers..."
docker compose down

echo "Building images..."
docker compose build

echo "Starting containers..."
docker compose up -d

echo "Running containers:"
docker ps

echo "===== Deployment Successful ====="
