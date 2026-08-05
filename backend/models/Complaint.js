const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      unique: true,
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    studentEmail: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
    },
    category: {
      type: String,
      required: [true, 'Complaint Category is required'],
      enum: [
        'Classroom',
        'Hostel',
        'Laboratory',
        'Library',
        'Transport',
        'Canteen',
        'Sports',
        'Wi-Fi',
        'Electricity',
        'Water Supply',
        'Cleanliness',
        'Others',
      ],
    },
    title: {
      type: String,
      required: [true, 'Complaint Title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Complaint Description is required'],
      minlength: [10, 'Description must be at least 10 characters'],
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Assigned', 'Resolved', 'Rejected'],
      default: 'Pending',
    },
    assignedTo: {
      type: String,
      default: 'Unassigned',
    },
    remarks: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Auto generate unique complaint ID prefix CMP-XXXXX prior to save if not provided
complaintSchema.pre('validate', function (next) {
  if (!this.complaintId) {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    this.complaintId = `CMP-${randomNum}`;
  }
  next();
});

module.exports = mongoose.model('Complaint', complaintSchema);
