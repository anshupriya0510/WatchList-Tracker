#!/bin/bash

set -e

echo "===== Jenkins Deployment Started ====="

echo "Current Directory:"
pwd

echo "Stopping old containers..."
docker compose down || true

echo "Starting containers..."
docker compose up -d

echo "Running containers..."
docker ps

echo "===== Deployment Successful ====="
