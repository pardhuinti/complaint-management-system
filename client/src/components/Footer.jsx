import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert size={24} color="#2563eb" />
            <span>Campus Resolv</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '0.5rem', maxWidth: '320px' }}>
            An automated, transparent, and responsive Complaint Management System empowering students and administrators to resolve campus issues swiftly.
          </p>
        </div>

        <div>
          <h4 style={{ color: 'white', marginBottom: '1rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
            <li><Link to="/" style={{ color: '#94a3b8' }}>Home</Link></li>
            <li><Link to="/about" style={{ color: '#94a3b8' }}>About System</Link></li>
            <li><Link to="/contact" style={{ color: '#94a3b8' }}>Help & Support</Link></li>
            <li><Link to="/student-login" style={{ color: '#94a3b8' }}>Student Portal</Link></li>
            <li><Link to="/admin-login" style={{ color: '#94a3b8' }}>Administrator Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', marginBottom: '1rem' }}>Complaint Categories</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>
            <li>Classroom & Labs</li>
            <li>Hostel & Dining</li>
            <li>Wi-Fi & Network</li>
            <li>Electricity & Water</li>
            <li>Library & Transport</li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', marginBottom: '1rem' }}>Campus Support</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#94a3b8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={16} color="#2563eb" />
              <span>helpdesk@campus.edu</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={16} color="#2563eb" />
              <span>+1 (800) 555-RESOLV</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={16} color="#2563eb" />
              <span>Student Services Building, Block A</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Campus Resolv. All Rights Reserved. Built with MERN Stack.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Security Guidelines</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
