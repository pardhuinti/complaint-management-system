import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div style={{ maxWidth: '500px', margin: '4rem auto', textAlign: 'center', padding: '3rem 1.5rem' }} className="card">
      <div style={{ width: '64px', height: '64px', backgroundColor: '#fee2e2', borderRadius: '50%', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
        <HelpCircle size={36} />
      </div>
      <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '0.5rem' }}>404</h1>
      <h2 style={{ fontSize: '1.25rem', color: '#475569', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '2rem' }}>
        The page URL you requested could not be located on the campus complaint system.
      </p>
      <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', gap: '0.5rem' }}>
        <Home size={18} />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
