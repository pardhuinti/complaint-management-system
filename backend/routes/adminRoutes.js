const express = require('express');
const router = express.Router();
const {
  getStudents,
  deleteStudent,
  getDepartments,
  createDepartment,
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/students', adminOnly, getStudents);
router.delete('/students/:id', adminOnly, deleteStudent);

router.get('/departments', getDepartments);
router.post('/departments', adminOnly, createDepartment);

module.exports = router;
