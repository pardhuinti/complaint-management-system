# System Architecture & Database ER Schema

This document presents the overall architectural overview, technology selections, data flow, and Entity-Relationship (ER) model for the **Campus Complaint Management System**.

---

## 🏗️ High-Level System Architecture

```
[ Client Browser (React SPA) ]
            │
            ▼ (HTTP / HTTPS JSON Requests over REST)
[ Express Security Layer: Helmet | CORS | Rate Limiter | Sanitize ]
            │
            ▼
[ Authentication Middleware: JWT Bearer Guard & Role Authorization ]
            │
            ▼
[ MVC Controllers: Auth | Complaint | Admin | Dashboard | Report ]
            │
            ▼ (Mongoose ODM Queries)
[ MongoDB Atlas Database ]  <───>  [ Local Disk Storage (/uploads) ]
```

---

## 🗄️ Entity-Relationship (ER) Schema

```
┌──────────────────────────────────────┐       1      N ┌──────────────────────────────────────┐
│                USERS                 │────────────────│              COMPLAINTS              │
├──────────────────────────────────────┤                ├──────────────────────────────────────┤
│ _id           : ObjectId (PK)        │                │ _id           : ObjectId (PK)        │
│ name          : String               │                │ complaintId   : String (Unique)      │
│ email         : String (Unique)      │                │ student       : ObjectId (FK -> User)│
│ password      : String (Hashed)      │                │ studentName   : String               │
│ role          : Enum [student, admin]│                │ studentEmail  : String               │
│ studentId     : String               │                │ department    : String               │
│ department    : String               │                │ category      : Enum [Classroom...]  │
│ phone         : String               │                │ title         : String               │
│ profileImage  : String               │                │ description   : String               │
│ createdAt     : Date                 │                │ priority      : Enum [Low,Med,High..]│
│ updatedAt     : Date                 │                │ status        : Enum [Pending...]    │
└──────────────────────────────────────┘                │ assignedTo    : String               │
                                                        │ remarks       : String               │
                                                        │ imageUrl      : String               │
                                                        │ createdAt     : Date                 │
                                                        │ updatedAt     : Date                 │
                                                        └──────────────────────────────────────┘

┌──────────────────────────────────────┐                ┌──────────────────────────────────────┐
│             DEPARTMENTS              │                │            NOTIFICATIONS             │
├──────────────────────────────────────┤                ├──────────────────────────────────────┤
│ _id           : ObjectId (PK)        │                │ _id           : ObjectId (PK)        │
│ name          : String (Unique)      │                │ recipient     : ObjectId (FK -> User)│
│ code          : String (Unique)      │                │ title         : String               │
│ headName      : String               │                │ message       : String               │
│ headEmail     : String               │                │ complaintId   : String               │
│ phone         : String               │                │ read          : Boolean              │
└──────────────────────────────────────┘                └──────────────────────────────────────┘
```

---

## ⚡ Technology Justification

1. **React.js & Vite**: Fast component rendering with virtual DOM diffing, instant Hot Module Replacement (HMR), and declarative state management via Context API.
2. **Express.js & Node.js**: Non-blocking asynchronous I/O event loop suitable for concurrent API requests.
3. **MongoDB & Mongoose**: Flexible document model allowing schema validation, fast JSON document storage, and easy aggregation pipelines for statistics.
4. **JWT & bcryptjs**: Stateless JWT token authentication eliminates server session overhead, while bcrypt salted key stretching protects against rainbow table attacks.
