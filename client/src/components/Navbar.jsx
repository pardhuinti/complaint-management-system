import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, User, LogOut, LayoutDashboard, PlusCircle, History, Info, PhoneCall } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, isStudent, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <ShieldAlert size={26} />
        <span>Campus Resolv</span>
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
            Contact
          </Link>
        </li>

        {isAuthenticated ? (
          <>
            {isStudent && (
              <>
                <li>
                  <Link
                    to="/student-dashboard"
                    className={`nav-link ${isActive('/student-dashboard') ? 'active' : ''}`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/submit-complaint"
                    className={`nav-link ${isActive('/submit-complaint') ? 'active' : ''}`}
                  >
                    Submit Complaint
                  </Link>
                </li>
                <li>
                  <Link
                    to="/complaint-history"
                    className={`nav-link ${isActive('/complaint-history') ? 'active' : ''}`}
                  >
                    My History
                  </Link>
                </li>
              </>
            )}

            {isAdmin && (
              <li>
                <Link
                  to="/admin-dashboard"
                  className={`nav-link ${isActive('/admin-dashboard') ? 'active' : ''}`}
                >
                  Admin Portal
                </Link>
              </li>
            )}

            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '1rem' }}>
              <Link to="/profile" className="btn btn-outline btn-sm" style={{ gap: '0.35rem' }}>
                <User size={16} />
                <span>{user?.name.split(' ')[0]}</span>
                <span className={`badge ${isAdmin ? 'badge-rejected' : 'badge-in-progress'}`}>
                  {user?.role}
                </span>
              </Link>
              <button onClick={handleLogout} className="btn btn-danger btn-sm" title="Logout">
                <LogOut size={16} />
              </button>
            </li>
          </>
        ) : (
          <li style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/student-login" className="btn btn-outline btn-sm">
              Student Login
            </Link>
            <Link to="/admin-login" className="btn btn-secondary btn-sm">
              Admin Access
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
