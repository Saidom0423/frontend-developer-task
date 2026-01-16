# Frontend Developer Internship Task

## Overview
A scalable web application with authentication and a protected dashboard.
Built as part of the Frontend Developer Intern assignment.

## Tech Stack
- React (Vite)
- TailwindCSS
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication

## Features
- User Registration & Login
- JWT-based Authentication
- Protected Dashboard
- Task CRUD Operations
- Search & Filter
- Logout Flow

## Security
- Passwords hashed using bcrypt
- JWT authentication middleware
- Protected API routes

## Scalability Notes
- Modular frontend and backend structure
- Independent deployment of frontend and backend
- Easily extendable to role-based access and refresh tokens
- Can be containerized using Docker for scaling

## Setup Instructions
### Backend
```bash
cd backend
npm install
npm run dev
