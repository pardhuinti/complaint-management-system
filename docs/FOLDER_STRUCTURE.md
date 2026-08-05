# Folder Structure Explanation

The **Complaint Management System** uses a clean separation of concerns adhering to standard **MVC Architecture** for the backend REST API and **Component-Based Modular Architecture** for the React frontend.

---

## 📂 Overall Directory Map

```
complaint-management-system/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection setup
│   ├── controllers/
│   │   ├── adminController.js     # Student & department management
│   │   ├── authController.js      # Student & Admin registration/login
│   │   ├── complaintController.js # CRUD for complaints & ticket status
│   │   ├── dashboardController.js # Analytics & metrics aggregator
│   │   ├── reportController.js    # Data reporting & export generator
│   │   └── userController.js      # User profile & password updates
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT token guard & role restriction
│   │   ├── errorMiddleware.js     # 404 & centralized exception handler
│   │   └── uploadMiddleware.js    # Multer photo attachment handler
│   ├── models/
│   │   ├── Complaint.js           # Mongoose Complaint schema
│   │   ├── Department.js          # Mongoose Department schema
│   │   ├── Notification.js        # Mongoose Notification schema
│   │   └── User.js                # Mongoose User schema
│   ├── routes/
│   │   ├── adminRoutes.js         # Admin endpoints
│   │   ├── authRoutes.js          # Authentication endpoints
│   │   ├── complaintRoutes.js     # Ticket endpoints
│   │   ├── dashboardRoutes.js     # Dashboard stats endpoints
│   │   ├── reportRoutes.js        # Report endpoints
│   │   └── userRoutes.js          # Profile endpoints
│   ├── uploads/                   # Physical storage for photo evidence
│   ├── utils/
│   │   ├── generateToken.js       # JWT signing helper
│   │   └── seedData.js            # Initial mock database populator
│   ├── .env.example
│   ├── package.json
│   └── server.js                  # Main Express application entry point
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/                # Static image assets
│   │   ├── components/            # Reusable React UI components
│   │   │   ├── ChartView.jsx      # Bar & status chart graphs
│   │   │   ├── ComplaintCard.jsx  # Complaint ticket summary card
│   │   │   ├── Footer.jsx         # Global footer
│   │   │   ├── LoadingSpinner.jsx # Activity spinner
│   │   │   ├── Navbar.jsx         # Top sticky navigation bar
│   │   │   ├── Pagination.jsx     # Page controller
│   │   │   ├── PriorityBadge.jsx  # Priority badge component
│   │   │   ├── ProtectedAdminRoute.jsx   # Admin route guard
│   │   │   ├── ProtectedStudentRoute.jsx # Student route guard
│   │   │   ├── Sidebar.jsx        # Dashboard side navigation
│   │   │   ├── StatCard.jsx       # Metric counter card
│   │   │   └── StatusBadge.jsx    # Status badge component
│   │   ├── context/               # React Context state management
│   │   │   ├── AuthContext.jsx    # Authentication & user session state
│   │   │   └── ToastContext.jsx   # Toast notification state
│   │   ├── hooks/                 # Custom React hooks
│   │   │   ├── useAuth.js         # Auth consumer hook
│   │   │   └── useToast.js        # Toast notification consumer hook
│   │   ├── pages/                 # All 13 application views
│   │   │   ├── AboutPage.jsx
│   │   │   ├── AdminDashboardPage.jsx
│   │   │   ├── AdminLoginPage.jsx
│   │   │   ├── ComplaintDetailsPage.jsx
│   │   │   ├── ComplaintFormPage.jsx
│   │   │   ├── ComplaintHistoryPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── NotFoundPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── StudentDashboardPage.jsx
│   │   │   ├── StudentLoginPage.jsx
│   │   │   └── StudentRegisterPage.jsx
│   │   ├── services/
│   │   │   └── api.js             # Centralized Axios client
│   │   ├── styles/
│   │   │   └── index.css          # Vanilla CSS Design System
│   │   ├── App.jsx                # Main React router
│   │   └── main.jsx               # React DOM root entry
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── docs/                          # Technical documentation suite
```
