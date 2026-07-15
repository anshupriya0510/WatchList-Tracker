# 🚀 Automated CI/CD Pipeline using GitHub Actions, Jenkins, Docker & AWS

<p align="center">

![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI-blue?style=for-the-badge&logo=githubactions)
![Jenkins](https://img.shields.io/badge/Jenkins-CD-red?style=for-the-badge&logo=jenkins)
![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED?style=for-the-badge&logo=docker)
![Docker Hub](https://img.shields.io/badge/Docker_Hub-Registry-2496ED?style=for-the-badge&logo=docker)
![AWS EC2](https://img.shields.io/badge/AWS-EC2-FF9900?style=for-the-badge&logo=amazonaws)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)

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

<img width="1920" height="1020" alt="Screenshot 2026-07-15 120301" src="https://github.com/user-attachments/assets/d1207a20-82b5-419f-a68f-175172a9c2d4" />


---

## GitHub Actions

<img width="1920" height="1020" alt="Screenshot 2026-07-15 120330" src="https://github.com/user-attachments/assets/86d01bba-9da0-4d92-a955-f86969f60594" />


---

## Jenkins Dashboard

<img width="1920" height="1020" alt="Screenshot 2026-07-15 120358" src="https://github.com/user-attachments/assets/25c4f05d-8c22-4ebc-81cf-cec9be05978a" />


---

## Successful Jenkins Deployment

<img width="1920" height="1020" alt="Screenshot 2026-07-15 120436" src="https://github.com/user-attachments/assets/bc4e85f7-8c48-4865-a3aa-fda0007e0df3" />


---

## Docker Hub Images

<img width="1920" height="1020" alt="Screenshot 2026-07-15 120547" src="https://github.com/user-attachments/assets/4ea440a8-ab50-41d7-b883-86f03e5589a7" />


---

## AWS EC2 Instance

<img width="1920" height="879" alt="Screenshot 2026-07-15 120728" src="https://github.com/user-attachments/assets/21e75b3e-bcae-4a5a-abca-a0ca44de4009" />


---

## Live Application

<img width="1920" height="1020" alt="Screenshot 2026-07-15 120823" src="https://github.com/user-attachments/assets/2d35a5b4-13b6-4c72-9919-e7605e087679" />


---

# 🚀 Running the Project

## Clone Repository

```bash
git clone git@github.com:anshupriya0510/WatchList-Tracker.git

cd WatchList-Tracker
```


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


# ⭐ If you like this project

If you found this project useful, consider giving it a ⭐ on GitHub!

Happy Coding! 🚀
