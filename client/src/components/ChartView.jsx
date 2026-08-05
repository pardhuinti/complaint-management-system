import React from 'react';

const ChartView = ({ categoryStats = [], statusStats = [] }) => {
  const maxCategoryCount = Math.max(...categoryStats.map((c) => c.count), 1);
  const totalStatusCount = statusStats.reduce((acc, curr) => acc + curr.count, 0) || 1;

  const getStatusColor = (label) => {
    switch (label) {
      case 'Pending': return '#f59e0b';
      case 'In Progress': return '#0284c7';
      case 'Assigned': return '#7c3aed';
      case 'Resolved': return '#16a34a';
      case 'Rejected': return '#dc2626';
      default: return '#64748b';
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
      {/* Category Bar Chart */}
      <div className="card">
        <h4 style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Complaints by Category</span>
          <span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#64748b' }}>Distribution</span>
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {categoryStats.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No category data available yet.</p>
          ) : (
            categoryStats.map((item, idx) => {
              const pct = Math.round((item.count / maxCategoryCount) * 100);
              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: '500' }}>{item.category}</span>
                    <span style={{ fontWeight: '600', color: '#2563eb' }}>{item.count}</span>
                  </div>
                  <div style={{ height: '10px', width: '100%', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${pct}%`,
                        backgroundColor: '#2563eb',
                        borderRadius: '9999px',
                        transition: 'width 0.5s ease',
                      }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Status Distribution Breakdown */}
      <div className="card">
        <h4 style={{ marginBottom: '1.25rem' }}>Status Overview</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {statusStats.map((item, idx) => {
            const sharePct = Math.round((item.count / totalStatusCount) * 100);
            return (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(item.label),
                  }}
                />
                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ fontWeight: '500' }}>{item.label}</span>
                  <span style={{ color: '#64748b' }}>{item.count} ({sharePct}%)</span>
                </div>
                <div style={{ width: '80px', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '9999px' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${sharePct}%`,
                      backgroundColor: getStatusColor(item.label),
                      borderRadius: '9999px',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChartView;
