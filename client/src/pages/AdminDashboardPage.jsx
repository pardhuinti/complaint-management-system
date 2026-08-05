import React, { useState, useEffect } from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Users,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  CheckSquare,
} from 'lucide-react';
import API from '../services/api';
import { useToast } from '../hooks/useToast';
import StatCard from '../components/StatCard';
import ChartView from '../components/ChartView';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';

const AdminDashboardPage = () => {
  const { addToast } = useToast();
  const [stats, setStats] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('complaints'); // 'complaints' | 'students'
  
  // Filter & Search states
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Status Edit Modal State
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editRemarks, setEditRemarks] = useState('');
  const [editAssignedTo, setEditAssignedTo] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (activeTab === 'complaints') {
      fetchComplaints();
    } else {
      fetchStudents();
    }
  }, [search, category, status, priority, page, activeTab]);

  const fetchStats = async () => {
    try {
      const res = await API.get('/dashboard/stats');
      setStats(res.data.data);
    } catch (error) {
      console.error('Error fetching admin dashboard stats:', error);
    }
  };

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const params = {
        pageNumber: page,
        pageSize: 10,
        search,
        category,
        status,
        priority,
      };
      const res = await API.get('/complaints', { params });
      setComplaints(res.data.data);
      setPages(res.data.pages);
    } catch (error) {
      addToast('Failed to fetch complaints list', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await API.get('/admin/students', { params: { search, pageNumber: page } });
      setStudents(res.data.data);
      setPages(res.data.pages);
    } catch (error) {
      addToast('Failed to fetch students list', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const openUpdateModal = (complaint) => {
    setSelectedComplaint(complaint);
    setEditStatus(complaint.status);
    setEditRemarks(complaint.remarks || '');
    setEditAssignedTo(complaint.assignedTo || 'Unassigned');
    setModalOpen(true);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    try {
      await API.put(`/complaints/${selectedComplaint._id}/status`, {
        status: editStatus,
        remarks: editRemarks,
        assignedTo: editAssignedTo,
      });

      addToast(`Complaint ${selectedComplaint.complaintId} updated successfully!`, 'success');
      setModalOpen(false);
      fetchComplaints();
      fetchStats();
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to update complaint status', 'danger');
    }
  };

  const handleDeleteComplaint = async (id, complaintId) => {
    if (!window.confirm(`Are you sure you want to delete complaint ${complaintId}?`)) return;
    try {
      await API.delete(`/complaints/${id}`);
      addToast(`Complaint ${complaintId} deleted`, 'info');
      fetchComplaints();
      fetchStats();
    } catch (error) {
      addToast('Failed to delete complaint', 'danger');
    }
  };

  const handleDeleteStudent = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete student profile "${name}"?`)) return;
    try {
      await API.delete(`/admin/students/${id}`);
      addToast(`Student ${name} account removed`, 'info');
      fetchStudents();
      fetchStats();
    } catch (error) {
      addToast('Failed to delete student account', 'danger');
    }
  };

  const exportReport = async () => {
    try {
      const res = await API.get('/reports/summary');
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(res.data.data, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `complaint_report_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      addToast('Report generated & downloaded successfully', 'success');
    } catch (error) {
      addToast('Failed to generate report', 'danger');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '3rem' }}>
      {/* HEADER & TOP ACTIONS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#0f172a' }}>Admin Control Center</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Monitor campus complaints, update status, and manage student accounts</p>
        </div>

        <button onClick={exportReport} className="btn btn-secondary">
          <Download size={18} />
          <span>Export Summary Report</span>
        </button>
      </div>

      {/* METRIC COUNTERS */}
      <div className="stats-grid">
        <StatCard title="Total Complaints" value={stats?.totalComplaints || 0} icon={FileText} color="primary" />
        <StatCard title="Pending" value={stats?.pendingComplaints || 0} icon={Clock} color="warning" />
        <StatCard title="In Progress" value={stats?.inProgressComplaints || 0} icon={AlertTriangle} color="primary" />
        <StatCard title="Resolved" value={stats?.resolvedComplaints || 0} icon={CheckCircle2} color="success" />
        <StatCard title="Critical Priority" value={stats?.criticalComplaints || 0} icon={AlertOctagon} color="danger" />
        <StatCard title="Total Students" value={stats?.totalStudents || 0} icon={Users} color="primary" />
      </div>

      {/* CHARTS */}
      <ChartView categoryStats={stats?.categoryStats || []} statusStats={stats?.statusStats || []} />

      {/* TAB SWITCHER */}
      <div className="card" style={{ padding: '0.75rem 1rem', display: 'flex', gap: '1rem', borderBottom: '2px solid #e2e8f0' }}>
        <button
          onClick={() => { setActiveTab('complaints'); setPage(1); }}
          className={`btn ${activeTab === 'complaints' ? 'btn-primary' : 'btn-outline'}`}
        >
          <FileText size={18} />
          <span>Manage Complaints ({stats?.totalComplaints || 0})</span>
        </button>
        <button
          onClick={() => { setActiveTab('students'); setPage(1); }}
          className={`btn ${activeTab === 'students' ? 'btn-primary' : 'btn-outline'}`}
        >
          <Users size={18} />
          <span>Registered Students ({stats?.totalStudents || 0})</span>
        </button>
      </div>

      {/* COMPLAINTS TAB CONTENT */}
      {activeTab === 'complaints' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* SEARCH & FILTERS TOOLBAR */}
          <div className="card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search Title, ID, Student name..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                style={{ paddingLeft: '2.5rem' }}
              />
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            <select className="form-control" style={{ width: '160px' }} value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
              <option value="">All Categories</option>
              <option value="Classroom">Classroom</option>
              <option value="Hostel">Hostel</option>
              <option value="Laboratory">Laboratory</option>
              <option value="Library">Library</option>
              <option value="Transport">Transport</option>
              <option value="Canteen">Canteen</option>
              <option value="Sports">Sports</option>
              <option value="Wi-Fi">Wi-Fi</option>
              <option value="Electricity">Electricity</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Cleanliness">Cleanliness</option>
              <option value="Others">Others</option>
            </select>

            <select className="form-control" style={{ width: '150px' }} value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Assigned">Assigned</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select className="form-control" style={{ width: '150px' }} value={priority} onChange={(e) => { setPriority(e.target.value); setPage(1); }}>
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          {/* DATA TABLE */}
          {loading ? (
            <LoadingSpinner message="Fetching complaint records..." />
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Title & Category</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Assigned To</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.length === 0 ? (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                        No complaints match your selected filters.
                      </td>
                    </tr>
                  ) : (
                    complaints.map((c) => (
                      <tr key={c._id}>
                        <td>
                          <strong style={{ color: '#2563eb' }}>{c.complaintId}</strong>
                        </td>
                        <td>
                          <div style={{ fontWeight: '600' }}>{c.studentName}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{c.studentEmail}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: '600', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {c.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            {c.department} • {c.category}
                          </div>
                        </td>
                        <td>
                          <PriorityBadge priority={c.priority} />
                        </td>
                        <td>
                          <StatusBadge status={c.status} />
                        </td>
                        <td>
                          <span style={{ fontSize: '0.85rem', color: c.assignedTo === 'Unassigned' ? '#94a3b8' : '#0f172a' }}>
                            {c.assignedTo}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.85rem', color: '#64748b' }}>
                          {new Date(c.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.35rem' }}>
                            <button
                              onClick={() => openUpdateModal(c)}
                              className="btn btn-outline btn-sm"
                              title="Update Status / Assign"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteComplaint(c._id, c.complaintId)}
                              className="btn btn-danger btn-sm"
                              title="Delete Complaint"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          <Pagination page={page} pages={pages} onPageChange={setPage} />
        </div>
      )}

      {/* STUDENTS TAB CONTENT */}
      {activeTab === 'students' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <div style={{ position: 'relative', maxWidth: '400px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search Student name, email, roll no..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                style={{ paddingLeft: '2.5rem' }}
              />
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {loading ? (
            <LoadingSpinner message="Fetching registered students list..." />
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Email Address</th>
                    <th>Student ID</th>
                    <th>Department</th>
                    <th>Phone</th>
                    <th>Registered Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                        No registered students found.
                      </td>
                    </tr>
                  ) : (
                    students.map((st) => (
                      <tr key={st._id}>
                        <td style={{ fontWeight: '600' }}>{st.name}</td>
                        <td>{st.email}</td>
                        <td>{st.studentId || 'N/A'}</td>
                        <td>{st.department}</td>
                        <td>{st.phone || 'N/A'}</td>
                        <td>{new Date(st.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button
                            onClick={() => handleDeleteStudent(st._id, st.name)}
                            className="btn btn-danger btn-sm"
                          >
                            <Trash2 size={14} />
                            <span>Remove</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          <Pagination page={page} pages={pages} onPageChange={setPage} />
        </div>
      )}

      {/* UPDATE STATUS MODAL */}
      {modalOpen && selectedComplaint && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '500px', width: '100%', padding: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              Manage Ticket: {selectedComplaint.complaintId}
            </h3>

            <form onSubmit={handleUpdateStatus}>
              <div className="form-group">
                <label className="form-label">Complaint Title</label>
                <input type="text" disabled className="form-control" value={selectedComplaint.title} />
              </div>

              <div className="form-group">
                <label className="form-label">Update Status</label>
                <select
                  className="form-control"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Assign To Staff / Team</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. IT Helpdesk / Lab Asst. Mark"
                  value={editAssignedTo}
                  onChange={(e) => setEditAssignedTo(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Admin Remarks / Resolution Notes</label>
                <textarea
                  rows="3"
                  className="form-control"
                  placeholder="Provide resolution details or reason for update..."
                  value={editRemarks}
                  onChange={(e) => setEditRemarks(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
