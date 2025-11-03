# SuppHub Project
Run this project using Docker Compose.

## 1. Environment Setup
   Create Backend `.env` file: Create `.env` in `SuppHubBackend/supphub/`
    - Copy the default file:
    ```bash
    cd SuppHubBackend/supphub/
    cp .env.default .env
    ```
    Create Frontend `.env` file: Create `.env` in `frontend/`
    - Copy the default file:
    ```bash
    cd frontend/
    cp .env.default .env
    ```
## 2. Run Application
   - Ensure that you have installed docker on your machine
   - Build the images
    ```bash
    make build
    ```
    - Start all services
    ```bash
    make docker
    ```

## Access
- *Frontend:* `http://localhost:3000`
- *Backend API:* `http://localhost:8000`

## Stop Application
    ```bash
    make docker-down
    ```
