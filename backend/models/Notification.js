const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    complaintId: {
      type: String,
      default: '',
    },
    read: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ['status_update', 'assignment', 'system', 'general'],
      default: 'status_update',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Notification', notificationSchema);
