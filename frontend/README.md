# microservice-frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

Awesome! 🙌  
Here's a clean **`README.md`** draft that you can directly use for your GitHub repository!

I'll match it exactly to what we have built till now — professional, clean, and production-ready:

---

# 📺 Microservices Video Platform

A **Dockerized Microservices-based Video Platform** that allows Admins to upload videos and Users to watch them, built using:

- Vue3 + TailwindCSS (Frontend)
- Node.js + Express (API Gateway & Backend)
- Firebase Storage (Video Files) + Firestore (Metadata)
- Docker (Containerization)

---

## 🚀 Project Structure

```plaintext
frontend/               # Vue3 app (Admin and User Views)
api-gateway/             # Node.js API Gateway (routes/proxies requests)
backend/
  ├── auth-service/      # Auth microservice (basic setup)
  ├── content-service/   # Video Upload/Fetch microservice
  ├── recommendation-service/ # (Dummy Recommendation API)
  ├── video-processing-service/ # (Future Video Processing Setup)
docker-compose.yml       # Compose file to spin up all services
```

---

## 🏛️ System Architecture

```plaintext
Frontend (Vue3)
    ↓
API Gateway (Node.js)
    ↓
+-------------------------------+
|   Microservices               |
|   ├── Auth Service             |
|   ├── Content Service          |
|   ├── Recommendation Service   |
|   └── Video Processing Service |
+-------------------------------+
    ↓
Firebase Storage & Firestore
```

---

## 📦 Features

- 🚀 Admin Dashboard to upload videos
- 📥 Upload video files to **Firebase Storage**
- 📝 Save video metadata to **Firestore**
- 📺 User Dashboard to watch uploaded videos
- 🔗 API Gateway with dynamic routing to microservices
- 🐳 Fully Dockerized setup

---

## 🔥 How it Works

### Admin Upload Flow:

1. Admin selects a video + title and uploads.
2. Video file is uploaded to **Firebase Storage**.
3. Metadata (`title`, `downloadUrl`, `uploadedBy`) is saved to **Firestore** via Content Service.

### User Watch Flow:

1. User accesses the `/user` page.
2. All videos are fetched from **Content Service**.
3. Videos are dynamically rendered and played.

---

## 📋 Microservices Ports

| Service                  | Port |
| :----------------------- | :--- |
| Frontend (Vite)          | 5173 |
| API Gateway (Express)    | 3000 |
| Auth Service             | 5001 |
| Content Service          | 5002 |
| Video Processing Service | 5003 |
| Recommendation Service   | 5004 |

---

## ⚙️ Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/your-username/microservices-video-platform.git
cd microservices-video-platform
```

2. Create Firebase Project & enable:

   - Firebase Storage
   - Firestore Database

3. Create `firebase-service-account.json` under `backend/content-service/src/`  
   (Add your service account key here.)

4. Setup environment variables:

   - `frontend/.env`
   - `api-gateway/.env`
   - Microservices (if required)

5. Start all services:

```bash
navigate to the docker directory and then run the following command
> docker-compose down && docker-compose up --build
> docker-compose up --build
```

---

## 🛠️ Tech Stack

- **Frontend**: Vue3, TailwindCSS
- **API Gateway**: Node.js, Express
- **Backend Microservices**: Node.js (Content, Auth, Video Processing), Python Flask (Recommendation)
- **Storage**: Firebase Storage (videos), Firestore (metadata)
- **Infrastructure**: Docker, Docker Compose

---

## 📈 Current Known Issues

- Uploading large video files through API Gateway proxying still needs to be **streamed properly** (`multipart/form-data` proxy limitation).
- Basic AuthService and VideoProcessingService are placeholders for future expansions.

---

## 🧠 Future Enhancements

- Implement Authentication using **JWT Tokens** (Auth Service)
- Add Recommendation Engine (based on watch history)
- Enable Video Transcoding (with **FFmpeg**) in Video Processing Service
- Optimize video playback via streaming

---

## ✨ Final Demo Preview

| Admin Upload         | User Watch                    |
| :------------------- | :---------------------------- |
| Upload videos easily | Watch uploaded videos anytime |

---

# 📜 License

This project is licensed under the [MIT License](LICENSE).

---

> Made with ❤️ by Fullstack Engineers | Microservices x Firebase x Docker

---

# ✅ Status

> Phase 1: Completed 🚀  
> Phase 2 (Streaming Proxy + Recommendations): Coming Soon! 🛠️
