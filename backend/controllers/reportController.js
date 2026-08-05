const Complaint = require('../models/Complaint');

// @desc    Generate printable / exportable Complaint Report summary
// @route   GET /api/reports/summary
// @access  Private (Admin)
const getReportSummary = async (req, res) => {
  try {
    const { startDate, endDate, category, status, department } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (department) filter.department = department;

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });

    const total = complaints.length;
    const resolved = complaints.filter((c) => c.status === 'Resolved').length;
    const pending = complaints.filter((c) => c.status === 'Pending').length;
    const inProgress = complaints.filter((c) => c.status === 'In Progress').length;
    const rejected = complaints.filter((c) => c.status === 'Rejected').length;

    const resolutionRate = total > 0 ? ((resolved / total) * 100).toFixed(1) : 0;

    res.json({
      success: true,
      data: {
        summary: {
          totalComplaints: total,
          resolved,
          pending,
          inProgress,
          rejected,
          resolutionRate: `${resolutionRate}%`,
          generatedAt: new Date(),
        },
        complaints,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getReportSummary,
};
