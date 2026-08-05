# Campus Complaint Management System (MERN Stack)

An industry-level, responsive, secure, and professional web application developed using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) for higher education institutions.

Students in colleges face various issues such as classroom problems, hostel issues, laboratory equipment problems, library complaints, transport issues, canteen complaints, internet issues, and other campus-related problems. This system automates issue reporting, real-time ticket tracking, and administrative dispatch workflows.

---

## 🌟 Key Modules & Features

### 🎓 Student Module
- **Registration & Authentication**: Secure registration with Student ID/Roll number and JWT-based authentication.
- **Dashboard**: Personal overview showing total, pending, in-progress, and resolved complaints alongside interactive analytics charts.
- **Submit Complaint**: Form supporting department selection, 12 complaint categories, priority classification, description, and optional photo evidence upload.
- **Track Status**: Live progress timeline tracking complaints from `Pending` → `Assigned` → `In Progress` → `Resolved` / `Rejected`.
- **Account Management**: Update student profile details and change passwords securely.

### 🛡️ Admin Module
- **Administrative Control Console**: Secure login dedicated to administrators.
- **Comprehensive Statistics**: Real-time counter metrics (Total Complaints, Pending, Resolved, In Progress, Critical Priority, Today's & Monthly counts, Total Students).
- **Interactive Data Management**: Search, filter by category/status/priority, sort, and paginate through all campus tickets.
- **Ticket Dispatch**: Assign complaints to specific department officers and update resolution statuses with official admin remarks.
- **Student Management**: View registered students list and delete inactive profiles.
- **Report Generation**: Export summary statistics and complaint data.

---

## 🛠️ Technology Stack

- **Frontend**: React.js, React Router v6, Axios, Lucide React Icons, Vanilla CSS Design System.
- **Backend**: Node.js, Express.js, MongoDB Atlas, Mongoose ODM.
- **Security**: JWT Authentication, bcryptjs password hashing, Helmet, CORS, Express Rate Limit, Mongo Injection Sanitization.
- **Development Tools**: VS Code, Git, GitHub, Postman, npm.

---

## 📁 Directory Overview

```
complaint-management-system/
├── backend/                   # Node.js + Express REST API
│   ├── config/                # Database configuration (db.js)
│   ├── controllers/           # Auth, Complaints, Admin, User, Dashboard & Report controllers
│   ├── middleware/            # JWT Auth, Role Guard, Error Handler & Multer file upload
│   ├── models/                # User, Complaint, Department & Notification models
│   ├── routes/                # Express API routes
│   ├── utils/                 # Token generator & database seeder
│   └── server.js              # Express app entry point
├── client/                    # Vite + React 18 SPA
│   ├── src/
│   │   ├── components/        # Navbar, Footer, Sidebar, StatCard, ChartView, ComplaintCard, Badges, Modals
│   │   ├── context/           # AuthContext & ToastContext
│   │   ├── hooks/             # Custom hooks (useAuth, useToast)
│   │   ├── pages/             # 13 Page views (Landing, About, Contact, Logins, Register, Dashboards, Form, History, Details, Profile, 404)
│   │   ├── services/          # Axios instance & request interceptors
│   │   └── styles/            # CSS Design System
│   ├── index.html
│   └── vite.config.js
└── docs/                      # Technical Documentation Suite
```

---

## 📖 Comprehensive Documentation Links

- 🛠️ [Installation & Setup Guide](file:///C:/Users/pardh/complaint-management-system/docs/INSTALLATION.md)
- 📂 [Folder Structure Explanation](file:///C:/Users/pardh/complaint-management-system/docs/FOLDER_STRUCTURE.md)
- 🔌 [API Documentation](file:///C:/Users/pardh/complaint-management-system/docs/API_DOCUMENTATION.md)
- 🏗️ [System Architecture & ER Diagram](file:///C:/Users/pardh/complaint-management-system/docs/SYSTEM_ARCHITECTURE.md)
- 🚀 [Deployment Guide (Vercel + Render + MongoDB Atlas)](file:///C:/Users/pardh/complaint-management-system/docs/DEPLOYMENT_GUIDE.md)
- 🧪 [Testing & Future Enhancements](file:///C:/Users/pardh/complaint-management-system/docs/TESTING_AND_FUTURE_WORK.md)

---

## 🚀 Quick Start Guide

### 1. Seed Demo Database Data
```bash
cd backend
npm run seed
```

### 2. Start Backend REST API
```bash
cd backend
npm run dev
# Server will start on http://localhost:5000
```

### 3. Start Frontend App
```bash
cd client
npm run dev
# Client will start on http://localhost:5173
```

### 🔑 Default Credentials for Testing
- **Admin**: `admin@campus.edu` / `adminPassword123`
- **Student**: `student@campus.edu` / `studentPassword123`
