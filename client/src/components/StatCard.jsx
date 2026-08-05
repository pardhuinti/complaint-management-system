import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = 'primary', subtitle }) => {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        <Icon size={24} />
      </div>
      <div className="stat-info">
        <h3>{value}</h3>
        <p>{title}</p>
        {subtitle && <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{subtitle}</span>}
      </div>
    </div>
  );
};

export default StatCard;
