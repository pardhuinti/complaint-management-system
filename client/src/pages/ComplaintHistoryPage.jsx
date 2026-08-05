import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, PlusCircle, Search, Clock, CheckCircle2 } from 'lucide-react';
import API from '../services/api';
import ComplaintCard from '../components/ComplaintCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';

const ComplaintHistoryPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    fetchMyComplaints();
  }, [page]);

  const fetchMyComplaints = async () => {
    try {
      setLoading(true);
      const res = await API.get('/complaints/my', { params: { pageNumber: page, pageSize: 6 } });
      setComplaints(res.data.data);
      setPages(res.data.pages);
    } catch (error) {
      console.error('Failed to fetch my complaints', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredComplaints = complaints.filter((c) => {
    if (filterStatus === 'ALL') return true;
    return c.status === filterStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#0f172a' }}>My Complaint History</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Track all tickets logged under your student account</p>
        </div>

        <Link to="/submit-complaint" className="btn btn-primary">
          <PlusCircle size={18} />
          <span>New Complaint</span>
        </Link>
      </div>

      {/* STATUS FILTER PILLS */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {['ALL', 'Pending', 'In Progress', 'Assigned', 'Resolved', 'Rejected'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`btn btn-sm ${filterStatus === st ? 'btn-primary' : 'btn-outline'}`}
          >
            {st}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching your complaints history..." />
      ) : filteredComplaints.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <FileText size={48} color="#94a3b8" style={{ marginBottom: '1rem' }} />
          <h3 style={{ color: '#64748b', marginBottom: '0.5rem' }}>No Complaints Found</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            No complaint tickets match the selected filter criteria.
          </p>
          <Link to="/submit-complaint" className="btn btn-primary">
            Submit New Ticket
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filteredComplaints.map((c) => (
            <ComplaintCard key={c._id} complaint={c} />
          ))}
        </div>
      )}

      <Pagination page={page} pages={pages} onPageChange={setPage} />
    </div>
  );
};

export default ComplaintHistoryPage;
