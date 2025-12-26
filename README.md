# 🛒 SuppHub - Sports Nutrition E-commerce Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=google-chrome)](https://supphub.shop/)
![Python](https://img.shields.io/badge/python-3.13-blue?style=for-the-badge&logo=python)
![Django](https://img.shields.io/badge/django-4.0-green?style=for-the-badge&logo=django)
![React](https://img.shields.io/badge/react-18.0-blue?style=for-the-badge&logo=react)
![Docker](https://img.shields.io/badge/docker-compose-blue?style=for-the-badge&logo=docker)

**SuppHub** is a fully functional e-commerce platform developed for selling study nutrition products. The system currently serves real customers and features real-time inventory management and SMS verification.

🚀 **Live Demo:** [https://supphub.shop/](https://supphub.shop/)

---

## ✨ Key Features

* **🛡️ Security & Auth:** **SMS Verification** (OTP) for order confirmation to prevent fraud.
* **📦 Live Inventory:** Real-time stock tracking via PostgreSQL ensuring products are available.
* **🐳 Containerization:** Fully Dockerized application (Frontend, Backend, DB, Nginx) for easy deployment.

---

## 🛠 Tech Stack

* **Backend:** Python, Django, Django REST Framework (DRF)
* **Frontend:** React.js, TailwindCSS, TypeSctipt
* **Database:** PostgreSQL
* **Infrastructure:** Docker, Docker Compose, Nginx
* **External APIs:** SMS Gateway for OTP

---

## 🚀 Getting Started

Follow these steps to set up the project locally using Docker.

### 1. Prerequisites
Ensure you have the following installed:
* [Docker](https://docs.docker.com/get-docker/) & Docker Compose
* Make (optional, for easier commands)

### 2. Environment Setup

**Backend Configuration:**
Navigate to the backend directory and create the `.env` file:

    cd SuppHubBackend/supphub/
    cp .env.default .env

*Note: Fill in the `.env` file with your database credentials and API keys.*

**Frontend Configuration:**
Navigate to the frontend directory and create the `.env` file:

    cd ../../frontend/
    cp .env.default .env

### 3. Run Application

Build and start the services using `Make`:

    # Return to the root directory
    cd ..

    # Build Docker images
    make build

    # Start all services (Backend, Frontend, DB)
    make docker

If you don't have `make` installed, you can use standard Docker Compose commands:

    docker-compose up --build

### 4. Access the App

Once the containers are running, you can access the application:

* **Frontend:** http://localhost:3000
* **Backend API:** http://localhost:8000

---

## 🛑 Stop Application

To stop and remove containers:

    make docker-down

Or via docker-compose:

    docker-compose down