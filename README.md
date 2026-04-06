# Profile-Web-V2

A personal portfolio and message board website built with React, Express, MongoDB, and Nginx.

The live website is available at `https://huxiaoheng.com`.

## Overview

This project is my personal website, used to present my profile, project experience, and an interactive message board where visitors can leave messages and comments.

The application includes:
- A React-based frontend portfolio site
- An Express backend API
- MongoDB for storing messages, comments, and user data
- Google login integration
- Nginx reverse proxy for production deployment

## Why I Built This

I built this project as my personal portfolio website to combine self-presentation with interactive communication.

Instead of using a static portfolio template, I wanted a full-stack application that reflects my engineering skills in frontend development, backend API design, database integration, and production deployment.

## Features

- Personal profile and experience pages
- Project showcase
- Message board with comments
- Google account login
- MongoDB-backed data storage
- Production deployment with Nginx reverse proxy

## Tech Stack

Frontend:
- React
- React Router
- Tailwind CSS
- Ant Design

Backend:
- Node.js
- Express
- Mongoose

Database:
- MongoDB

Deployment:
- Nginx
- Docker

## Project Structure

```bash
Profile-Web-V2/
├── react-front/   # frontend
└── server/        # backend
```

## Local Development

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Profile-Web-V2
```

### 2. Start MongoDB

If using Docker:

```bash
docker run -d --name profile-v2-mongo -p 27017:27017 mongo:7
```

### 3. Configure backend environment

Create `server/.env`:

```env
PORT=8000
MONGODB_URL=mongodb://127.0.0.1:27017
MONGODB_DATABASE=xiaoheng-web
GOOGLE_CLIENT_ID=your-google-client-id
ALLOWED_ORIGINS=http://localhost:3000
```

### 4. Start backend

```bash
cd server
npm install
npm start
```

### 5. Start frontend

```bash
cd react-front
npm install
npm start
```

Frontend:
- `http://localhost:3000`

Backend:
- `http://localhost:8000`

## Production Setup

In production:
- Nginx serves the frontend static build
- Nginx proxies `/api` requests to the Express backend
- MongoDB stores application data

Production flow:

```text
Browser -> Nginx -> React static files
Browser -> /api -> Nginx reverse proxy -> Express -> MongoDB
```

## API Endpoints

- `GET /api/test`
- `GET /api/messages`
- `POST /api/message`
- `GET /api/comments/:parentId`
- `POST /api/comment`
- `POST /api/login`

## Notes

- In development, the frontend connects to `http://localhost:8000`
- In production, the frontend uses same-origin `/api`
- Google OAuth requires correct authorized origins in Google Cloud Console
- The deployed website can be accessed at `https://huxiaoheng.com`

## Future Improvements

- Better admin or content management support
- Stronger validation and error handling
- CI/CD pipeline improvements
- Automated deployment workflow

## License

This project is for personal portfolio use.
