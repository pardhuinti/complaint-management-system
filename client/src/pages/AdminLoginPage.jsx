import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAdmin, loading } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginAdmin(email, password);
    if (result.success) {
      addToast('Administrator authentication granted!', 'success');
      navigate('/admin-dashboard');
    } else {
      addToast(result.message, 'danger');
    }
  };

  return (
    <div style={{ maxWidth: '440px', margin: '2rem auto', paddingBottom: '3rem' }}>
      <div className="card" style={{ padding: '2.5rem 2rem', backgroundColor: '#0f172a', color: 'white' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '52px', height: '52px', backgroundColor: 'rgba(37,99,235,0.2)', borderRadius: '50%', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <ShieldCheck size={28} />
          </div>
          <h2 style={{ fontSize: '1.75rem', color: 'white', marginBottom: '0.25rem' }}>Administrator Portal</h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Secure campus control console access</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ color: '#cbd5e1' }}>Admin Email</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                className="form-control"
                placeholder="admin@campus.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '2.5rem', backgroundColor: '#1e293b', borderColor: '#334155', color: 'white' }}
              />
              <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ color: '#cbd5e1' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '2.5rem', backgroundColor: '#1e293b', borderColor: '#334155', color: 'white' }}
              />
              <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.75rem' }}>
            <span>{loading ? 'Verifying Credentials...' : 'Access Admin Dashboard'}</span>
          </button>
        </form>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#1e293b', borderRadius: '0.5rem', fontSize: '0.8rem', color: '#94a3b8', textAlign: 'center' }}>
          💡 <strong>Demo Credentials:</strong><br />
          Email: <code>admin@campus.edu</code> | Password: <code>adminPassword123</code>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
