# MERN Chat Application

This is a real-time chat application built using the MERN (MongoDB, Express, React, Node.js) stack. I created this project to renew my understanding of the tech stack and to learn more about WebSockets by implementing real-time features using **Socket.IO**.

## 🚀 Features
- **Real-Time Messaging**: Messages are instantly delivered without refreshing the page.
  <br>
  <img width="300" alt="Instant notification" src="https://github.com/user-attachments/assets/826a4b29-5920-4c42-9d0c-ff7a44d3b199" />
  
- **Real-Time Notifications**: Get instant notifications when new messages arrive.
  
- **Typing Indicator**: See when the other user is typing.
  <br>
  <img width="350" alt="Typing indicator" src="https://github.com/user-attachments/assets/6cf312a8-c922-4c03-9d32-df297973760f" />

  
- **Fully Responsive**: The application is designed to work seamlessly on all screen sizes.
  <br>
  <img width="250" alt="mobile view" src="https://github.com/user-attachments/assets/fbeeb910-6f01-419d-be0b-04ed6dbd4cde" />
  <img width="250" alt="mobile view" src="https://github.com/user-attachments/assets/9b54d238-d1f7-490b-83d4-366ed953b9bf" />
  
- **Secure Authentication**: Uses JWT-based authentication for user sessions.
  <br>
  <img width="250" src="https://github.com/user-attachments/assets/5c92621f-d7cd-4c36-9944-46ebd894bb66" alt="login page">

## 🏗️ Tech Stack
### **Frontend**
- **React with TypeScript**: Provides better type safety and maintainability.
- **Redux**: Used for state management.
- **Tailwind CSS**: Used for modern and responsive UI styling.

### **Backend**
- **Node.js & Express.js**: Handles API requests.
- **MongoDB & Mongoose**: Database and ORM for managing chat data.
- **Socket.IO**: Enables real-time communication between users.
- **JWT & Argon2**: Used for authentication and password hashing.

## 📂 Project Structure
```
chat-app/
│-- frontend/      # React (TypeScript) Frontend
│-- backend/       # Node.js + Express + MongoDB Backend
```

## 🛠️ Installation & Setup
### **Prerequisites**
Ensure you have the following installed:
- **[Node.js](https://nodejs.org/)** (v16+ recommended)
- **[MongoDB](https://www.mongodb.com/docs/manual/installation/)** (Ensure MongoDB is running locally or use MongoDB Atlas)
- **npm or yarn** (for package management)

### **Backend Setup**
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm run start
   ```

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend app:
   ```sh
   npm run start
   ```

The frontend will be accessible at **http://localhost:3000**, and the backend will run on **http://localhost:5000** (or your configured port).


## 🔗 References
- **Install Node.js**: https://nodejs.org/en/download
- **Install MongoDB**: https://www.mongodb.com/docs/manual/installation/
- **Express.js**: https://expressjs.com/
- **Mongoose**: https://mongoosejs.com/
- **Socket.IO**: https://socket.io/docs/v4/
- **Redux**: https://redux.js.org/
- **Tailwind CSS**: https://tailwindcss.com/docs

## 📜 License
This project is for learning purposes and is open for modification and improvements.

