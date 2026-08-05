const Complaint = require('../models/Complaint');
const User = require('../models/User');

// @desc    Get dashboard metrics & statistical graphs data
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const isStudent = req.user.role === 'student';
    const filter = isStudent ? { student: req.user._id } : {};

    // 1. Total Counters
    const totalComplaints = await Complaint.countDocuments(filter);
    const pendingComplaints = await Complaint.countDocuments({ ...filter, status: 'Pending' });
    const inProgressComplaints = await Complaint.countDocuments({ ...filter, status: 'In Progress' });
    const assignedComplaints = await Complaint.countDocuments({ ...filter, status: 'Assigned' });
    const resolvedComplaints = await Complaint.countDocuments({ ...filter, status: 'Resolved' });
    const rejectedComplaints = await Complaint.countDocuments({ ...filter, status: 'Rejected' });
    const criticalComplaints = await Complaint.countDocuments({ ...filter, priority: 'Critical' });

    // 2. Today's & Monthly counts
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const todaysComplaints = await Complaint.countDocuments({
      ...filter,
      createdAt: { $gte: startOfToday },
    });

    const monthlyComplaints = await Complaint.countDocuments({
      ...filter,
      createdAt: { $gte: startOfMonth },
    });

    // 3. Category Breakdown (Pie Chart Data)
    const categoryStats = await Complaint.aggregate([
      { $match: filter },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // 4. Status Breakdown
    const statusStats = [
      { label: 'Pending', count: pendingComplaints },
      { label: 'In Progress', count: inProgressComplaints },
      { label: 'Assigned', count: assignedComplaints },
      { label: 'Resolved', count: resolvedComplaints },
      { label: 'Rejected', count: rejectedComplaints },
    ];

    // 5. Recent Complaints
    const recentComplaints = await Complaint.find(filter)
      .sort({ createdAt: -1 })
      .limit(5);

    // 6. Admin stats (if Admin)
    let totalStudents = 0;
    if (!isStudent) {
      totalStudents = await User.countDocuments({ role: 'student' });
    }

    res.json({
      success: true,
      data: {
        totalComplaints,
        pendingComplaints,
        inProgressComplaints,
        assignedComplaints,
        resolvedComplaints,
        rejectedComplaints,
        criticalComplaints,
        todaysComplaints,
        monthlyComplaints,
        totalStudents,
        categoryStats: categoryStats.map((item) => ({
          category: item._id,
          count: item.count,
        })),
        statusStats,
        recentComplaints,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDashboardStats,
};
