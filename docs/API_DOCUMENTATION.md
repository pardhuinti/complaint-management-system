# API Documentation

This document outlines all RESTful API endpoints available in the **Complaint Management System** backend.

Base URL: `http://localhost:5000/api`

---

## 🔑 Authentication Endpoints

### 1. Register Student
- **Endpoint**: `POST /auth/register`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "student@campus.edu",
    "password": "studentPassword123",
    "studentId": "STU-2024-001",
    "department": "Computer Science & Engineering",
    "phone": "+1 555 012 3456"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "success": true,
    "data": {
      "_id": "65b...",
      "name": "John Doe",
      "email": "student@campus.edu",
      "role": "student",
      "token": "eyJhbGci..."
    },
    "message": "Registration successful!"
  }
  ```

### 2. Student Login
- **Endpoint**: `POST /auth/login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "student@campus.edu",
    "password": "studentPassword123"
  }
  ```

### 3. Admin Login
- **Endpoint**: `POST /auth/admin-login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "admin@campus.edu",
    "password": "adminPassword123"
  }
  ```

---

## 📝 Complaint Endpoints

### 1. Submit Complaint
- **Endpoint**: `POST /complaints`
- **Access**: Private (Student)
- **Content-Type**: `multipart/form-data`
- **Form Data**:
  - `department`: "IT Infrastructure & Wi-Fi"
  - `category`: "Wi-Fi"
  - `title`: "Wi-Fi disconnecting on 3rd floor"
  - `description`: "Frequent connection dropouts during study hours"
  - `priority`: "High"
  - `image`: *(File optional)*

### 2. View My Complaints
- **Endpoint**: `GET /complaints/my?pageNumber=1&pageSize=10`
- **Access**: Private (Student)

### 3. Get Complaint by ID
- **Endpoint**: `GET /complaints/:id` (Accepts Mongo `_id` or `CMP-XXXXX`)
- **Access**: Private (Student / Admin)

### 4. Admin: Get All Complaints
- **Endpoint**: `GET /complaints?search=wifi&category=Wi-Fi&status=Pending&priority=High&pageNumber=1`
- **Access**: Private (Admin)

### 5. Admin: Update Complaint Status & Remarks
- **Endpoint**: `PUT /complaints/:id/status`
- **Access**: Private (Admin)
- **Request Body**:
  ```json
  {
    "status": "In Progress",
    "remarks": "Assigned technician to inspect router on 3rd floor.",
    "assignedTo": "IT Support Team"
  }
  ```

### 6. Admin: Delete Complaint
- **Endpoint**: `DELETE /complaints/:id`
- **Access**: Private (Admin)

---

## 📊 Dashboard & Report Endpoints

### 1. Get Dashboard Statistics
- **Endpoint**: `GET /dashboard/stats`
- **Access**: Private (Student / Admin)

### 2. Generate Report Summary
- **Endpoint**: `GET /reports/summary`
- **Access**: Private (Admin)

---

## 👤 User & Admin Profile Endpoints

### 1. Update Profile
- **Endpoint**: `PUT /users/profile`
- **Access**: Private

### 2. Change Password
- **Endpoint**: `PUT /users/change-password`
- **Access**: Private
