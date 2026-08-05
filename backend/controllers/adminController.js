const User = require('../models/User');
const Department = require('../models/Department');
const Complaint = require('../models/Complaint');

// @desc    Get list of registered students
// @route   GET /api/admin/students
// @access  Private (Admin)
const getStudents = async (req, res) => {
  try {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const search = req.query.search || '';

    const query = {
      role: 'student',
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
      ],
    };

    const count = await User.countDocuments(query);
    const students = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      success: true,
      data: students,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete student account (Admin)
// @route   DELETE /api/admin/students/:id
// @access  Private (Admin)
const deleteStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student || student.role === 'admin') {
      return res.status(404).json({ success: false, message: 'Student account not found' });
    }

    await User.deleteOne({ _id: student._id });
    res.json({ success: true, message: 'Student account deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all departments
// @route   GET /api/admin/departments
// @access  Private
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({}).sort({ name: 1 });
    res.json({ success: true, data: departments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new department
// @route   POST /api/admin/departments
// @access  Private (Admin)
const createDepartment = async (req, res) => {
  try {
    const { name, code, headName, headEmail, phone, description } = req.body;

    const deptExists = await Department.findOne({
      $or: [{ name }, { code: code.toUpperCase() }],
    });

    if (deptExists) {
      return res.status(400).json({
        success: false,
        message: 'Department with this name or code already exists',
      });
    }

    const department = await Department.create({
      name,
      code,
      headName,
      headEmail,
      phone,
      description,
    });

    res.status(201).json({
      success: true,
      data: department,
      message: 'Department created successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getStudents,
  deleteStudent,
  getDepartments,
  createDepartment,
};
