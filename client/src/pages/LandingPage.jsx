import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  Lock,
  ArrowRight,
  Wifi,
  BookOpen,
  Home as HostelIcon,
  Cpu,
  Truck,
  Coffee,
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '3rem' }}>
      {/* HERO SECTION */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: 'white',
          borderRadius: '1.25rem',
          padding: '4rem 2rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)',
          marginTop: '1rem',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(37, 99, 235, 0.2)',
              border: '1px solid rgba(37, 99, 235, 0.4)',
              color: '#93c5fd',
              padding: '0.35rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
            }}
          >
            <ShieldCheck size={16} />
            <span>Official Campus Issue Resolution Portal</span>
          </div>

          <h1 style={{ fontSize: '2.75rem', fontWeight: '800', lineHeight: 1.2, color: 'white', marginBottom: '1.25rem' }}>
            Transforming Campus Support into a Fast, Transparent Experience
          </h1>

          <p style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Report classroom, hostel, lab, Wi-Fi, and facility problems in seconds. Track real-time status updates from registration to resolution.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/student-login" className="btn btn-primary" style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}>
              <span>Submit a Complaint</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn btn-outline" style={{ color: 'white', borderColor: '#475569', padding: '0.875rem 1.75rem', fontSize: '1rem' }}>
              <span>Learn How It Works</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Covered Campus Services</h2>
          <p style={{ color: '#64748b' }}>Submit issues directly to responsible college departments</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {[
            { title: 'Classroom & Labs', desc: 'Projectors, AC, benches, computer hardware', icon: Cpu, color: '#2563eb' },
            { title: 'Hostel & Mess', desc: 'Room maintenance, plumbing, food quality', icon: HostelIcon, color: '#16a34a' },
            { title: 'Wi-Fi & Internet', desc: 'Network outages, login issues, speed drops', icon: Wifi, color: '#7c3aed' },
            { title: 'Library Services', desc: 'Book access, study hall lighting, silence', icon: BookOpen, color: '#f59e0b' },
            { title: 'Campus Transport', desc: 'Bus timings, routes, driver feedback', icon: Truck, color: '#dc2626' },
            { title: 'Canteen & Water', desc: 'Hygiene, drinking water purifiers, seating', icon: Coffee, color: '#0284c7' },
          ].map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <div key={idx} className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: `${cat.color}15`,
                    color: cat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                  }}
                >
                  <IconComp size={28} />
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{cat.title}</h4>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{cat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* WHY USE THIS SYSTEM */}
      <section style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '1rem', padding: '3rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Why Campus Resolv?</h2>
          <p style={{ color: '#64748b' }}>Designed for modern educational institution workflows</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ width: '44px', height: '44px', backgroundColor: '#dbeafe', borderRadius: '0.5rem', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Zap size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Real-time Ticket Tracking</h4>
              <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Monitor your complaint status live with automated status updates from Pending to Resolved.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ width: '44px', height: '44px', backgroundColor: '#dcfce7', borderRadius: '0.5rem', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Department Accountability</h4>
              <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Complaints are assigned directly to specialized college heads with tracking logs and SLA timelines.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ width: '44px', height: '44px', backgroundColor: '#fee2e2', borderRadius: '0.5rem', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Lock size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Secure & Verified Access</h4>
              <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Protected by JWT token authentication, bcrypt password encryption, and role-based guards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ backgroundColor: '#0f172a', color: 'white', borderRadius: '1rem', padding: '3rem 2rem', textAlign: 'center' }}>
        <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>Ready to Submit Your First Issue?</h2>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Join thousands of students and staff making campus life better every day.
        </p>
        <Link to="/student-register" className="btn btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
          Create Free Student Account
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
