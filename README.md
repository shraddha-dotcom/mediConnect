
# MediConnect - Doctor Appointment App

MediConnect is a full-stack web application that simplifies the process of booking doctor appointments online. It bridges the gap between patients and healthcare providers by offering a seamless, real-time platform to search for doctors, view available time slots, and book appointments with just a few clicks.

Built using modern technologies like React, Tailwind CSS, Node.js, Express, and MongoDB, MediConnect offers features such as user authentication, role-based access (doctor/patient), doctor profile management, appointment booking, and reviews. It’s designed to enhance patient experience and streamline doctor scheduling.


## Table of Contents


Features

Tech Stack

Installation

Environment Variables

Folder Structure

API Endpoints

API Documentation (Swagger)

Deployment (Netlify + Backend Hosting)
## Features

👤 User Authentication – Signup/Login with secure password hashing using JWT and bcrypt

🏥 Role-Based Access – Separate dashboards and features for Doctors and Patients

📅 Appointment Booking – Real-time selection of doctors, dates, and available time slots

👨‍⚕️ Doctor Profile Management – Doctors can update qualifications, bio, schedule, and more

💬 Patient Reviews – Patients can rate and review doctors after appointments

🔍 Search & Filter – Easily find doctors by name, specialization, or availability

📊 Dashboard Overview – Summary view of profile, appointments, and reviews

🛡️ Protected Routes – Authorization for accessing protected user and doctor data

🧾 Swagger API Docs – Interactive API documentation for backend endpoints

☁️ Deployment Ready – Frontend deployed on Netlify, backend on Render/Railway


## Tech Stack
🔷 Frontend
React – Component-based UI

React Router DOM – Client-side routing

Redux & Redux Thunk – State management and async actions

Tailwind CSS – Utility-first styling

Framer Motion – Smooth UI animations

🟩 Backend
Node.js – Server runtime

Express.js – API framework

MongoDB – NoSQL database

Mongoose – ODM for MongoDB

JWT + Bcrypt – Authentication and password encryption

Swagger (OpenAPI 3.0) – API documentation

☁️ Deployment
Netlify – Frontend hosting

Render / Railway – Backend and MongoDB hosting
## Installation
Follow these steps to set up the project locally on your machine.

 Prerequisites
Node.js ≥ 14

npm or yarn

MongoDB (local or cloud like Atlas)

Git

1. Clone the Repository

```bash
 git clone https://github.com/yourusername/mediConnect.git
 cd mediConnect
```
2. Setup Backend
```bash
 cd server
 npm install
```
 Create a .env file in the /server directory and add:
```bash
 PORT=5000
 MONGO_URI=your_mongo_connection_string
 JWT_SECRET=your_jwt_secret
```
Start the backend server:
```bash
 npm run dev
```
3. Setup Frontend
```bash
 cd ../client
 npm install
```
Start the frontend:
```bash
 npm run dev
```
Now the app should be running:

Frontend: http://localhost:5173

Backend: http://localhost:5000/api
    
## Folder Structure
```bash
  mediConnect/
  │
  ├── client/                 # React frontend
  │   ├── public/             # Static files
  │   └── src/
  │       ├── assets/         # Images and icons
  │       ├── components/     # Reusable components (Header, Footer, etc.)
  │       ├── pages/          # Page components (Login, Signup, Dashboard, etc.)
  │       ├── routes/         # React Router route definitions
  │       ├── utils/          # Utility functions (e.g. time slot generator)
  │       └── App.jsx         # Main app component
  │
  ├── server/                 # Express backend
  │   ├── config/             # Database and config files
  │   ├── controllers/        # Route handler logic
  │   ├── middleware/         # Auth middleware, error handling
  │   ├── models/             # Mongoose schemas (User, Doctor, Booking, Review)
  │   ├── routes/             # Express route files
  │   ├── swagger/            # Swagger API documentation setup
  │   ├── .env                # Environment variables
  │   └── server.js           # Entry point
  │
  ├── README.md               # Project overview and documentation
  ├── .gitignore              # Files to ignore in git
  └── package.json            # Project metadata and scripts
```
## API Reference

#### Auth Routes

| Method | Endpoint    | Description                |
| :-------- | :------- | :------------------------- |
| Post | /auth/register | Register user or doctor |
| Post | /auth/login |	Login user or doctor |

#### User Routes
| Method | Endpoint    | Description                |
| :-------- | :------- | :------------------------- |
| GET | /users/profile/me | Get current user profile |
| PUT | /users/profile/me|	Update user profile |

#### Doctor Routes

| Method | Endpoint    | Description                |
| :-------- | :------- | :------------------------- |
| GET | /doctors | Get all approved doctors|
| PUT | /doctors/profile/me|Update logged-in doctor's profile |
| PUT | /doctors/profile/me|Get logged-in doctor profile |

#### Appointment Routes

| Method | Endpoint    | Description                |
| :-------- | :------- | :------------------------- |
| POST | /appointments | Book an appointment|
| GET | /appointments|Get latest booking by user |
| GET | /appointments/doctors|	Get all bookings for a doctor |

#### Review Routes

| Method | Endpoint    | Description                |
| :-------- | :------- | :------------------------- |
| POST | /reviews| Submit a doctor review|


## API Documentation (Swagger)
MediConnect uses Swagger (OpenAPI 3.0) to document and test the API.

Swagger Setup (Backend):

Make sure you've installed Swagger dependencies:

```bash
 npm install swagger-ui-express yamljs
```

Set up Swagger inside server.js or a dedicated swagger.js file:
```bash
 const swaggerUi = require('swagger-ui-express');
 const YAML = require('yamljs');
 const swaggerDocument = YAML.load('./swagger/swagger.yaml');

 app.use('/api/docs', swaggerUi.serve, swaggerUi.setup   (swaggerDocument));
```
Access Swagger Docs:
Once the backend is running, visit:
```bash
 (http://localhost:5000/api-docs/)
```


## Deployment (Netlify + Backend Hosting)

To deploy this project run

Frontend – Netlify
Push /client folder to GitHub

Go to Netlify, click “Add New Site” → “Import from Git”

Set build command:

```bash
  npm run build
```
Set publish directory:

```bash
  dist
```
Add Environment Variables:
    
     VITE_BASE_URL=https://your-backend-domain.com/api


Backend – Render/Railway
Push /server folder to GitHub

Create a new Web Service on Render or Railway

Set build command as:

```bash
  npm install
```

Set start command as:


```bash
 node server.js

```

Add Environment Variables:

     PORT=5000
     MONGO_URI=your-mongodb-url
     JWT_SECRET=your-secret

## Running Tests (Vitest)

To run tests, run the following command:

Install Vitest (if not already installed)

```bash
  cd client
  npm install -D vitest
```
Run Tests
```bash
  npm test run
```
