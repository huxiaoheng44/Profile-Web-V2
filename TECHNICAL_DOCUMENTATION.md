# Profile-Web-V2 Technical Documentation

## 1. Project Overview

Profile-Web-V2 is a full-stack personal portfolio and interactive message board website. It is more than a static resume page: the project combines personal branding, project showcases, PDF-based project documentation, video demos, animated interactions, Google login, MongoDB-backed messages and comments, and product analytics.

Live website:

```text
https://huxiaoheng.com
```

The repository is organized into two main applications:

- `react-front/`: React frontend application for routing, UI rendering, animations, portfolio pages, PDF viewing, video playback, and message board interaction.
- `server/`: Node.js and Express backend for REST APIs, Google authentication, message/comment persistence, and MongoDB integration.

The main goal of the project is to present a developer profile through a real product-like web application. It demonstrates frontend engineering, backend API design, database integration, authentication, deployment, and interaction design in one coherent system.

## 2. Key Features

### 2.1 Immersive Portfolio Homepage

The homepage uses a dark visual style, animated role labels, Lottie animations, and a project carousel to create a strong first impression.

Main characteristics:

- Dynamic role switching, including `FRONTEND`, `BACKEND`, `DEVOPS`, `FULLSTACK`, `LLM`, `CHATBOT`, `WEB`, and `PLUGIN`.
- Lottie animations for visual motion and page rhythm.
- Swiper-based project carousel with autoplay, pagination, and navigation.
- Direct navigation from a project cover to a specific project tab through query parameters, such as `/projects?tab=2`.
- Scroll-driven horizontal storytelling for the life journey section.
- Back-to-top behavior after long scrolling.

This makes the homepage feel closer to an interactive digital profile than a conventional static portfolio.

### 2.2 Rich Project Showcase

The project page uses Ant Design Tabs to organize multiple portfolio items. Each project can include PDF documentation and video demos.

Current project sections include:

- 3D Reconstruction
- Drone Simulator
- FAST AI Movie
- Vehicle Identification
- Innocoso Management System
- TUM DI-Lab & Reply

Technical highlights:

- `react-pdf` is used to render local PDF project documents.
- A dedicated PDF worker is served from the public directory for stable PDF loading.
- The PDF reader dynamically calculates page dimensions based on the browser window size.
- Users can navigate PDF pages with previous and next controls.
- HTML5 video playback is used for project demos.
- PostHog events track project tab views and clicks.

Instead of only showing screenshots, the portfolio gives visitors access to more complete project material.

### 2.3 Physics-Based Hobby Interaction

The About page includes an interactive hobby section built with Matter.js. It contains physical objects such as a basketball, ping-pong ball, racket, table, and hoop.

Implementation details:

- `Matter.Engine` creates the physics engine.
- `Matter.Render` renders the scene with a transparent background.
- `Bodies.circle`, `Bodies.rectangle`, and `Bodies.fromVertices` define objects.
- Image textures are used for basketball, racket, table, and hoop assets.
- `MouseConstraint` allows users to drag objects.
- Out-of-bound objects are automatically reset so the interaction remains reusable.

This section turns personal hobbies into a small interactive scene, making the About page more memorable and technically distinctive.

### 2.4 Custom Blend Cursor

The frontend implements a custom cursor component named `BlendeCursor`. It follows the mouse position and uses CSS `mix-blend-difference` to visually invert against the dark background.

Cursor behavior:

- Tracks mouse movement and updates position in real time.
- Enlarges when hovering over clickable elements.
- Shrinks on mouse down and returns on mouse up.
- Displays short contextual messages when needed, such as `Please log in first.`

The cursor is connected to global UI state through `UserContext`, so other components can trigger cursor messages.

### 2.5 Message Board and Comment System

The Contact page provides a real backend-connected message board. Users can log in with Google, leave messages, and comment on existing messages.

Main capabilities:

- Fetch all messages with `GET /api/messages`.
- Create a message with `POST /api/message`.
- Fetch comments for a message with `GET /api/comments/:parentId`.
- Create a comment with `POST /api/comment`.
- Support anonymous message posting.
- Show login prompts through animation and cursor feedback.
- Generate local avatar images for comments.

The backend stores data in MongoDB when the database is connected. If MongoDB is unavailable, the API falls back to in-memory arrays, which makes local development easier.

### 2.6 Google Login Integration

The frontend uses Google Identity Services to load the login script and sends the returned ID token to the backend.

Login flow:

1. The frontend loads `https://accounts.google.com/gsi/client`.
2. The user signs in through the Google login button.
3. The frontend receives a `credential`.
4. The frontend sends the credential to `POST /api/login`.
5. The backend verifies the ID token with `google-auth-library`.
6. The backend extracts `sub`, `name`, `email`, `locale`, and `picture`.
7. The backend creates or updates the user in MongoDB.
8. The frontend stores user information in `sessionStorage`.

The user model enforces uniqueness on `googleid`, ensuring each Google account maps to one application user.

### 2.7 Product Analytics

The project integrates PostHog to track page visits and user behavior.

Tracked behavior includes:

- SPA page views.
- Primary navigation clicks.
- Project tab views.
- Project tab clicks.

Analytics are initialized only when `REACT_APP_POSTHOG_KEY` is available. This keeps local development simple when analytics credentials are not configured.

## 3. Technology Stack

### 3.1 Frontend

| Technology | Purpose |
| --- | --- |
| React 18 | SPA and component architecture |
| React Router v6 | Client-side routing |
| Tailwind CSS | Utility-first styling and layout |
| Ant Design | Tabs, Timeline, and UI components |
| Lottie React | JSON animation rendering |
| Matter.js | Physics-based interaction |
| React PDF / PDF.js | PDF document rendering |
| Swiper | Project carousel |
| React Icons | Icon rendering |
| PostHog | Product analytics |

### 3.2 Backend

| Technology | Purpose |
| --- | --- |
| Node.js | Backend runtime |
| Express | REST API framework |
| Mongoose | MongoDB object modeling |
| MongoDB | Message, comment, and user storage |
| google-auth-library | Google ID token verification |
| cors | Cross-origin configuration |
| dotenv | Environment variable loading |
| express-validator | Request validation dependency |

### 3.3 Deployment

| Technology | Purpose |
| --- | --- |
| Docker | Backend containerization |
| Nginx | Static file serving and API reverse proxy |
| gh-pages | Static frontend deployment support |
| Google Cloud | Server hosting environment |

## 4. System Architecture

The project follows a frontend-backend separation model. The React frontend handles user interaction, while the Express backend exposes REST APIs and communicates with MongoDB.

```text
Browser
  |
  | Static frontend assets
  v
React Frontend
  |
  | /api/messages
  | /api/message
  | /api/comments/:parentId
  | /api/comment
  | /api/login
  v
Express Backend
  |
  | Mongoose
  v
MongoDB
```

In production, Nginx can serve as the single public entry point:

```text
Browser
  |
  v
Nginx
  |-- React build static files
  |
  |-- /api/* -> Express Backend -> MongoDB
```

In local development, the frontend runs on `http://localhost:3000` and the backend runs on `http://localhost:8000`.

## 5. Project Structure

```text
Profile-Web-V2/
├── README.md
├── TECHNICAL_DOCUMENTATION.md
├── react-front/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── public/
│   │   ├── resources/
│   │   │   ├── cover/       # project cover images
│   │   │   ├── pdf/         # project PDF documents
│   │   │   ├── videos/      # project video demos
│   │   │   ├── education/   # life journey images
│   │   │   ├── hobby/       # physics interaction textures
│   │   │   └── contact/     # contact QR codes
│   │   ├── comment-avatar/  # local comment avatars
│   │   └── pdf.worker.min.js
│   └── src/
│       ├── App.js
│       ├── UserContext.js
│       ├── animation/       # Lottie animation JSON files
│       ├── components/      # reusable UI components
│       ├── config/          # frontend configuration
│       ├── pages/           # page components
│       └── utils/           # animation and analytics utilities
└── server/
    ├── server.js
    ├── api.js
    ├── auth.js
    ├── Dockerfile
    └── models/
        ├── user.js
        ├── message.js
        └── comment.js
```

## 6. Frontend Modules

### 6.1 App.js

`App.js` is the main frontend application component.

Responsibilities:

- Wrap the app with `UserProvider`.
- Initialize analytics through `AnalyticsProvider`.
- Render the global `Navigation`.
- Render the custom `BlendeCursor`.
- Define routes for `/home`, `/about`, `/projects`, `/contact`, `/`, and fallback 404 pages.

### 6.2 UserContext.js

`UserContext` is the global frontend state layer.

It manages:

- `userId`
- `userName`
- `userAvatar`
- `shouldBlink`
- `cursorMessage`

It also syncs user information with `sessionStorage`, allowing the frontend to recover session state after page refresh.

### 6.3 Home Page

`Home.js` is the visual entry point of the website.

Core implementation:

- Uses Lottie for animated arrows and astronaut animation.
- Uses `setInterval` to rotate developer role labels.
- Uses Swiper to display project covers.
- Uses scroll listeners to drive horizontal journey movement.
- Shows a back-to-top button after deep scrolling.

### 6.4 About Page

`AboutMe.js` presents the profile, experience timeline, and hobby interaction.

Core implementation:

- Uses Ant Design `Timeline` for education and work history.
- Uses React Icons to visually distinguish experience types.
- Uses `LightUp` for the spotlight-style profile section.
- Uses `Hobby` for the Matter.js physics scene.

### 6.5 Projects Page

`ProjectPage.js` displays detailed project material.

Core implementation:

- Uses Ant Design `Tabs` for project switching.
- Stores the selected project tab in URL query parameters.
- Uses `PDFReader` for project PDF documents.
- Uses HTML5 `video` for demo playback.
- Sends PostHog events for project views and clicks.

### 6.6 Contact Page

`MessageBoard.js` powers the message board.

Core implementation:

- Fetches messages from `/api/messages` on page load.
- Uses `WelcomeCard` for login and message creation.
- Uses `MessageCard` for individual messages and comments.
- Uses `PersonalSocialMediaCard` for contact links.

## 7. Backend Modules

### 7.1 server.js

`server.js` is the backend entry point.

Responsibilities:

- Load environment variables.
- Connect to MongoDB.
- Configure JSON body parsing.
- Configure CORS allowed origins.
- Mount the `/api` router.
- Provide centralized error handling.
- Start the Express server on `PORT`, defaulting to `8000`.

### 7.2 api.js

`api.js` defines the main REST API routes.

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/test` | Test server and database status |
| GET | `/api/messages` | Fetch all messages |
| POST | `/api/message` | Create a message |
| GET | `/api/comments/:parentId` | Fetch comments for a message |
| POST | `/api/comment` | Create a comment |
| POST | `/api/login` | Google login |

The module includes a development-friendly fallback. When MongoDB is not connected, messages and comments are stored in in-memory arrays.

### 7.3 auth.js

`auth.js` handles Google login verification.

Main logic:

- Check whether `GOOGLE_CLIENT_ID` is configured.
- Check whether MongoDB is connected.
- Validate that `tokenId` is present.
- Verify the ID token through Google OAuth2Client.
- Find the user by Google `sub`.
- Update an existing user or create a new user.

### 7.4 Data Models

#### User

Stores Google login user information:

```text
name
googleid
email
locale
picture
createdAt
updatedAt
```

`googleid` is unique. `email` is also unique and uses a sparse index.

#### Message

Stores message board posts:

```text
messageId
author
content
date
```

#### Comment

Stores comments under messages:

```text
parentId
author
content
date
```

`parentId` links a comment to a message's `messageId`.

## 8. Environment Variables

### 8.1 Backend

Create `server/.env`:

```env
PORT=8000
MONGODB_URL=mongodb://127.0.0.1:27017
MONGODB_DATABASE=xiaoheng-web
GOOGLE_CLIENT_ID=your-google-client-id
ALLOWED_ORIGINS=http://localhost:3000
```

| Variable | Description |
| --- | --- |
| `PORT` | Express server port |
| `MONGODB_URL` | MongoDB connection URL |
| `MONGODB_DATABASE` | MongoDB database name |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `ALLOWED_ORIGINS` | Allowed frontend origins, comma-separated |

### 8.2 Frontend

Create `react-front/.env` if needed:

```env
REACT_APP_BASE_URL=http://localhost:8000
REACT_APP_POSTHOG_KEY=your-posthog-key
REACT_APP_POSTHOG_HOST=https://us.i.posthog.com
```

| Variable | Description |
| --- | --- |
| `REACT_APP_BASE_URL` | Backend API base URL |
| `REACT_APP_POSTHOG_KEY` | PostHog project key |
| `REACT_APP_POSTHOG_HOST` | PostHog host |

If `REACT_APP_BASE_URL` is not provided, the frontend uses `http://localhost:8000` in development and same-origin requests in production.

## 9. Local Development

### 9.1 Start MongoDB

Using Docker:

```bash
docker run -d --name profile-v2-mongo -p 27017:27017 mongo:7
```

### 9.2 Start the Backend

```bash
cd server
npm install
npm start
```

Backend URL:

```text
http://localhost:8000
```

Health check:

```text
http://localhost:8000/api/test
```

### 9.3 Start the Frontend

```bash
cd react-front
npm install
npm start
```

Frontend URL:

```text
http://localhost:3000
```

## 10. Build and Deployment

### 10.1 Frontend Build

```bash
cd react-front
npm run build
```

The current build script disables the ESLint plugin and source maps:

```json
"build": "DISABLE_ESLINT_PLUGIN=true GENERATE_SOURCEMAP=false react-scripts build"
```

This can reduce production artifact size and avoid ESLint blocking production builds.

### 10.2 Backend Dockerization

The backend includes a Dockerfile:

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]
```

One thing to note: the Express server defaults to port `8000`, while the Dockerfile currently exposes port `3000`. If Docker port exposure is used in production, the Dockerfile should expose the same port as the backend runtime, or the runtime port should be configured explicitly.

### 10.3 Suggested Nginx Reverse Proxy

A production deployment can use Nginx to serve the frontend build and proxy API requests:

```nginx
server {
    listen 80;
    server_name huxiaoheng.com;

    root /var/www/profile-web-v2/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 11. API Reference

### 11.1 Get Messages

```http
GET /api/messages
```

Returns all messages sorted by date.

### 11.2 Create Message

```http
POST /api/message
Content-Type: application/json
```

Request body:

```json
{
  "messageId": "1710000000000",
  "author": "Xiaoheng",
  "content": "Hello world",
  "date": "2026-07-06T12:00:00.000Z"
}
```

The backend validates `content`. Empty content returns `400`.

### 11.3 Get Comments

```http
GET /api/comments/:parentId
```

Returns comments for a message, sorted by date.

### 11.4 Create Comment

```http
POST /api/comment
Content-Type: application/json
```

Request body:

```json
{
  "parentId": "1710000000000",
  "author": "Anonymous",
  "content": "Nice project",
  "date": "2026-07-06T12:00:00.000Z"
}
```

The backend validates both `parentId` and `content`.

### 11.5 Google Login

```http
POST /api/login
Content-Type: application/json
```

Request body:

```json
{
  "tokenId": "google-id-token"
}
```

Returns user information after successful verification.

## 12. Data Flow

### 12.1 Message Creation

```text
User logs in
  |
  v
User writes a message in WelcomeCard
  |
  v
POST /api/message
  |
  v
Express validates content
  |
  v
MongoDB stores Message
  |
  v
Frontend inserts returned message into state
```

### 12.2 Comment Creation

```text
User writes a comment in MessageCard
  |
  v
Frontend checks userId
  |
  |-- Not logged in: trigger login animation and cursor message
  |
  |-- Logged in: POST /api/comment
          |
          v
       Express validates parentId and content
          |
          v
       MongoDB stores Comment
          |
          v
       Frontend updates comments state
```

### 12.3 Project Analytics

```text
User enters /projects
  |
  v
ProjectPage reads tab query parameter
  |
  v
activeKey is updated
  |
  v
trackEvent("project_subtab_view")
  |
  v
PostHog receives the event
```

## 13. Engineering Highlights

This project is valuable because it combines multiple real engineering concerns into one personal web product:

- Complete React SPA routing and component structure.
- Rich media support with PDF documents, videos, images, and Lottie animations.
- Physics-based interaction through Matter.js.
- Backend REST APIs with MongoDB persistence.
- Development fallback behavior when MongoDB is unavailable.
- Google OAuth login and user persistence.
- PostHog analytics for product behavior tracking.
- Clear separation between frontend assets, reusable components, pages, backend routes, and data models.
- Deployment awareness through Docker, Nginx, and environment-based configuration.

From a technical portfolio perspective, it demonstrates:

- React frontend development.
- Interactive UI and animation design.
- Node.js REST API design.
- MongoDB schema modeling.
- Third-party authentication integration.
- Frontend-backend deployment architecture.
- Product analytics thinking.

## 14. Future Improvements

Recommended future improvements:

- Add stricter length limits and content validation for messages and comments.
- Move the frontend Google Client ID from hardcoded markup to environment variables.
- Add centralized request validation middleware in the backend.
- Add pagination for messages and comments.
- Add an admin dashboard for managing content.
- Add backend automated tests for login, message, and comment APIs.
- Align the Dockerfile exposed port with the actual Express runtime port.
- Add CI/CD for automated build, test, and deployment.
- Improve mobile layouts for large headings, the PDF reader, and the physics interaction section.
- Add server-side logging and monitoring for request latency and errors.

## 15. Conclusion

Profile-Web-V2 is both a personal portfolio and a small full-stack product. It uses React to create an immersive frontend experience, Express and MongoDB to support real user interaction, Google login for authentication, and PostHog for behavioral analytics. Compared with a traditional personal homepage, it better demonstrates practical engineering ability across frontend interaction, backend API design, data persistence, authentication, deployment, and product thinking.
