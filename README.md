# 📚 Book Review Platform - Backend

This is the **backend server** for the Book Review Platform built with **Node.js**, **Express.js**, and **MongoDB**. It handles user authentication, book management, and review APIs.

## 🌐 Live Project

Frontend: [https://bookechoes.onrender.com](https://bookechoes.onrender.com)  
Frontend Repo: [book_review_app](https://github.com/YogeeshInnovates/book_review_app)  
Backend Repo: [Book_Review_Platform](https://github.com/YogeeshInnovates/Book_Review_Platform)

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **CORS** and **Session Management**
- **bcryptjs** for password hashing
- **body-parser** for request parsing

---

## 📁 Project Structure

Book_Review_Platform/
│
├── models/
│ ├── Book.js
│ ├── Review.js
│ └── User.js
│
├
├── server.js # Main server entry
└── package.json


---

## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/YogeeshInnovates/Book_Review_Platform
   cd Book_Review_Platform
   
 2 .Install Dependencies

 npm install

 3.Start the Server
 npm start


The backend server will run at:
http://localhost:3000

🔐 Authentication
Session-based authentication using express-session. Secure cookies are used in production environments.

Routes:
POST /register – User registration

POST /login – User login

POST /logout – User logout

GET /check-auth – Check login status

📚 Book API
GET /books – Fetch all books

GET /books/:id – Fetch a book by ID

POST /books – Add a new book

📝 Review API
GET /reviews/:bookId – Get reviews for a book

POST /reviews – Add a new review

👤 User API
GET /users/:id – Get user profile

PUT /users/:id – Update user profile

🔐 CORS Configuration
The server is configured to accept requests only from:

http://localhost:5173 (Local frontend)

https://bookechoes.onrender.com (Production frontend)

✅ Features
Full user auth flow (register, login, logout)

Book list and detail API

Review system for each book

User profile management

Session handling with secure cookies

📦 Dependencies
express

mongoose

cors

bcryptjs

body-parser

express-session

📄 License
This project is open-source and available under the MIT License.
