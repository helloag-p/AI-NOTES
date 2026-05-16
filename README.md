# Memex AI

### Turn chaos into clarity.

Memex AI is a full-stack AI-powered notes workspace built for the Peblo Full Stack Developer Challenge.

The platform helps users create, organize, summarize, search, and share notes using AI-powered workflows integrated with Google Gemini.

---

# Live Demo

Frontend:
https://ai-notes-2te8.vercel.app

Backend API:
https://ai-notes-tlnq.onrender.com

---

# Features

## Authentication

* User Signup & Login
* JWT-based Authentication
* Protected Routes
* Persistent Sessions

## Notes Workspace

* Create Notes
* Edit Notes
* Delete Notes
* Archive Notes
* Auto Save
* Tags Management
* Search & Sorting

## AI Integration

* AI-generated Summaries
* Action Item Extraction
* Suggested Titles
* Google Gemini API Integration

## Public Sharing

* Public Share Links
* Share Notes Without Login
* UUID-based Share URLs

## Productivity Dashboard

* Total Notes
* AI Usage Statistics
* Weekly Activity
* Recent Notes
* Most Used Tags

---

# Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* React Hot Toast

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs
* Google Gemini API

---

# Architecture Overview

## Frontend Architecture

The frontend is built using React with Vite for fast development and optimized production builds.

Key frontend features:

* Context API for state management
* Protected routes for authenticated pages
* Axios interceptors for token handling
* Responsive SaaS dashboard UI
* Dynamic routing with React Router

## Backend Architecture

The backend follows a REST API architecture using Express.js and MongoDB Atlas.

Key backend features:

* JWT authentication middleware
* Modular route/controller structure
* AI integration using Gemini API
* Public share routes
* Analytics aggregation APIs

---

# Project Structure

```bash
memex-ai/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── vercel.json
│   └── package.json
│
├── server/
│   ├── src/
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# Environment Variables

## Backend (.env)

Create a `.env` file inside the `server` folder:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

## Frontend (.env)

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=https://your-backend-url/api

VITE_FRONTEND_URL=https://your-frontend-url
```

---

# .env.example

## server/.env.example

```env
PORT=

MONGO_URI=

JWT_SECRET=

GEMINI_API_KEY=
```

## client/.env.example

```env
VITE_API_URL=

VITE_FRONTEND_URL=
```

---

# Installation & Setup

## Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

---

# Backend Setup

## Navigate to server

```bash
cd server
```

## Install dependencies

```bash
npm install
```

## Run backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

## Navigate to client

```bash
cd client
```

## Install dependencies

```bash
npm install
```

## Run frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Endpoints

## Authentication

```bash
POST /api/auth/signup
POST /api/auth/login
```

## Notes

```bash
GET /api/notes
POST /api/notes
PATCH /api/notes/:id
DELETE /api/notes/:id
POST /api/notes/:id/archive
```

## AI

```bash
POST /api/ai/:id/generate
```

## Sharing

```bash
POST /api/notes/:id/share
GET /api/notes/shared/:shareId
```

## Analytics

```bash
GET /api/analytics/dashboard
```

---

# AI Workflow

Memex AI integrates Google Gemini API to generate:

* AI Summaries
* Action Items
* Suggested Titles

The AI workflow analyzes note content and stores generated insights directly in MongoDB for persistence.

---

# Example API Responses

## Signup Response

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "6824c8f9f3d8d5a4f9a12345",
    "name": "Parv Agarwal",
    "email": "parv@gmail.com"
  }
}
```

---

## Create Note Response

```json
{
  "_id": "6824c8f9f3d8d5a4f9a12345",
  "title": "Project Meeting",
  "content": "Discussed dashboard UI and deployment.",
  "tags": ["react", "meeting"],
  "archived": false,
  "isPublic": false
}
```

---

## Analytics Response

```json
{
  "totalNotes": 12,
  "archivedNotes": 2,
  "aiGeneratedNotes": 8,
  "weeklyActivity": 5,
  "mostUsedTags": {
    "react": 4,
    "ai": 3
  }
}
```

---

# AI-generated Summary Example

## Input Note

```text
Today we discussed frontend dashboard implementation.

Rahul will design the sidebar.
Parv will complete authentication APIs.
Deployment should be completed by Friday.
```

## AI Output

```json
{
  "summary": "Discussion about frontend dashboard implementation and deployment planning.",
  "actionItems": [
    "Rahul to design sidebar",
    "Parv to complete authentication APIs",
    "Complete deployment by Friday"
  ],
  "suggestedTitle": "Frontend Dashboard Planning"
}
```

---

# Database Schema

## User Schema

```js
{
  name: String,
  email: String,
  password: String
}
```

## Note Schema

```js
{
  title: String,
  content: String,
  summary: String,
  actionItems: [String],
  tags: [String],
  archived: Boolean,
  isPublic: Boolean,
  shareId: String,
  user: ObjectId
}
```

---

# Sample Database Document

## Sample Note Document

```json
{
  "_id": "6824c8f9f3d8d5a4f9a12345",
  "title": "Frontend Dashboard Planning",
  "content": "Discussion about React dashboard and APIs.",
  "summary": "Discussion focused on frontend dashboard planning.",
  "actionItems": [
    "Build dashboard UI",
    "Integrate APIs"
  ],
  "tags": ["react", "frontend"],
  "archived": false,
  "isPublic": true,
  "shareId": "4e82fbe7-95f2-4d7e-a2f3-6d1f12345678"
}
```

---

# Screenshots

Add screenshots inside a `/screenshots` folder.

Recommended screenshots:

* Login Page
* Dashboard
* AI Summary Generation
* Analytics Dashboard
* Shared Public Note Page

Example:

```md
![Dashboard](./screenshots/dashboard.png)
```

---

# Deployment

## Frontend

Deployed using Vercel.

## Backend

Deployed using Render.

## Database

MongoDB Atlas

---

# Testing Instructions

## Test Authentication

* Signup
* Login
* Logout
* Protected Routes

## Test Notes Workflow

* Create Notes
* Edit Notes
* Delete Notes
* Archive Notes

## Test AI Features

* Generate AI Summary
* Suggested Titles
* Action Items

## Test Search & Filtering

* Search Notes
* Sort Latest/Oldest
* Tags

## Test Public Sharing

* Generate Public Link
* Open Shared Note in Incognito Mode

## Test Analytics

* Dashboard Insights
* Most Used Tags
* Recent Notes

---

# Future Improvements

* Realtime Collaboration
* Rich Text Editor
* Markdown Support
* Mobile Responsiveness
* AI Chat Assistant
* Notification System

---

# Screenshots

## Dashboard

![Dashboard](./screenshots/Screenshot%20(682).png)

---

## AI Summary

![AI Summary](./screenshots/Screenshot%20(683).png)

---

## Analytics Dashboard

![Analytics](./screenshots/Screenshot%20(684).png)

---

## Shared Public Note

![Shared Note](./screenshots/Screenshot%20(680).png)

## Login

![Login](./screenshots/Screenshot%20(681).png)

---

# Author

Parv Agarwal

GitHub:
https://github.com/helloag-p

LinkedIn:
https://linkedin.com/in/parv-agarwal-09b042215
