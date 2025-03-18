# AWS-3-TIER_ARCHITECTURE

# 🚀 AWS 3-Tier Architecture Deployment

## 📌 Overview
This project sets up a **secure, scalable AWS 3-tier architecture** using **Docker, AWS ECS, MySQL, Jenkins, Grafana, and CloudWatch**. It includes **CI/CD automation** with Jenkins and real-time monitoring with Grafana.

## 🔥 Architecture Diagram

![AWS 3-Tier Architecture](./architecture.png)

## 🏗️ AWS Resources Setup

### 🔹 **Networking: 8 Subnets Across 2 AZs**
- **Public Subnets:**
  - `Subnet 1`: Public **Application Load Balancer (ALB)`**
  - `Subnet 2`: **VPN Gateway** (Optional)
- **Private Subnets:**
  - `Subnet 3 & 4`: **Frontend (React+Nginx, Deployed on ECS)**
  - `Subnet 5 & 6`: **Backend (Node.js + Express, Deployed on ECS)**
  - `Subnet 7`: **MySQL Database (Hosted on EC2 Instance)**
  - `Subnet 8`: **Jenkins (CI/CD) & Grafana (Monitoring)**

## ⚙️ **Deployment & CI/CD Flow*

### 🔹 **Jenkins Setup**
- **Jenkins is deployed on a private subnet** and is only accessible via **VPN**.
- The pipeline is configured using **Pipeline Script from SCM**.
- SSH-based authentication is used:
  - **Public Key** is stored in **GitHub**.
  - **Private Key** is stored in **Jenkins** for authentication.

### 🔹 **Steps to Set Up CI/CD Pipeline**
1️⃣ **Create a new pipeline in Jenkins**
2️⃣ Select **Pipeline Script from SCM**
3️⃣ Choose **Git** as SCM and enter the repository URL
4️⃣ Select **SSH Credentials** (Stored private key in Jenkins)
5️⃣ Save and trigger the build

### 🔹 **Jenkins Pipeline (CI/CD Workflow)**
```plaintext
1️⃣ Developer pushes code → Private GitHub Repo
2️⃣ Jenkins via BUILD NOW → Pulls the latest code
3️⃣ Builds Docker Image → Pushes to AWS Elastic Container Registry (ECR)
4️⃣ Updates Task Definition → Deploys new version in ECS
```
#### **Jenkinsfile** (Sample Pipeline)
```groovy
pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', credentialsId: 'github-cred', url: 'https://github.com/user/repo.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('my-app:${BUILD_NUMBER}')
                }
            }
        }
        stage('Push to ECR') {
            steps {
                sh 'docker tag my-app:${BUILD_NUMBER} <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/my-app:${BUILD_NUMBER}'
                sh 'docker push <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/my-app:${BUILD_NUMBER}'
            }
        }
        stage('Update ECS Service') {
            steps {
                sh 'aws ecs update-service --cluster my-cluster --service my-service --force-new-deployment'
            }
        }
    }
}
```

## 📊 **Monitoring & Logging**

### 🔹 **Grafana Setup & Monitoring**
#### **Steps to Install Grafana**
1️⃣ **Update the local system packages:**
```bash
sudo apt update && sudo apt upgrade -y
```

2️⃣ **Add the Grafana repository and import the GPG key:**
```bash
sudo apt install -y software-properties-common
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
sudo wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
```

3️⃣ **Install Grafana using the package manager:**
```bash
sudo apt update && sudo apt install -y grafana
```

4️⃣ **Start and enable the Grafana service:**
```bash
sudo systemctl start grafana-server
sudo systemctl enable grafana-server
```

5️⃣ **Access Grafana via the browser on port 3000:**
```plaintext
http://<your-server-ip>:3000
```

6️⃣ **Login with default credentials:**
   - Username: `admin`
   - Password: `admin` (change it after first login)

7️⃣ **Integrate with CloudWatch to fetch ECS metrics.**

## 🔐 **Security Measures**
- **IAM Roles & Policies:** Restricted access to ECS, ECR, and S3.
- **Security Groups:** Allows only ALB-to-backend and backend-to-DB traffic.
- **Secrets Management:** AWS Secrets Manager for DB credentials.



<h1>MySQL CRUD - Nodejs, Reactjs</h1>


https://github.com/mushfiqurniazzz/Mysql-CRUD-Operations-With-Nodejs-And-Reactjs/assets/148959859/c0adf4d1-336c-4ee1-b28b-c5528eb481d0


<p>This app allows users to save users with name and email with specific id for everyone, featuring functionalities like create, read, update, delete. It uses MySQL as the database to store users, Express.js for handling server-side logic, React.js for building the user interface, and Node.js for server-side runtime environment. The app provides a seamless experience for users to save users and time.</p>

🚀 **Happy Deploying!** 🎯
