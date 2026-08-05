import React from 'react';

const StatusBadge = ({ status }) => {
  const getBadgeClass = (s) => {
    switch (s) {
      case 'Pending': return 'badge-pending';
      case 'In Progress': return 'badge-in-progress';
      case 'Assigned': return 'badge-assigned';
      case 'Resolved': return 'badge-resolved';
      case 'Rejected': return 'badge-rejected';
      default: return 'badge-pending';
    }
  };

  return <span className={`badge ${getBadgeClass(status)}`}>{status}</span>;
};

export default StatusBadge;
