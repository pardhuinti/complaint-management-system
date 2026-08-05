# Installation & Local Setup Guide

This document details the step-by-step installation instructions to run the **Complaint Management System** on a local development machine.

---

## 📋 Prerequisites

Ensure you have the following installed on your operating system:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Local MongoDB instance (v6+) or a **MongoDB Atlas** connection string
- **Git**: For source version control
- **VS Code**: Recommended IDE

---

## 🛠️ Step 1: Clone or Open Project Workspace

Navigate to the project root directory:
```bash
cd C:\Users\pardh\complaint-management-system
```

---

## ⚙️ Step 2: Backend Setup

1. Open terminal in the `backend/` directory:
   ```bash
   cd backend
   ```

2. Install Node.js backend dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Ensure `.env` contains valid credentials:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/complaint_management_system
   JWT_SECRET=super_secret_jwt_key_complaint_management_2026
   JWT_EXPIRE=30d
   CLIENT_URL=http://localhost:5173
   ```

4. Seed Initial Database Records:
   ```bash
   npm run seed
   ```

5. Launch Backend Server:
   ```bash
   npm run dev
   ```
   *The server should output: `Server running in development mode on port 5000` & `MongoDB Connected`.*

---

## 💻 Step 3: Frontend Setup

1. Open a second terminal in the `client/` directory:
   ```bash
   cd client
   ```

2. Install React frontend dependencies:
   ```bash
   npm install
   ```

3. Launch Vite Development Server:
   ```bash
   npm run dev
   ```
   *The application will open on `http://localhost:5173`.*

---

## 🧪 Step 4: Verification

1. Visit `http://localhost:5173` in your browser.
2. Click **Student Login** and test with:
   - Email: `student@campus.edu`
   - Password: `studentPassword123`
3. Log out and click **Admin Access** to test admin console:
   - Email: `admin@campus.edu`
   - Password: `adminPassword123`
