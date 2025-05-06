# Microservices Video Platform

## Overview

A modern, scalable video platform built using microservices architecture. This platform allows users to browse, upload, and watch videos with AI-powered features including personalized recommendations and an intelligent chatbot assistant.

## Architecture

This platform is built on a robust microservices architecture consisting of:

- **API Gateway**: Central entry point that routes requests to appropriate services
- **Auth Service**: Handles user authentication and authorization
- **Content Service**: Manages video metadata and content storage
- **Video Processing Service**: Processes uploaded videos for optimization
- **Recommendation Service**: AI-powered service for personalized video recommendations
- **AI Chatbot Service**: Intelligent assistant for user and admin support
- **Frontend**: Modern user interface built with Vue.js

## AI Features

### 1. Intelligent Video Recommendations

The recommendation service uses the Groq API and Llama 4 model to provide personalized video recommendations:

- Analyzes video titles to suggest similar content
- Generates contextually relevant recommendations
- Provides diverse content suggestions with appropriate thumbnails
- Fallback recommendations for edge cases

```javascript
// Example: Get recommendations based on video title
fetch('http://localhost:3000/recommendation/recommend?title=Microservices Architecture')
  .then(response => response.json())
  .then(data => console.log(data));
```

### 2. AI-Powered Chatbot Assistant

The platform includes an intelligent chatbot that:

- Provides personalized help based on user type (admin or regular user)
- Uses the Llama 4 Scout model via Groq for natural language understanding
- Helps users find content, understand features, and troubleshoot issues
- Assists admins with platform management and technical support

```javascript
// Example: Chat with the AI assistant
fetch('http://localhost:3000/chatbot/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userType: 'user',
    messages: [
      { role: 'user', content: 'How do I find videos about programming?' }
    ]
  })
})
.then(response => response.json())
.then(data => console.log(data.response));
```

## Tech Stack

- **Frontend**: Vue.js with TailwindCSS
- **Backend**: 
  - Node.js/Express (API Gateway, Auth, Content, Video Processing)
  - Python/Flask (Recommendation, AI Chatbot)
- **AI/ML**: 
  - Groq API with Llama 4 models
  - Custom recommendation algorithms
- **Containerization**: Docker & Docker Compose
- **Development**: Hot-reloading for all services

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) and Docker Compose
- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/microservices-video-platform.git
cd microservices-video-platform
```

2. **Set up environment variables**

Create a `.env` file in the project root with your API keys:

```
GROQ_API_KEY=your_groq_api_key
```

3. **Start the services**

```bash
cd docker
docker-compose up --build
```

4. **Verify the services**

All services should be running on their respective ports:
- API Gateway: http://localhost:3000
- Auth Service: http://localhost:5001
- Content Service: http://localhost:5002
- Video Processing Service: http://localhost:5003
- Recommendation Service: http://localhost:5004
- AI Chatbot Service: http://localhost:5005
- Frontend: http://localhost:5173

## API Endpoints

### API Gateway (port 3000)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/login` | POST | User authentication |
| `/auth/register` | POST | User registration |
| `/content/videos` | GET | Get video listings |
| `/content/videos/:id` | GET | Get video details |
| `/video-processing/process-video` | POST | Process a video |
| `/recommendation/recommend` | GET | Get video recommendations |
| `/chatbot/chat` | POST | Interact with AI assistant |

## 📂 Project Structure

```
├── api-gateway/           # API routing and service orchestration
├── backend/
│   ├── auth-service/      # User authentication & authorization
│   ├── content-service/   # Content management
│   ├── recommendation-service/ # AI-powered recommendations
│   ├── video-processing-service/ # Video processing
│   └── ai-chatbot-service/ # Intelligent assistant
├── frontend/              # Vue.js client application
├── docker/                # Docker configuration
└── README.md
```

## AI Implementation Details

### Recommendation Engine

The recommendation service uses the Llama 4 Scout model from Groq to generate contextually relevant video suggestions. It:

1. Takes a video title as input
2. Crafts a specialized prompt for the LLM
3. Formats the response as structured JSON with title, description, and URLs
4. Adds thumbnail images for each recommendation
5. Provides fallback recommendations if the LLM fails

### Chatbot Intelligence

The AI chatbot leverages:

1. Role-based system prompts (different for admins vs. users)
2. Message history for contextual understanding
3. Controlled temperature settings for consistent responses
4. Error handling with graceful fallbacks

## Development Workflow

### Running Individual Services

Each service can be run independently during development:

```bash
# API Gateway
cd api-gateway
npm install
npm run dev

# Recommendation Service
cd backend/recommendation-service
pip install -r requirements.txt
python api.py
```

### Adding New Features

1. Develop and test in the appropriate service
2. Update the API Gateway to route to new endpoints
3. Update the frontend to consume new APIs
4. Run integration tests with all services

## Security

- JWT-based authentication
- Environment variable management for API keys
- CORS protection
- Input validation on all endpoints

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Groq](https://groq.com/) for their powerful LLM API
- [Meta AI](https://ai.meta.com/) for the Llama models
- All the open-source libraries that made this project possible
