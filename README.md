# Password Security Auditor

A full-stack web application that analyzes password strength and provides security recommendations.

## Live Demo

Frontend:
https://your-vercel-url.vercel.app

Backend API:
https://password-security-auditor-md3e.onrender.com

## Features

- Password strength analysis
- Password score calculation (0-100)
- Entropy calculation
- Password generator
- Password history tracking
- Common password detection
- Security recommendations
- REST API built with Spring Boot

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Java 17
- Spring Boot
- REST API

### Deployment
- GitHub
- Docker
- Render
- Vercel

## API Endpoint

### Analyze Password

```http
POST /api/analyze
```

Request:

```json
{
  "password": "MySecurePassword123!"
}
```

Response:

```json
{
  "score": 100,
  "strength": "Strong",
  "entropy": 84,
  "warnings": "None",
  "recommendations": "Password meets basic security requirements"
}
```

## Project Architecture

Frontend (Vercel)
      ↓
Spring Boot REST API (Render)
      ↓
Password Analysis Service

## Author

Joseph Jordan

GitHub:
https://github.com/jdjhalfamazing/password-security-auditor
