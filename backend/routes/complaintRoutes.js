const express = require('express');
const router = express.Router();
const {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  getAllComplaints,
  updateComplaintStatus,
  assignComplaint,
  deleteComplaint,
} = require('../controllers/complaintController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Student & Common Routes
router
  .route('/')
  .post(protect, upload.single('image'), createComplaint)
  .get(protect, adminOnly, getAllComplaints);

router.get('/my', protect, getMyComplaints);
router.get('/:id', protect, getComplaintById);

// Admin Management Routes
router.put('/:id/status', protect, adminOnly, updateComplaintStatus);
router.put('/:id/assign', protect, adminOnly, assignComplaint);
router.delete('/:id', protect, adminOnly, deleteComplaint);

module.exports = router;
