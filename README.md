# 💬 ChatGo — Real-Time Chat Application

ChatGo is a full-stack MERN (MongoDB, Express, React, Node.js) chat application with **real-time messaging**, **JWT-based authentication**, and **Cloudinary image uploads**.  
It features a responsive UI built with **Vite + React**, supports **user profiles with avatars**, and allows seamless communication through **Socket.IO**.

**Live Demo:** [https://chatgo-frontend.onrender.com](https://chatgo-frontend.onrender.com)

---

## 🚀 Features

- **🔐 User Authentication**
  - Sign up / Login using **JWT**
  - Password hashing with **bcrypt**
  - Secure cookie storage

- **💬 Real-Time Messaging**
  - Instant message delivery using **Socket.IO**
  - Online user tracking

- **🖼️ Profile Management**
  - Upload and update profile pictures via **Cloudinary**
  - Change display name

- **📱 Responsive UI**
  - Built with **React + Vite**
  - Mobile-friendly design

- **⚡ Tech Stack**
  - **Frontend:** React, Vite, Redux
  - **Backend:** Node.js, Express.js
  - **Database:** MongoDB (Mongoose ODM)
  - **Real-Time:** Socket.IO
  - **Image Hosting:** Cloudinary
  - **Authentication:** JWT + bcrypt

---

## 🛠️ Installation

### 1️⃣ Clone the repository
git clone https://github.com/your-username/chatgo.git
cd chatgo

### 2 Backend Setup
cd backend
npm install

### .env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

### Frontend Setup
cd frontend
npm install

npm run dev

📂 Project Structure
csharp
Copy code
chatgo/
│
├── backend/
│   ├── routes/         # API routes
│   ├── controllers/    # Business logic
│   ├── models/         # Mongoose models
│   ├── middlewares/    # Auth & upload handling
│   ├── socket/         # Socket.IO setup
│   └── config/         # DB & Cloudinary config
│
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page-level components
│   │   ├── redux/      # Redux store & slices
│   │   └── main.jsx    # App entry point
│   └── public/         # Static assets
