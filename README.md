# 🚀 Automated CI/CD Pipeline using GitHub Actions, Jenkins, Docker & AWS

<p align="center">

<img width="1920" height="1020" alt="Screenshot 2026-07-15 120301" src="https://github.com/user-attachments/assets/33289092-c49a-4dc4-94d1-62fee5115025" />
<img width="1920" height="1020" alt="Screenshot 2026-07-15 120330" src="https://github.com/user-attachments/assets/cd63e9ee-ba9d-49ad-a7af-cde3c2f586e1" />
<img width="1920" height="1020" alt="Screenshot 2026-07-15 120358" src="https://github.com/user-attachments/assets/eb79f540-e1c2-4897-a09e-d93588d1d20e" />
<img width="1920" height="1020" alt="Screenshot 2026-07-15 120436" src="https://github.com/user-attachments/assets/85d243b7-e67c-4f0f-b485-d07328988b02" />
<img width="1920" height="1020" alt="Screenshot 2026-07-15 120547" src="https://github.com/user-attachments/assets/167720a8-db18-4f75-ad17-9aa5b1084c97" />
<img width="1920" height="1020" alt="Screenshot 2026-07-15 120728" src="https://github.com/user-attachments/assets/49e9da63-47c5-4a26-ba66-4eb75528d166" />
<img width="1920" height="1020" alt="Screenshot 2026-07-15 120823" src="https://github.com/user-attachments/assets/a98cb36d-8f15-4147-a729-6254248a7388" />


</p>

---

# 📌 Project Overview

This project demonstrates a **fully automated CI/CD pipeline** for a MERN Stack application using **GitHub Actions**, **Jenkins**, **Docker**, **Docker Hub**, and **AWS EC2**.

The pipeline automatically builds Docker images, pushes them to Docker Hub, and deploys the latest version of the application to an AWS EC2 instance using Jenkins and Docker Compose.

---

# 🏗️ Architecture

```text
                  Developer
                      │
                  Git Push
                      │
                      ▼
             GitHub Repository
                      │
                      ▼
           GitHub Actions (CI)
                      │
     Build Backend & Frontend Images
                      │
                      ▼
                 Docker Hub
                      │
                      ▼
                  Jenkins (CD)
                      │
          Pull Latest Docker Images
                      │
          Docker Compose Deployment
                      │
                      ▼
                 AWS EC2 Instance
                      │
                      ▼
              Live MERN Application
```

---

# 🔄 CI/CD Workflow

### ✅ Continuous Integration (GitHub Actions)

- Triggered automatically on every push to the `main` branch
- Checks out the latest source code
- Builds Docker image for Backend
- Builds Docker image for Frontend
- Pushes both images to Docker Hub

### ✅ Continuous Deployment (Jenkins)

- Pulls the latest code
- Creates the required environment variables
- Pulls the latest Docker images from Docker Hub
- Deploys the application using Docker Compose
- Verifies running containers

---

# 🛠️ Tech Stack

## Frontend
- React.js
- HTML5
- CSS3
- JavaScript

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas

## DevOps
- GitHub
- GitHub Actions
- Jenkins
- Docker
- Docker Compose
- Docker Hub
- AWS EC2
- Linux

---

# 📂 Project Structure

```text
WatchList-Tracker/
│
├── .github/
│   └── workflows/
│       └── docker.yml
│
├── client/
│   ├── src/
│   ├── public/
│   └── Dockerfile
│
├── scripts/
│   ├── deploy.sh
│   └── jenkins-deploy.sh
│
├── Dockerfile
├── docker-compose.yml
├── Jenkinsfile
├── package.json
└── README.md
```

---

# ✨ Features

- Fully Automated CI/CD Pipeline
- GitHub Actions Continuous Integration
- Jenkins Continuous Deployment
- Dockerized Backend
- Dockerized Frontend
- Docker Hub Image Registry
- AWS EC2 Deployment
- Docker Compose Orchestration
- MongoDB Atlas Integration
- Production-ready Deployment Workflow

---

# 🚀 Pipeline Stages

## GitHub Actions

- Checkout Source Code
- Docker Hub Login
- Build Backend Docker Image
- Push Backend Docker Image
- Build Frontend Docker Image
- Push Frontend Docker Image

## Jenkins

- Checkout Source Code
- Verify Docker Installation
- Create Environment File
- Pull Latest Docker Images
- Deploy Containers
- Verify Running Containers

---

# ☁️ AWS Deployment

The application is deployed on an **AWS EC2 Instance**.

Running Services:

- Frontend (Nginx)
- Backend (Node.js)
- MongoDB Atlas (Cloud Database)

---

# 🐳 Docker Hub Images

### Backend

```text
anshupriya4748/watchlist-tracker-backend
```

### Frontend

```text
anshupriya4748/watchlist-tracker-frontend
```

---

# 📸 Project Screenshots

## GitHub Repository

![GitHub Repository](screenshots/github.png)

---

## GitHub Actions

![GitHub Actions](screenshots/github-actions.png)

---

## Jenkins Dashboard

![Jenkins Dashboard](screenshots/jenkins-dashboard.png)

---

## Successful Jenkins Deployment

![Jenkins Success](screenshots/jenkins-success.png)

---

## Docker Hub Images

![Docker Hub](screenshots/dockerhub.png)

---

## AWS EC2 Instance

![AWS EC2](screenshots/ec2.png)

---

## Live Application

![Application](screenshots/application.png)

---

# 🚀 Running the Project

## Clone Repository

```bash
git clone git@github.com:anshupriya0510/WatchList-Tracker.git

cd WatchList-Tracker
```

## Start Application

```bash
docker compose up -d
```

Application:

```text
http://<EC2-PUBLIC-IP>
```

---

# 📈 Future Improvements

- Kubernetes Deployment
- Helm Charts
- ArgoCD GitOps
- Terraform Infrastructure as Code
- Prometheus Monitoring
- Grafana Dashboard
- SonarQube Quality Gate
- Nginx Reverse Proxy with SSL

---

# 🎯 Key Learning Outcomes

- CI/CD Pipeline Design
- GitHub Actions Automation
- Jenkins Pipeline Development
- Docker Image Creation
- Docker Hub Integration
- Docker Compose Orchestration
- AWS EC2 Deployment
- MongoDB Atlas Configuration
- Linux Server Administration
- Production Deployment Workflow
- Real-world DevOps Troubleshooting

---

# 📊 DevOps Workflow

```text
Developer
    │
    ▼
Git Push
    │
    ▼
GitHub Actions
    │
    ├── Build Backend Image
    ├── Build Frontend Image
    └── Push Images to Docker Hub
               │
               ▼
            Jenkins
               │
      Pull Latest Images
               │
     Docker Compose Up
               │
               ▼
           AWS EC2 Server
               │
               ▼
      Live MERN Application
```

---

# 👨‍💻 Author

**Anshu Priya**

### GitHub

https://github.com/anshupriya0510

### Docker Hub

https://hub.docker.com/u/anshupriya4748

### LinkedIn

*(Add your LinkedIn profile URL here.)*

---

# ⭐ If you like this project

If you found this project useful, consider giving it a ⭐ on GitHub!

Happy Coding! 🚀
