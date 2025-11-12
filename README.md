📚 BookVault — Your Personal Digital Library

        BookVault is a full-stack MERN web application that allows users to build a personal book collection, track reading progress, and explore new titles.
        Manage your wishlist, organize your reads, and discover your next favorite book — all in one elegant vault ✨

🧩 Tech Stack
| Layer	    | Technology                                                             |
| --------- | ---------------------------------------------------------------------- |
| Frontend  | React 19, Redux Toolkit, React Router v7, Framer Motion, Tailwind CSS  |
| Backend   | Node.js, Express.js, MongoDB, Mongoose                                 |
| Auth      | JWT-based Authentication                                               |
| Styling   | TailwindCSS + Gradient Themes                                          |
| Utilities | Axios, React-Hot-Toast, React-Hook-Form                                |


⚙️ Features

✅ User Registration & Login (JWT Auth)
✅ Explore and Search Books by Title/Author/Genre
✅ Add/Remove Books from Wishlist
✅ Mark Books as Read & Manage Library
✅ Dynamic Profile with Reading Stats
✅ Fully Responsive UI with Modern Gradients
✅ Smooth Animations using Framer Motion
✅ Toast Notifications for Actions
✅ Protected Routes (Library, Wishlist, Profile)

📁 Folder Structure Overview
BookVault/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Explore.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── 404.jsx
│   │   │   └── protected/
│   │   │       ├── Library.jsx
│   │   │       ├── Wishlist.jsx
│   │   │       └── Profile.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── BookCard.jsx
│   │   │
│   │   ├── context/AuthContext.jsx
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── slices/authSlice.js
│   │   │
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.html
│   │
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── controllers/
    │   ├── userController.js
    │   ├── bookController.js
    │   ├── wishlistController.js
    │   └── readController.js
    │
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── authOptional.js
    │
    ├── models/
    │   ├── books.js
    │   └── users.js
    │
    ├── routes/
    │   ├── userRoute.js
    │   ├── bookRoute.js
    │   ├── wishlistRoute.js
    │   └── readRoute.js
    │
    ├── utils/
    │   └── generateToken.js
    │
    ├── server.js
    └── package.json

🚀 Installation & Setup
🖥️ 1. Clone the repository
git clone https://github.com/Savi118/BookVault
cd bookvault

🧠 2. Backend Setup
cd backend
npm install


Create a .env file inside /backend:

PORT=3000
MONGO_URL=your_mongodb_connection_url
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173


Start the backend server:

npm start


The backend should now run at:
📡 http://localhost:3000

💻 3. Frontend Setup
cd ../frontend
npm install


Create a .env file inside /frontend:

VITE_API_BASE_URL=http://localhost:3000


Start the development server:

npm run dev


Frontend runs at:
🌐 http://localhost:5173

🔐 Authentication Flow

Users register with name, username, email, password

JWT Token issued upon login

Token stored in localStorage

Axios interceptors automatically include token in API requests

Protected routes verify token server-side

🧩 Key Components
| Component          | Purpose                                           |
| ------------------ | ------------------------------------------------- |
| Navbar.jsx         | Navigation with conditional login/logout links    |
| BookCard.jsx       | Displays book info + wishlist/read buttons        |
| Library.jsx        | Shows books marked as read                        |
| Wishlist.jsx       | Displays wishlist (auto-hides already read books) |
| Profile.jsx        | Displays user details, wishlist/read count        |
| ProtectedRoute.jsx | Restricts access to authenticated users           |

📚 API Endpoints
🔸 User Routes
| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/user/register | Register new user |
| POST   | /api/user/login    | Login user        |
🔸 Book Routes
| Method | Endpoint           | Description                    |
| ------ | ------------------ | ------------------------------ |
| GET    | /api/book/all      | Get all books (excluding read) |
| POST   | /api/book/         | Add new book (admin use)       |
🔸 Wishlist Routes
| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| GET    | /api/wishlist/get    | Fetch user wishlist  |
| POST   | /api/wishlist/add    | Add to wishlist      |
| POST   | /api/wishlist/remove | Remove from wishlist |
🔸 Read Routes
| Method | Endpoint                | Description        |
| ------ | ----------------------- | ------------------ |
| GET    | /api/read/get-read      | Get all read books |
| POST   | /api/read/mark-read     | Mark book as read  |
| POST   | /api/read/remove	Remove | from read list     |


🌈 UI Highlights

    Framer Motion animations for smooth transitions
    TailwindCSS gradient themes (purple-pink-cyan)
    Responsive layout for all devices
    Dynamic Toasts for user feedback
    Dark aesthetic for immersive reading vibe

🧑‍💻 Developer Info

    👨‍💻 Author: Saksham Viraj
    💌 Email: your@email.com

    🌍 Portfolio: https://portfolio-one-orpin-f3el83yyf6.vercel.app/
    🐙 GitHub: https://github.com/Savi118

“Building experiences that connect creativity and code ✨”

🧱 Future Improvements

    ✅ Google OAuth Login

    ✅ User Profile Avatar Upload

    ✅ Notes/Highlights for Each Book

    ✅ Admin Dashboard for Book Management

    ✅ Public Library/Community Collections

