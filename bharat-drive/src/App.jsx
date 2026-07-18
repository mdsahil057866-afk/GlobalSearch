import React, { useState } from 'react';
import { 
  Cloud, 
  Search, 
  Upload, 
  Bell, 
  Settings, 
  Folder, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  ShieldCheck, 
  Database,
  Lock,
  Globe,
  MoreVertical,
  Star,
  Users
} from 'lucide-react';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('My Drive');

  const navItems = [
    { name: 'My Drive', icon: <Cloud size={20} /> },
    { name: 'DigiLocker Sync', icon: <ShieldCheck size={20} /> },
    { name: 'Shared with me', icon: <Users size={20} /> },
    { name: 'Starred', icon: <Star size={20} /> },
    { name: 'Recent', icon: <Folder size={20} /> },
    { name: 'Decentralized Grid', icon: <Database size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
  ];

  const recentFiles = [
    { name: 'Aadhaar_Card.pdf', size: '2.4 MB', date: 'Today', type: 'pdf', icon: <FileText size={40} className="text-red" /> },
    { name: 'Q1_Tax_Returns.xlsx', size: '1.8 MB', date: 'Yesterday', type: 'sheet', icon: <FileText size={40} className="text-green" /> },
    { name: 'Diwali_Family.jpg', size: '4.2 MB', date: 'Last Week', type: 'image', icon: <ImageIcon size={40} className="text-blue" /> },
    { name: 'Startup_Pitch.pptx', size: '12.5 MB', date: 'Last Week', type: 'presentation', icon: <FileText size={40} className="text-saffron" /> },
    { name: 'Project_Code.zip', size: '45.1 MB', date: '2 Weeks Ago', type: 'archive', icon: <Folder size={40} className="text-purple" /> },
  ];

  return (
    <div className="app-container">
      {}
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo-icon">
            <Cloud size={24} />
          </div>
          <div className="logo-text">Bharat Drive</div>
        </div>

        <nav className="nav-menu">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href="#"
              className={`nav-item ${activeTab === item.name ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveTab(item.name); }}
            >
              {item.icon}
              <span>{item.name}</span>
            </a>
          ))}
        </nav>

        <div className="storage-widget glass">
          <div className="storage-header">
            <span>Storage Usage (India Region)</span>
            <span className="text-blue">65%</span>
          </div>
          <div className="storage-bar-bg">
            <div className="storage-bar-fill"></div>
          </div>
          <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            65 GB used of 100 GB
          </p>
          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--accent-green)' }}>
            <Lock size={12} /> E2E Encrypted
          </div>
        </div>
      </aside>

      {}
      <main className="main-content">
        {}
        <header className="topbar">
          <div className="search-container glass">
            <Search size={20} color="var(--text-secondary)" />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search files, folders, or tags... (English / हिंदी)" 
            />
          </div>

          <div className="user-actions">
            <button className="btn-upload">
              <Upload size={18} />
              <span>Secure Upload</span>
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
              <Globe size={20} style={{ cursor: 'pointer' }} />
              <Bell size={20} style={{ cursor: 'pointer' }} />
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-saffron))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', cursor: 'pointer', border: '2px solid var(--border)' }}>
                JD
              </div>
            </div>
          </div>
        </header>

        {}
        <div className="dashboard-area">
          <h1 className="page-title animate-fade-in">{activeTab}</h1>
          
          {activeTab === 'My Drive' && (
            <>
              <div className="quick-stats animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="stat-card glass">
                  <div className="stat-icon" style={{ color: 'var(--accent-blue)' }}>
                    <Folder size={24} />
                  </div>
                  <div className="stat-info">
                    <h4>Total Folders</h4>
                    <div className="value">124</div>
                  </div>
                </div>
                
                <div className="stat-card glass">
                  <div className="stat-icon" style={{ color: 'var(--accent-saffron)' }}>
                    <FileText size={24} />
                  </div>
                  <div className="stat-info">
                    <h4>Total Files</h4>
                    <div className="value">1,482</div>
                  </div>
                </div>
                
                <div className="stat-card glass">
                  <div className="stat-icon" style={{ color: 'var(--accent-green)' }}>
                    <ShieldCheck size={24} />
                  </div>
                  <div className="stat-info">
                    <h4>DPDP Compliance</h4>
                    <div className="value">100%</div>
                  </div>
                </div>

                <div className="stat-card glass">
                  <div className="stat-icon" style={{ color: 'var(--text-primary)' }}>
                    <Database size={24} />
                  </div>
                  <div className="stat-info">
                    <h4>Mumbai Server Ping</h4>
                    <div className="value">12ms</div>
                  </div>
                </div>
              </div>

              <div className="section-header animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h3>Recent Files</h3>
                <a href="#" className="view-all">View All</a>
              </div>

              <div className="file-grid animate-fade-in" style={{ animationDelay: '0.3s' }}>
                {recentFiles.map((file, index) => (
                  <div key={index} className="file-card glass">
                    <div className="file-icon-area">
                      {file.icon}
                    </div>
                    <div className="file-info">
                      <h5>{file.name}</h5>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                        <p>{file.size} • {file.date}</p>
                        <MoreVertical size={14} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab !== 'My Drive' && (
            <div className="animate-fade-in glass" style={{ padding: '3rem', borderRadius: '16px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--text-primary)' }}>
                {navItems.find(item => item.name === activeTab)?.icon}
              </div>
              <h3>{activeTab} Content Area</h3>
              <p style={{ marginTop: '0.5rem', maxWidth: '400px', margin: '0.5rem auto 0' }}>
                This module is fully encrypted using zero-knowledge architecture. Content is synced securely with Indian localized servers.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
