#!/bin/bash

REPO_DIR="/path/to/your/project/on/server"
DOCKER_IMAGE_NAME="your-app-name"
DOCKER_CONTAINER_NAME="your-app-container"
# DOCKER_COMPOSE_FILE_PATH="${REPO_DIR}/docker-compose.yml"

LOG_FILE="/var/log/deployment.log"
exec > >(tee -a ${LOG_FILE})
exec 2> >(tee -a ${LOG_FILE} >&2)

echo "----------------------------------------------------"
echo "Deployment started via Bun webhook at $(date)"
echo "----------------------------------------------------"

cd "$REPO_DIR" || { echo "Failed to cd into $REPO_DIR"; exit 1; }

echo "Pulling latest changes from Git..."
git checkout main # Or your deployment branch
git pull origin main || { echo "Git pull failed"; exit 1; }

echo "Building Docker image: $DOCKER_IMAGE_NAME..."
docker build -t "$DOCKER_IMAGE_NAME" . || { echo "Docker build failed"; exit 1; }

echo "Stopping and removing old container: $DOCKER_CONTAINER_NAME..."
docker stop "$DOCKER_CONTAINER_NAME" >/dev/null 2>&1 || echo "No existing container to stop."
docker rm "$DOCKER_CONTAINER_NAME" >/dev/null 2>&1 || echo "No existing container to remove."

echo "Running new Docker container: $DOCKER_CONTAINER_NAME..."
docker run -d -p 8080:80 --name "$DOCKER_CONTAINER_NAME" "$DOCKER_IMAGE_NAME" || { echo "Docker run failed"; exit 1; }

# --- OR, if using Docker Compose ---
# echo "Bringing up services with Docker Compose..."
# docker-compose -f "$DOCKER_COMPOSE_FILE_PATH" down
# docker-compose -f "$DOCKER_COMPOSE_FILE_PATH" build
# docker-compose -f "$DOCKER_COMPOSE_FILE_PATH" up -d || { echo "Docker Compose up failed"; exit 1; }

echo "Cleaning up dangling Docker images..."
docker image prune -f

echo "----------------------------------------------------"
echo "Deployment finished successfully at $(date)"
echo "----------------------------------------------------"
exit 0

