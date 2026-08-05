import React from 'react';
import { ShieldCheck, Target, Award, Users, CheckCircle } from 'lucide-react';

const AboutPage = () => {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', paddingBottom: '3rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '1rem' }}>
          About Campus Complaint Management System
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '700px', margin: '0 auto' }}>
          Bridging the communication gap between students and college administration through transparent technology.
        </p>
      </div>

      <div className="card" style={{ marginBottom: '2.5rem', padding: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2563eb' }}>Our Mission</h2>
        <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          In traditional academic environments, student complaints regarding laboratory equipment, Wi-Fi connectivity, library resources, hostel maintenance, and campus cleanliness often get lost in paperwork or verbal requests. 
        </p>
        <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7 }}>
          Our **Complaint Management System** provides an automated, centralized web portal where every reported issue is uniquely cataloged (`CMP-XXXXX`), assigned to designated departments, prioritized, and tracked through resolution.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="card">
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Target size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Core Objectives</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: '#64748b' }}>
            <li>• Eliminate lost or unaddressed complaints</li>
            <li>• Guarantee SLA response times for critical issues</li>
            <li>• Provide full audit trail for administrative transparency</li>
          </ul>
        </div>

        <div className="card">
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Award size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>System Benefits</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: '#64748b' }}>
            <li>• Image evidence upload for faster diagnosis</li>
            <li>• Role-based dashboards for students & admins</li>
            <li>• Real-time statistical graphs & CSV report export</li>
          </ul>
        </div>
      </div>

      <div style={{ backgroundColor: '#0f172a', color: 'white', borderRadius: '1rem', padding: '2.5rem', textAlign: 'center' }}>
        <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>Built with Industry Standard Tech Stack</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.95rem', color: '#93c5fd' }}>
          <span>React.js</span> • <span>Node.js</span> • <span>Express.js</span> • <span>MongoDB Atlas</span> • <span>JWT Auth</span> • <span>REST APIs</span>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
