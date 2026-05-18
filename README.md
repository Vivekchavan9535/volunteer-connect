# Volunteer Connect

Volunteer Connect is a full-stack MERN application that helps manage volunteer registrations and administration workflows.

The platform allows volunteers to register their personal information, select preferred teaching locations, choose languages they speak, and specify their weekly availability. Admins can view, search, and filter volunteer submissions through a dashboard.

---

# Features

## Authentication

* JWT-based authentication
* Role-based access control
* Separate Admin and Volunteer access
* Protected routes

## Volunteer Features

* Multi-step registration form
* Persistent form state
* Location autocomplete using OpenStreetMap API
* Language selection
* Weekly availability selection
* Form validation
* Success and error handling

## Admin Features

* Dashboard to manage volunteers
* Search volunteers by location
* Filter by language and availability
* Responsive volunteer table
* Empty state handling
* Real-time search with debounce

## UI/UX

* Responsive Tailwind CSS design
* Mobile-friendly layouts
* Reusable components
* Loading states
* Success and error messages

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Vite

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

## Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

# Project Structure

```bash
Frontend/
 ┣ src/
 ┃ ┣ components/
 ┃ ┣ pages/
 ┃ ┣ config/
 ┃ ┗ App.jsx
 ┣ package.json
 ┗ .env

Backend/
 ┣ controllers/
 ┣ middleware/
 ┣ models/
 ┣ routes/
 ┣ config/
 ┣ app.js
 ┣ package.json
 ┗ .env
```

---

# Environment Variables

## Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Backend `.env`

```env
PORT=8080
DB_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Vivekchavan9535/volunteer-connect.git
```

---

# Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

# Backend Setup

```bash
cd Backend
npm install
npm start
```

---

# API Endpoints

## Auth Routes

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | `/api/auth/signup` | Register user |
| POST   | `/api/auth/login`  | Login user    |

## Volunteer Routes

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/volunteers`    | Create/Update volunteer |
| GET    | `/api/volunteers`    | Get all volunteers      |
| GET    | `/api/volunteers/me` | Get logged-in volunteer |

---

# Live Demo

## Frontend

[https://teachindia.vercel.app](https://teachindia.vercel.app)

## Backend

[https://volunteer-connect-9d3p.onrender.com](https://volunteer-connect-9d3p.onrender.com)

---

# Demo Credentials

## Admin

```txt
Email: admin@gmail.com
Password: admin123
```

## Volunteer

```txt
Email: volunteer@gmail.com
Password: volunteer123
```

---

# Deployment Notes

* Backend hosted on Render
* Frontend hosted on Vercel
* MongoDB Atlas used for database hosting
* Render free tier may take a few seconds to wake up after inactivity

---

# Future Improvements

* Dashboard analytics
* CSV export
* Volunteer profile page
* Pagination
* Advanced filtering
* Notification system
* Map integration
* Email verification

---

# Author

Vivek Chavan
