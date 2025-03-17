# Microservices Video Platform

## Overview

This project is a microservices-based video platform that consists of multiple services including:

- **API Gateway** (Handles API requests and routes them to appropriate services)
- **Auth Service** (Handles authentication and authorization)
- **Content Service** (Manages video and content metadata)
- **Recommendation Service** (Provides video recommendations)
- **Video Processing Service** (Handles video encoding and processing)
- **Frontend** (User interface built with Vue.js)

## Tech Stack

- **Backend:** Node.js, Express, Flask (Python)
- **Frontend:** Vue.js
- **Database:** PostgreSQL / MongoDB
- **Containerization:** Docker, Docker Compose

---

## 🚀 Getting Started

### Prerequisites

- Install [Docker](https://www.docker.com/get-started)
- Install [Node.js](https://nodejs.org/)
- Install [Vue CLI](https://cli.vuejs.org/)

### Cloning the Repository

```bash
git clone https://github.com/your-repo/microservices-video-platform.git
cd microservices-video-platform
```

---

## 📦 Running the Project

### Step 1: Start Docker Services

Run the following command to start all microservices:

```bash
docker-compose up --build
```

### Step 2: Test Individual Services

Check if services are running correctly:

```bash
curl -X GET http://localhost:3000/   # API Gateway
curl -X GET http://localhost:5004/   # Recommendation Service
curl -X GET http://localhost:5002/   # Content Service
curl -X GET http://localhost:5000/auth   # Auth Service
```

### Step 3: Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at [http://localhost:5173](http://localhost:5173).

---

## 📂 Folder Structure

```
├── api-gateway
│   ├── config/
│   ├── middleware/
│   ├── routes/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── backend
│   ├── auth-service/
│   ├── content-service/
│   ├── recommendation-service/
│   ├── video-processing-service/
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   └── vite.config.js
│
└── README.md
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature-name`)
5. Open a Pull Request

---

## 🛠 Troubleshooting

### API Gateway Crashes?

Check the logs with:

```bash
docker logs docker-api-gateway-1
```

Make sure all services are running before starting the frontend.

### Database Connection Issues?

Check if your `.env` file is correctly configured with the database credentials.

---

## 📜 License

This project is licensed under the MIT License.
