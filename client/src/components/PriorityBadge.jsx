import React from 'react';

const PriorityBadge = ({ priority }) => {
  const getBadgeClass = (p) => {
    switch (p) {
      case 'Low': return 'badge-low';
      case 'Medium': return 'badge-medium';
      case 'High': return 'badge-high';
      case 'Critical': return 'badge-critical';
      default: return 'badge-low';
    }
  };

  return <span className={`badge ${getBadgeClass(priority)}`}>{priority}</span>;
};

export default PriorityBadge;
