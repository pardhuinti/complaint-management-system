# Testing Guide & Future Enhancements Roadmap

---

## 🧪 Testing Guidelines

### 1. Manual End-to-End Test Plan

| Test ID | Module | Feature Tested | Input Data | Expected Result | Status |
|---|---|---|---|---|---|
| TC-01 | Auth | Student Registration | Full Name, Email, Password, Student ID | Account created, JWT returned | ✅ Pass |
| TC-02 | Auth | Duplicate Email Check | Existing registered email | Returns 400 Bad Request error | ✅ Pass |
| TC-03 | Auth | Admin Login Guard | Admin credentials | Access granted to Admin Dashboard | ✅ Pass |
| TC-04 | Complaint | Submit Complaint | Category, Priority, Description | Ticket created with CMP-XXXXX | ✅ Pass |
| TC-05 | Complaint | File Upload Limit | > 5MB image file | Toast error "File size must be < 5MB" | ✅ Pass |
| TC-06 | Admin | Update Ticket Status | Status set to "Resolved" + Remarks | Student notified, Status updated | ✅ Pass |
| TC-07 | Security | Unauthorized Access | Call `/api/admin/students` without JWT | 401 Unauthorized returned | ✅ Pass |

---

## 🚀 Future Roadmap & Enhancements

1. **Email / Push Notifications**: Integrate Nodemailer & SendGrid for automated email updates when ticket status changes.
2. **AI Categorization**: Leverage Machine Learning / NLP to automatically assign priority levels based on complaint description keywords.
3. **SMS Alert Gateway**: Send SMS text alerts to department officers for `Critical` severity complaints.
4. **Mobile Application**: Build a React Native mobile app sharing the same Express REST API backend.
5. **SLA Breach Warnings**: Automated escalations if a complaint remains `Pending` for > 48 hours without administrative assignment.
