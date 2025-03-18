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

---

Updated README.md

# 📺 Microservices Video Platform

## 📌 Project Overview

This project is a **scalable video platform** built using a microservices architecture. It enables users to authenticate, process videos, receive recommendations, and manage content efficiently.

## 🛠 Tech Stack

- **Frontend**: Vue.js / React (with Axios for API calls)
- **Backend**: Node.js (Express), Python (Flask)
- **Database**: MongoDB / PostgreSQL
- **API Gateway**: Express.js with Axios for routing
- **Containerization**: Docker & Docker Compose
- **Deployment**: Nginx, AWS / GCP

## 🏛 Architecture Overview

The system consists of multiple microservices:

1. **API Gateway** - Centralized routing to backend services.
2. **Auth Service** - Handles user authentication and sessions.
3. **Content Service** - Manages video content storage.
4. **Video Processing Service** - Processes uploaded videos.
5. **Recommendation Service** - Provides video recommendations.
6. **Frontend** - User interface for accessing video content.

---

## 🏗 Setup & Installation

### 1️⃣ **Clone the Repository**

```bash
git clone https://github.com/fullstuffdeveloper/microservices-video-platform.git
cd microservices-video-platform
```

### 2️⃣ **Start the Services (Docker)**

```bash
docker-compose up --build
```

### 3️⃣ **Verify Services**

```bash
curl -X GET http://localhost:3000  # API Gateway
curl -X GET http://localhost:5001  # Auth Service
curl -X GET http://localhost:5002  # Content Service
curl -X GET http://localhost:5003  # Video Processing Service
curl -X GET http://localhost:5004  # Recommendation Service
```

---

## 📌 Microservices & API Endpoints

| Service                    | Port | Endpoint            | Description                      |
| -------------------------- | ---- | ------------------- | -------------------------------- |
| **API Gateway**            | 3000 | `/auth`             | Routes to Auth Service           |
|                            |      | `/recommendation`   | Routes to Recommendation Service |
| **Auth Service**           | 5001 | `/auth/login`       | User authentication API          |
| **Content Service**        | 5002 | `/content`          | Video content management API     |
| **Video Processing**       | 5003 | `/video-processing` | Video processing API             |
| **Recommendation Service** | 5004 | `/recommend`        | Fetches recommended videos       |

---

## 🎨 **Frontend Integration**

- **Axios Setup** in `frontend/src/api.js`:

```javascript
import axios from "axios";
const api = axios.create({ baseURL: "http://localhost:3000" });
export default api;
```

- **Example API Call**:

```javascript
api.get("/auth/login").then((response) => console.log(response.data));
```

---

## 🗄 **Database Integration**

- **MongoDB** is used for storing user data & video metadata.
- **PostgreSQL** is used for structured data like analytics.
- **Environment Variables** (`.env` file):

```env
MONGO_URI=mongodb://localhost:27017/video-platform
POSTGRES_URI=postgres://user:password@localhost:5432/video_db
```

---

## 🚀 **Deployment Strategy**

### 1️⃣ **Containerize with Docker**

```bash
docker build -t video-platform .
docker run -p 3000:3000 video-platform
```

### 2️⃣ **Deploy to AWS / GCP**

- Use **EC2 / Cloud Run** for deployment.
- Setup **Nginx** as a reverse proxy.

---

## 🛠 **Contributing Guidelines**

1. **Fork the repository** & clone it locally.
2. **Follow branch naming** (`feature/auth-improvement`).
3. **Run tests before PR submission**.
4. **Code should follow ESLint & Prettier rules**.

---

## 🔄 **Project Flow for Developers**

- **Frontend** calls API Gateway (Axios requests).
- **API Gateway** routes request to the correct microservice.
- **Microservices** handle the request and respond.
- **Database** stores data for auth, video, and recommendations.
- **Deployment** ensures system availability on cloud.

---

### 🎯 **Next Steps**

- ✅ **Implement CI/CD pipeline** (GitHub Actions)
- ✅ **Enhance security** (JWT authentication)
- ✅ **Implement caching** (Redis for recommendation service)

---

**📌 Happy Coding! 🚀**
