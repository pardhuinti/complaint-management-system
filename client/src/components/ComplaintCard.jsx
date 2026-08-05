import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Building, ArrowRight, Image as ImageIcon } from 'lucide-react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';

const ComplaintCard = ({ complaint }) => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#2563eb' }}>
          {complaint.complaintId}
        </span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <PriorityBadge priority={complaint.priority} />
          <StatusBadge status={complaint.status} />
        </div>
      </div>

      <h4 style={{ fontSize: '1.05rem', color: '#0f172a' }}>{complaint.title}</h4>

      <p style={{ fontSize: '0.875rem', color: '#64748b', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {complaint.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: '#94a3b8', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Building size={14} />
          <span>{complaint.department} ({complaint.category})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginLeft: 'auto' }}>
          <Clock size={14} />
          <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
        {complaint.imageUrl ? (
          <span style={{ fontSize: '0.75rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <ImageIcon size={14} /> Image Attached
          </span>
        ) : <span />}

        <Link to={`/complaint/${complaint.complaintId || complaint._id}`} className="btn btn-outline btn-sm" style={{ gap: '0.25rem' }}>
          <span>View Details</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default ComplaintCard;
