# Fullstack Chatbot Application

A full-stack chatbot application built with Node.js/Express backend and React/TypeScript frontend. Features chat sessions, message management, and a modern UI with theme support.

## 🏗️ Architecture

This project consists of two main components:

- **Backend**: Node.js Express API server with session and chat management
- **Frontend**: React application with TypeScript, Vite, and Tailwind CSS

## 🚀 Features

- 💬 Real-time chat interface
- 📝 Session management
- 🎨 Dark/Light theme support
- 📱 Responsive design
- 🔧 RESTful API
- ⚡ Fast development with Vite
- 🎯 TypeScript for type safety

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript (ES Modules)
- **Dependencies**:
  - `cors` - Cross-origin resource sharing
  - `dotenv` - Environment variable management
  - `express` - Web framework
  - `nodemon` - Development auto-restart
  - `uuid` - Unique identifier generation

### Frontend
- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Notifications**: React Toastify

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Task
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## 🚀 Running the Application

### Development Mode

1. **Start the Backend** (Terminal 1):
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:5500`

2. **Start the Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
Task/
├── README.md
├── backend/
│   ├── package.json
│   ├── README.md
│   ├── public/
│   │   └── data/
│   │       ├── chats.json
│   │       └── sessions.json
│   └── src/
│       ├── app.js
│       ├── index.js
│       ├── controllers/
│       │   ├── chat.mjs
│       │   └── session.mjs
│       ├── middleware/
│       │   └── errorHandler.js
│       ├── routes/
│       │   ├── chat.js
│       │   ├── index.js
│       │   └── session.js
│       └── utils/
│           ├── ApiError.js
│           ├── ApiResponse.js
│           ├── asyncHandler.js
│           └── exportFunction.js
└── frontend/
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── README.md
    ├── tailwind.config.js
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── public/
    └── src/
        ├── App.tsx
        ├── index.css
        ├── main.tsx
        ├── assets/
        ├── components/
        │   ├── ChatWindow.tsx
        │   ├── MessageTable.tsx
        │   └── Sidebar.tsx
        ├── contexts/
        │   └── ThemeContext.tsx
        ├── page/
        │   └── Chatbot.tsx
        ├── services/
        │   ├── ApiServices.ts
        │   ├── chatApi.ts
        │   └── SessionApi.ts
        └── types/
            └── index.ts
```

## 🔌 API Endpoints

The backend provides RESTful API endpoints under `/api`:

- **Sessions**: Manage chat sessions
- **Chats**: Handle chat messages

Base URL: `http://localhost:5500/api/`

## 🎨 Theme Support

The application includes a theme context that supports:
- Light mode
- Dark mode
- Theme persistence

## 📱 Responsive Design

Built with Tailwind CSS for mobile-first responsive design.
