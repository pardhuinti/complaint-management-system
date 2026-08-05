const Complaint = require('../models/Complaint');
const Notification = require('../models/Notification');

// @desc    Submit a new complaint
// @route   POST /api/complaints
// @access  Private (Student)
const createComplaint = async (req, res) => {
  try {
    const { department, category, title, description, priority } = req.body;

    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    }

    const complaint = new Complaint({
      student: req.user._id,
      studentName: req.user.name,
      studentEmail: req.user.email,
      department: department || req.user.department || 'General',
      category,
      title,
      description,
      priority: priority || 'Medium',
      status: 'Pending',
      imageUrl,
    });

    const createdComplaint = await complaint.save();

    // Create system notification
    await Notification.create({
      recipient: req.user._id,
      title: 'Complaint Registered',
      message: `Your complaint ${createdComplaint.complaintId} has been successfully logged.`,
      complaintId: createdComplaint.complaintId,
      type: 'system',
    });

    res.status(201).json({
      success: true,
      data: createdComplaint,
      message: 'Complaint submitted successfully!',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in student's complaints
// @route   GET /api/complaints/my
// @access  Private (Student)
const getMyComplaints = async (req, res) => {
  try {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = Number(req.query.pageSize) || 10;

    const count = await Complaint.countDocuments({ student: req.user._id });
    const complaints = await Complaint.find({ student: req.user._id })
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      success: true,
      data: complaints,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get complaint by ID or complaintId (e.g. CMP-10293)
// @route   GET /api/complaints/:id
// @access  Private
const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    let complaint;

    if (id.startsWith('CMP-')) {
      complaint = await Complaint.findOne({ complaintId: id }).populate(
        'student',
        'name email studentId department phone'
      );
    } else {
      complaint = await Complaint.findById(id).populate(
        'student',
        'name email studentId department phone'
      );
    }

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    // Check authorization: Admin can view all, Student can only view their own
    if (
      req.user.role !== 'admin' &&
      complaint.student._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to view this complaint',
      });
    }

    res.json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all complaints with Search, Filter & Pagination (Admin)
// @route   GET /api/complaints
// @access  Private (Admin)
const getAllComplaints = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;

    const { search, category, status, priority, department, sortBy } = req.query;

    let query = {};

    // Search keyword in title, description, complaintId, or studentName
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { complaintId: { $regex: search, $options: 'i' } },
        { studentName: { $regex: search, $options: 'i' } },
      ];
    }

    // Filters
    if (category) query.category = category;
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (department) query.department = department;

    // Sorting
    let sortOptions = { createdAt: -1 };
    if (sortBy === 'oldest') sortOptions = { createdAt: 1 };
    if (sortBy === 'priority') sortOptions = { priority: -1, createdAt: -1 };

    const count = await Complaint.countDocuments(query);
    const complaints = await Complaint.find(query)
      .sort(sortOptions)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      success: true,
      data: complaints,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update complaint status & remarks (Admin)
// @route   PUT /api/complaints/:id/status
// @access  Private (Admin)
const updateComplaintStatus = async (req, res) => {
  try {
    const { status, remarks, assignedTo } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    if (status) complaint.status = status;
    if (remarks !== undefined) complaint.remarks = remarks;
    if (assignedTo !== undefined) complaint.assignedTo = assignedTo;

    const updatedComplaint = await complaint.save();

    // Create notification for student
    await Notification.create({
      recipient: complaint.student,
      title: `Complaint Status Updated: ${complaint.status}`,
      message: `Your complaint ${complaint.complaintId} status has been updated to "${complaint.status}". Remarks: ${remarks || 'None'}`,
      complaintId: complaint.complaintId,
      type: 'status_update',
    });

    res.json({
      success: true,
      data: updatedComplaint,
      message: `Complaint status updated to ${complaint.status}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Assign complaint to department or staff member (Admin)
// @route   PUT /api/complaints/:id/assign
// @access  Private (Admin)
const assignComplaint = async (req, res) => {
  try {
    const { assignedTo, department } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    if (assignedTo) complaint.assignedTo = assignedTo;
    if (department) complaint.department = department;
    if (complaint.status === 'Pending') complaint.status = 'Assigned';

    const updatedComplaint = await complaint.save();

    await Notification.create({
      recipient: complaint.student,
      title: 'Complaint Assigned',
      message: `Your complaint ${complaint.complaintId} has been assigned to ${complaint.assignedTo}.`,
      complaintId: complaint.complaintId,
      type: 'assignment',
    });

    res.json({
      success: true,
      data: updatedComplaint,
      message: 'Complaint assigned successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete complaint (Admin)
// @route   DELETE /api/complaints/:id
// @access  Private (Admin)
const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    await Complaint.deleteOne({ _id: complaint._id });

    res.json({
      success: true,
      message: `Complaint ${complaint.complaintId} removed successfully`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  getAllComplaints,
  updateComplaintStatus,
  assignComplaint,
  deleteComplaint,
};
