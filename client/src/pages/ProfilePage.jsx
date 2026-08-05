import React, { useState } from 'react';
import { User, Phone, Building, Hash, Lock, Save, ShieldCheck } from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

const ProfilePage = () => {
  const { user, updateUserData, isAdmin } = useAuth();
  const { addToast } = useToast();

  // Profile Edit State
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [department, setDepartment] = useState(user?.department || 'General');
  const [studentId, setStudentId] = useState(user?.studentId || '');
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setUpdatingProfile(true);
      const res = await API.put('/users/profile', {
        name,
        phone,
        department,
        studentId,
      });

      updateUserData(res.data.data);
      addToast('Profile information updated successfully!', 'success');
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to update profile', 'danger');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      addToast('New password and confirm password do not match', 'danger');
      return;
    }

    if (newPassword.length < 6) {
      addToast('New password must be at least 6 characters', 'danger');
      return;
    }

    try {
      setUpdatingPassword(true);
      const res = await API.put('/users/change-password', {
        currentPassword,
        newPassword,
      });

      addToast(res.data.message, 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      addToast(error.response?.data?.message || 'Password update failed', 'danger');
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', color: '#0f172a' }}>Account Settings & Profile</h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Manage your personal credentials and security preferences</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* PROFILE DETAILS FORM */}
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={20} color="#2563eb" />
            <span>Profile Details</span>
          </h3>

          <form onSubmit={handleUpdateProfile}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                required
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address (Read Only)</label>
              <input
                type="email"
                disabled
                className="form-control"
                value={user?.email || ''}
                style={{ backgroundColor: '#f1f5f9' }}
              />
            </div>

            {!isAdmin && (
              <div className="form-group">
                <label className="form-label">Student ID / Roll No</label>
                <input
                  type="text"
                  className="form-control"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Department</label>
              <input
                type="text"
                className="form-control"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Contact</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button type="submit" disabled={updatingProfile} className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              <Save size={16} />
              <span>{updatingProfile ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </form>
        </div>

        {/* SECURITY & PASSWORD CHANGE */}
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock size={20} color="#dc2626" />
            <span>Security & Password</span>
          </h3>

          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                required
                className="form-control"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                type="password"
                required
                className="form-control"
                placeholder="Minimum 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                required
                className="form-control"
                placeholder="Re-type new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" disabled={updatingPassword} className="btn btn-secondary" style={{ width: '100%', marginTop: '0.5rem' }}>
              <ShieldCheck size={16} />
              <span>{updatingPassword ? 'Updating...' : 'Update Password'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
