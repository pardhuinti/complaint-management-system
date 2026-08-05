import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Users,
  Building,
  BarChart2,
  UserCheck,
  Settings,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Sidebar = () => {
  const { isAdmin } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      style={{
        width: '260px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        padding: '1.5rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      <div style={{ padding: '0 0.5rem 1rem', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>
        {isAdmin ? 'Admin Console' : 'Student Workspace'}
      </div>

      {!isAdmin ? (
        <>
          <Link
            to="/student-dashboard"
            className={`btn ${isActive('/student-dashboard') ? 'btn-primary' : 'btn-outline'}`}
            style={{ justifyContent: 'flex-start' }}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/submit-complaint"
            className={`btn ${isActive('/submit-complaint') ? 'btn-primary' : 'btn-outline'}`}
            style={{ justifyContent: 'flex-start' }}
          >
            <PlusCircle size={18} />
            <span>Submit Complaint</span>
          </Link>
          <Link
            to="/complaint-history"
            className={`btn ${isActive('/complaint-history') ? 'btn-primary' : 'btn-outline'}`}
            style={{ justifyContent: 'flex-start' }}
          >
            <FileText size={18} />
            <span>My Complaints</span>
          </Link>
          <Link
            to="/profile"
            className={`btn ${isActive('/profile') ? 'btn-primary' : 'btn-outline'}`}
            style={{ justifyContent: 'flex-start' }}
          >
            <UserCheck size={18} />
            <span>Profile & Account</span>
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/admin-dashboard"
            className={`btn ${isActive('/admin-dashboard') ? 'btn-primary' : 'btn-outline'}`}
            style={{ justifyContent: 'flex-start' }}
          >
            <LayoutDashboard size={18} />
            <span>Overview & Stats</span>
          </Link>
          <Link
            to="/admin-dashboard?tab=complaints"
            className={`btn ${isActive('/admin-dashboard') ? 'btn-primary' : 'btn-outline'}`}
            style={{ justifyContent: 'flex-start' }}
          >
            <FileText size={18} />
            <span>Manage Complaints</span>
          </Link>
          <Link
            to="/profile"
            className={`btn ${isActive('/profile') ? 'btn-primary' : 'btn-outline'}`}
            style={{ justifyContent: 'flex-start' }}
          >
            <Settings size={18} />
            <span>Account Settings</span>
          </Link>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
