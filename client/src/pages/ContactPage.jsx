import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '../hooks/useToast';

const ContactPage = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Your contact message has been sent to the Helpdesk team!', 'success');
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', paddingBottom: '3rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '0.5rem' }}>
          Contact Campus Helpdesk
        </h1>
        <p style={{ color: '#64748b' }}>
          Have general inquiries or technical issues with the complaint portal? Reach out to us.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Contact Info Card */}
        <div className="card" style={{ backgroundColor: '#0f172a', color: 'white', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ color: 'white', fontSize: '1.35rem' }}>Get in Touch</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Our support desk is open Monday to Saturday from 8:00 AM to 6:00 PM.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(37,99,235,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa' }}>
              <Mail size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Email Support</div>
              <div style={{ fontWeight: '600' }}>helpdesk@campus.edu</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(22,163,74,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80' }}>
              <Phone size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Toll Free Phone</div>
              <div style={{ fontWeight: '600' }}>+1 (800) 555-RESOLV</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(245,158,11,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24' }}>
              <MapPin size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Office Address</div>
              <div style={{ fontWeight: '600' }}>Block A, Room 104, Admin Wing</div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <CheckCircle2 size={48} color="#16a34a" style={{ marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Message Sent!</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                Thank you for contacting us. Our admin team will respond to your query shortly.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn btn-outline" style={{ marginTop: '1.5rem' }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 style={{ marginBottom: '1.25rem' }}>Send Us a Message</h3>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  required
                  className="form-control"
                  placeholder="student@campus.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="Query or Portal Feedback"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  required
                  rows="4"
                  className="form-control"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Send size={16} />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
