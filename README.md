# CI/CD Task Manager with Docker & Monitoring

Beginner-friendly project: **GitHub → Build → Test → Docker → Deploy → Monitor**.

## Project mein kya hai?
- Node.js + Express Task Manager web app
- Automated tests using Node.js built-in test runner
- GitHub Actions workflow (`.github/workflows/ci.yml`)
- Dockerfile and Docker Compose
- `/health` endpoint and Docker health check
- Basic container logs using `docker compose logs`

## Requirements
- Node.js 20+ and npm
- Git
- Docker Desktop
- GitHub account

## 1. Local run (without Docker)

```bash
npm install
npm test
npm start
```

Browser: http://localhost:3000  
Health check: http://localhost:3000/health

## 2. Docker run

```bash
docker build -t ci-cd-task-manager:v1 .
docker run --name ci-cd-task-manager -p 3000:3000 -d ci-cd-task-manager:v1
```

Open http://localhost:3000. Check logs and health:

```bash
docker logs ci-cd-task-manager
docker inspect --format='{{.State.Health.Status}}' ci-cd-task-manager
```

Stop and remove the container:

```bash
docker stop ci-cd-task-manager
docker rm ci-cd-task-manager
```

## 3. Docker Compose deployment

```bash
docker compose up --build -d
docker compose ps
docker compose logs -f
```

Stop the application:

```bash
docker compose down
```

## 4. GitHub Actions CI

1. Push this project to a GitHub repository's `main` branch.
2. Open the repository on GitHub.
3. Select **Actions**.
4. Open **CI - Test and Build Docker Image**.
5. A green check means tests and Docker image build passed.

Workflow runs on every push to `main` and on pull requests targeting `main`.

## 5. Monitoring basics

- Application health: `http://localhost:3000/health`
- Container state: `docker compose ps`
- Application logs: `docker compose logs -f task-manager`
- Last 100 log lines: `docker compose logs --tail=100 task-manager`

## Environment management

The app reads `PORT` from the environment and defaults to `3000`. Compose sets the port mapping. Never commit passwords, API keys, or `.env` files. Add real secrets in GitHub repository **Settings → Secrets and variables → Actions** when a remote deployment target is configured.

## Important limitation

This starter automates **continuous integration** (tests + Docker build) on GitHub. Docker Compose provides a repeatable local deployment. To automate deployment to a remote server, choose a target (for example, an existing server or a cloud host) and configure its credentials securely. Do not add credentials to the repository.

## Hinglish explanation

- **CI:** Code push hote hi GitHub Actions code checkout, dependencies install, tests run aur Docker image build karta hai.
- **CD:** Docker Compose se same configuration ke through app start hoti hai. Remote server par automatic deployment next stage mein configure hoga.
- **Monitoring:** `/health` endpoint app ki health batata hai; Docker health check status track karta hai; logs se errors dekh sakte hain.
