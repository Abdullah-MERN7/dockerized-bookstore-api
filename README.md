# Dockerized Book Store API

A production-ready Book Store API containerized using Docker and Docker Compose.

The project runs the API, MongoDB, and Redis as separate services and includes health checks, persistent volumes, production configuration, image versioning, and rollback support.

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Redis
* Docker
* Docker Compose

## Features

* Dockerized Node.js API
* Multi-stage Docker build
* Production dependencies only
* Separate containers for API, MongoDB, and Redis
* Docker Compose service orchestration
* Service-to-service networking
* Health checks for MongoDB and Redis
* Persistent MongoDB data using Docker volumes
* Docker Hub image publishing
* Image versioning
* Production Docker Compose configuration
* Rollback support using previous image versions

## Project Architecture

```text
Client
   ↓
Book Store API
   │
   ├── MongoDB
   │
   └── Redis
```

All services communicate through the Docker Compose network.

Service names are used as hostnames:

```text
API → mongodb
API → redis
```

## Project Structure

```text
dockerized-bookstore-api/
├── src/
├── Dockerfile
├── docker-compose.yml
├── docker-compose.prod.yml
├── .dockerignore
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Prerequisites

Install:

* Docker
* Docker Desktop

Node.js, MongoDB, and Redis do not need to be installed manually when running the project with Docker.

## Run Locally

Clone the repository:

```bash
git clone <YOUR_REPOSITORY_URL>
```

Move into the project:

```bash
cd dockerized-bookstore-api
```

Start all services:

```bash
docker compose up -d
```

Check running containers:

```bash
docker compose ps
```

Stop and remove containers:

```bash
docker compose down
```

## Docker Services

The application uses the following services:

```text
app
mongodb
redis
```

Start the complete application:

```bash
docker compose up -d
```

## MongoDB Persistence

MongoDB uses a named Docker volume:

```yaml
volumes:
  - mongo-data:/data/db
```

This ensures database data remains available even if the MongoDB container is removed.

```text
Container removed
      ↓
Volume remains
      ↓
Data remains
```

To completely remove containers and volumes:

```bash
docker compose down -v
```

This will remove the MongoDB data.

## Health Checks

MongoDB and Redis include health checks to verify that the services are ready.

Example flow:

```text
Container starts
      ↓
Health check runs
      ↓
Service becomes healthy
      ↓
Application can depend on the service
```

Check container health:

```bash
docker compose ps
```

## Production

The production environment uses a pre-built Docker image instead of building directly from the source code.

Example:

```yaml
image: abdullahdev904/bookstore-app:v1
```

Run production services:

```bash
docker compose -f docker-compose.prod.yml up -d
```

## Image Versioning

Docker image versions are used to track deployments.

```text
bookstore-app:v1
bookstore-app:v2
```

Build a new version:

```bash
docker build -t bookstore-app:v2 .
```

Tag the image:

```bash
docker tag bookstore-app:v2 abdullahdev904/bookstore-app:v2
```

Push to Docker Hub:

```bash
docker push abdullahdev904/bookstore-app:v2
```

## Rollback

If a new production version contains a bug, the application can be rolled back to a previous image version.

Example:

```text
v1 → Working
v2 → Bug
```

Update the production Compose file:

```yaml
image: abdullahdev904/bookstore-app:v1
```

Then run:

```bash
docker compose -f docker-compose.prod.yml up -d
```

The application will run using the previous stable image.

## Useful Commands

Start services:

```bash
docker compose up -d
```

View running services:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f
```

Stop services:

```bash
docker compose down
```

Remove services and volumes:

```bash
docker compose down -v
```

## What I Practiced

* Docker images and containers
* Dockerfile
* Production dependency installation
* Docker Compose
* Multi-container applications
* Docker networking
* Service names as hostnames
* Health checks
* Named volumes
* Data persistence
* Docker Hub
* Image tagging and versioning
* Production deployments
* Rollback using previous Docker image versions

