import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../hooks/useAuth';
import StatCard from '../components/StatCard';
import ChartView from '../components/ChartView';
import ComplaintCard from '../components/ComplaintCard';
import LoadingSpinner from '../components/LoadingSpinner';

const StudentDashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const res = await API.get('/dashboard/stats');
      setStats(res.data.data);
    } catch (error) {
      console.error('Failed to fetch student dashboard stats', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading student workspace statistics..." />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '3rem' }}>
      {/* WELCOME BANNER */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          color: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', opacity: 0.9 }}>
            <Sparkles size={16} />
            <span>Welcome Back,</span>
          </div>
          <h1 style={{ color: 'white', fontSize: '2rem', marginTop: '0.25rem' }}>{user?.name}</h1>
          <p style={{ opacity: 0.9, fontSize: '0.9rem', marginTop: '0.25rem' }}>
            ID: {user?.studentId || 'N/A'} • Dept: {user?.department || 'General'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/submit-complaint" className="btn" style={{ backgroundColor: 'white', color: '#2563eb' }}>
            <PlusCircle size={18} />
            <span>Submit New Complaint</span>
          </Link>
          <Link to="/complaint-history" className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}>
            <FileText size={18} />
            <span>My Complaints</span>
          </Link>
        </div>
      </div>

      {/* METRIC COUNTERS */}
      <div className="stats-grid">
        <StatCard title="Total Logged" value={stats?.totalComplaints || 0} icon={FileText} color="primary" />
        <StatCard title="Pending Action" value={stats?.pendingComplaints || 0} icon={Clock} color="warning" />
        <StatCard title="In Progress" value={stats?.inProgressComplaints || 0} icon={AlertTriangle} color="primary" />
        <StatCard title="Resolved Issues" value={stats?.resolvedComplaints || 0} icon={CheckCircle2} color="success" />
      </div>

      {/* GRAPH VISUALIZATION */}
      <ChartView categoryStats={stats?.categoryStats || []} statusStats={stats?.statusStats || []} />

      {/* RECENT COMPLAINTS */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2>Recent Complaint Tickets</h2>
          <Link to="/complaint-history" style={{ fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>View All History</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {stats?.recentComplaints && stats.recentComplaints.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {stats.recentComplaints.map((c) => (
              <ComplaintCard key={c._id} complaint={c} />
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <FileText size={40} color="#94a3b8" style={{ marginBottom: '0.5rem' }} />
            <h4 style={{ color: '#64748b' }}>No Complaints Submitted Yet</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.25rem', marginBottom: '1.5rem' }}>
              Facing an issue on campus? Submit a ticket to notify college administration.
            </p>
            <Link to="/submit-complaint" className="btn btn-primary">
              <PlusCircle size={18} />
              <span>File Complaint Now</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboardPage;
