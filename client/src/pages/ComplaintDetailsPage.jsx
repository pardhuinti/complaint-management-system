import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Building,
  User,
  Mail,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MessageSquare,
  FileText,
} from 'lucide-react';
import API from '../services/api';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import LoadingSpinner from '../components/LoadingSpinner';

const ComplaintDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComplaintDetails();
  }, [id]);

  const fetchComplaintDetails = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/complaints/${id}`);
      setComplaint(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load complaint details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading complaint details & history..." />;

  if (error || !complaint) {
    return (
      <div className="card" style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center', padding: '3rem 2rem' }}>
        <AlertTriangle size={48} color="#dc2626" style={{ marginBottom: '1rem' }} />
        <h3 style={{ marginBottom: '0.5rem' }}>Complaint Not Found</h3>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>{error}</p>
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          Go Back
        </button>
      </div>
    );
  }

  // Calculate progress steps
  const steps = [
    { title: 'Logged', done: true },
    { title: 'Assigned', done: ['Assigned', 'In Progress', 'Resolved'].includes(complaint.status) },
    { title: 'In Progress', done: ['In Progress', 'Resolved'].includes(complaint.status) },
    { title: 'Resolved', done: complaint.status === 'Resolved' },
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '3rem' }}>
      <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm" style={{ marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} />
        <span>Back to List</span>
      </button>

      <div className="card" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#2563eb' }}>
                {complaint.complaintId}
              </span>
              <PriorityBadge priority={complaint.priority} />
              <StatusBadge status={complaint.status} />
            </div>
            <h1 style={{ fontSize: '1.75rem', color: '#0f172a' }}>{complaint.title}</h1>
          </div>

          <div style={{ fontSize: '0.85rem', color: '#64748b', textAlign: 'right' }}>
            <div>Submitted On:</div>
            <strong style={{ color: '#0f172a' }}>{new Date(complaint.createdAt).toLocaleString()}</strong>
          </div>
        </div>

        {/* PROGRESS TRACKER */}
        <div>
          <h4 style={{ marginBottom: '1.25rem', color: '#64748b', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Resolution Workflow Timeline
          </h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            {steps.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative', zIndex: 2 }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: step.done ? '#16a34a' : '#e2e8f0',
                    color: step.done ? 'white' : '#94a3b8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  {step.done ? <CheckCircle2 size={20} /> : idx + 1}
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: step.done ? '600' : '400', color: step.done ? '#0f172a' : '#94a3b8' }}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* DETAILS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '0.75rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Department</span>
            <div style={{ fontWeight: '600', fontSize: '1rem', color: '#0f172a', marginTop: '0.25rem' }}>{complaint.department}</div>
          </div>

          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Category</span>
            <div style={{ fontWeight: '600', fontSize: '1rem', color: '#0f172a', marginTop: '0.25rem' }}>{complaint.category}</div>
          </div>

          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Assigned Officer</span>
            <div style={{ fontWeight: '600', fontSize: '1rem', color: '#0f172a', marginTop: '0.25rem' }}>{complaint.assignedTo || 'Unassigned'}</div>
          </div>

          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Student Contact</span>
            <div style={{ fontWeight: '600', fontSize: '0.95rem', color: '#0f172a', marginTop: '0.25rem' }}>{complaint.studentName} ({complaint.studentEmail})</div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#0f172a' }}>Issue Description</h4>
          <p style={{ color: '#334155', lineHeight: 1.7, fontSize: '0.975rem', whiteSpace: 'pre-line' }}>
            {complaint.description}
          </p>
        </div>

        {/* ATTACHED IMAGE */}
        {complaint.imageUrl && (
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#0f172a' }}>Uploaded Photo Evidence</h4>
            <a href={complaint.imageUrl} target="_blank" rel="noreferrer">
              <img
                src={complaint.imageUrl}
                alt="Complaint Evidence"
                style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
              />
            </a>
          </div>
        )}

        {/* ADMIN REMARKS */}
        {complaint.remarks && (
          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.75rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1d4ed8', fontWeight: '700', marginBottom: '0.5rem' }}>
              <MessageSquare size={18} />
              <span>Official Admin Resolution Remarks</span>
            </div>
            <p style={{ color: '#1e3a8a', fontSize: '0.95rem', lineHeight: 1.6 }}>{complaint.remarks}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintDetailsPage;
