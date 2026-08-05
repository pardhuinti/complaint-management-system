import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import API from '../services/api';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';

const ComplaintFormPage = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [department, setDepartment] = useState(user?.department || 'Computer Science & Engineering');
  const [category, setCategory] = useState('Classroom');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast('Image file size must be less than 5 MB', 'danger');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length < 5) {
      addToast('Title must be at least 5 characters long', 'danger');
      return;
    }
    if (description.length < 10) {
      addToast('Description must be at least 10 characters long', 'danger');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('department', department);
      formData.append('category', category);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('priority', priority);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await API.post('/complaints', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      addToast(`Complaint ${res.data.data.complaintId} submitted successfully!`, 'success');
      navigate('/complaint-history');
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to submit complaint', 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', paddingBottom: '3rem' }}>
      <div className="card" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#dbeafe', borderRadius: '50%', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PlusCircle size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', color: '#0f172a' }}>Submit New Campus Complaint</h2>
            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Please provide complete details so campus departments can act quickly.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Campus Department</label>
              <select
                className="form-control"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Hostel Management">Hostel Management</option>
                <option value="IT Infrastructure & Wi-Fi">IT Infrastructure & Wi-Fi</option>
                <option value="Campus Facilities & Cleanliness">Campus Facilities & Cleanliness</option>
                <option value="Library Services">Library Services</option>
                <option value="Transport Department">Transport Department</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Issue Category</label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
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
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Complaint Title *</label>
            <input
              type="text"
              required
              className="form-control"
              placeholder="e.g. Projector in Lab 3 is not connecting"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Detailed Description *</label>
            <textarea
              required
              rows="5"
              className="form-control"
              placeholder="Explain the issue location, room number, time of occurrence, and severity..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Urgency / Priority Level</label>
            <select
              className="form-control"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low (General suggestion or minor inconvenience)</option>
              <option value="Medium">Medium (Standard issue impacting daily task)</option>
              <option value="High">High (Urgent issue requiring same-day fix)</option>
              <option value="Critical">Critical (Safety hazard or complete service outage)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Upload Evidence Image (Optional)</label>
            <div
              style={{
                border: '2px dashed #cbd5e1',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                textAlign: 'center',
                backgroundColor: '#f8fafc',
                cursor: 'pointer',
              }}
              onClick={() => document.getElementById('imageUploadInput').click()}
            >
              <input
                id="imageUploadInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <Upload size={28} color="#2563eb" style={{ marginBottom: '0.5rem' }} />
              <p style={{ fontSize: '0.9rem', color: '#475569', fontWeight: '500' }}>
                {imageFile ? imageFile.name : 'Click to select photo attachment'}
              </p>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Supported formats: JPG, PNG, WEBP (Max 5 MB)</span>
            </div>

            {imagePreview && (
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxHeight: '180px', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ padding: '0.75rem 2rem' }}
            >
              {loading ? 'Submitting Ticket...' : 'Submit Complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintFormPage;
