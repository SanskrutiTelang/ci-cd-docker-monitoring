# Automated CI/CD Pipeline with Docker & Monitoring

## Project Overview

This project demonstrates an automated CI/CD pipeline using GitHub Actions, Docker, Docker Compose, and GitHub Container Registry (GHCR).

The application is tested, containerized, built, published, deployed, and monitored through a DevOps workflow.

## Architecture

```text
Developer
   |
   v
GitHub Repository
   |
   v
GitHub Actions
   |
   +---- Install Dependencies
   |
   +---- Automated Testing
   |
   +---- Docker Image Build
   |
   +---- Publish Image to GHCR
   |
   v
Docker Compose Deployment
   |
   v
Running Application
   |
   v
Monitoring & Observability
   |
   +---- Application Logs
   +---- Health Checks
   +---- CPU & Memory Usage
```

## Technologies Used

- Git and GitHub
- GitHub Actions
- Node.js and Express.js
- Automated Testing
- Docker
- Docker Compose
- GitHub Container Registry
- Environment Variables
- Docker Logs and Health Checks

## Project Features

- Automated testing using GitHub Actions.
- Automatic Docker image building.
- Docker image publishing to GHCR.
- Containerized application deployment.
- Environment variable management using `.env`.
- Application health monitoring.
- Container logs monitoring.
- CPU and memory usage monitoring.

## Project Structure

```text
ci-cd-task-manager/
├── .github/
│   └── workflows/
│       └── ci.yml
├── public/
│   └── index.html
├── tests/
│   └── app.test.js
├── server.js
├── package.json
├── Dockerfile
├── compose.yaml
├── .dockerignore
├── .gitignore
└── README.md
```

## How to Run Locally

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd ci-cd-task-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run automated tests

```bash
npm test
```

### 4. Build Docker image

```bash
docker build -t cicd-task-manager:v1 .
```

### 5. Run Docker container

```bash
docker run -d -p 3000:3000 --name cicd-task-container cicd-task-manager:v1
```

### 6. Access the application

http://localhost:3000

Health endpoint:

http://localhost:3000/health

## CI/CD Pipeline

GitHub Actions automatically executes the following operations when code is pushed to the main branch:

1. Checks out the source code.
2. Sets up Node.js.
3. Installs project dependencies.
4. Runs automated tests.
5. Builds the Docker image.
6. Publishes the Docker image to GitHub Container Registry.

## Deployment

The application is deployed using Docker Compose.

```bash
docker compose pull
docker compose up -d
```

Check deployment:

```bash
docker compose ps
```

## Monitoring

### View application logs

```bash
docker compose logs -f
```

### Check container health

```bash
docker ps
```

### Monitor resource usage

```bash
docker stats ci-cd-task-manager
```

## Learning Outcomes

- Understanding CI/CD pipeline implementation.
- Automating software testing and Docker builds.
- Working with GitHub Actions workflows.
- Publishing Docker images to a container registry.
- Deploying applications using Docker Compose.
- Managing environment variables.
- Understanding application monitoring, logs, and health checks.

## Conclusion

This project demonstrates a practical DevOps workflow that automates testing, Docker image creation, image publishing, deployment preparation, and basic monitoring.

**Project Type:** DevOps / CI/CD Automation

**Status:** Completed
