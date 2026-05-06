import React, { useState, useEffect } from 'react';
import { 
  PlayCircle, 
  Video, 
  Calendar, 
  LayoutDashboard, 
  LogOut, 
  Lock, 
  Clock, 
  ChevronRight,
  User as UserIcon,
  BadgeCheck,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/LMS/VideoPlayer';
import UpsellView from '../components/LMS/UpsellView';
import axios from 'axios';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recorded'); // 'recorded', 'live', 'upcoming'
  const [content, setContent] = useState({ recorded: [], live: [], upcoming: [] });
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/courses');
    } else if (user) {
      fetchContent();
      fetchNotices();
    }
  }, [user, authLoading]);

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem('studentToken');
      const res = await axios.get('/api/dashboard/content', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setContent(res.data.content);
        if (res.data.content.recorded.length > 0) {
          setSelectedVideo(res.data.content.recorded[0]);
        }
      }
    } catch (err) {
      console.error('Fetch content failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotices = async () => {
    try {
      const res = await axios.get('/api/dashboard/notices');
      if (res.data.success) {
        setNotices(res.data.notices);
      }
    } catch (err) {
      console.error('Fetch notices failed:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/courses');
  };

  const handlePurchaseSuccess = (newPlans) => {
    // Force a re-fetch of content after a mock purchase
    fetchContent();
  };

  if (authLoading || loading) {
    return (
      <div className="dashboard-loading">
        <div className="loader"></div>
        <p>Loading your learning workspace...</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'recorded':
        return (
          <div className="recorded-grid">
            <div className="main-player-area">
              {selectedVideo ? (
                <>
                  <VideoPlayer url={selectedVideo.url} title={selectedVideo.title} />
                  <div className="video-info">
                    <h1>{selectedVideo.title}</h1>
                    <p>{selectedVideo.description}</p>
                    <div className="video-meta">
                      <span className="meta-badge"><Clock size={14} /> {selectedVideo.duration}</span>
                      <span className="meta-badge"><BadgeCheck size={14} /> {selectedVideo.courseId.toUpperCase()}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <PlayCircle size={48} />
                  <h3>No recorded sessions available</h3>
                  <p>Content for your purchased plans will appear here.</p>
                </div>
              )}
            </div>
            <div className="playlist-area">
              <h3>Course Sessions</h3>
              <div className="playlist-items">
                {content.recorded.map((vid) => (
                  <div 
                    key={vid._id} 
                    className={`playlist-item ${selectedVideo?._id === vid._id ? 'active' : ''}`}
                    onClick={() => setSelectedVideo(vid)}
                  >
                    <div className="item-thumb">
                      <PlayCircle size={20} />
                    </div>
                    <div className="item-details">
                      <h4>{vid.title}</h4>
                      <span>{vid.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'live':
        return (
          <div className="classes-grid">
            {content.live.length > 0 ? content.live.map((item) => (
              <div className="class-card live" key={item._id}>
                <div className="class-badge">LIVE NOW</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="class-meta">
                  <span><Calendar size={14} /> {new Date(item.scheduledAt).toLocaleDateString()}</span>
                  <span><Clock size={14} /> {new Date(item.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="join-btn">
                  Join Class <ExternalLink size={16} />
                </a>
              </div>
            )) : (
              <div className="empty-state">
                <Video size={48} />
                <h3>No live classes currently</h3>
                <p>Check the "Upcoming" tab for scheduled sessions.</p>
              </div>
            )}
          </div>
        );
      case 'upcoming':
        return (
          <div className="classes-grid">
            {content.upcoming.length > 0 ? content.upcoming.map((item) => (
              <div className="class-card upcoming" key={item._id}>
                <div className="class-badge upcoming">UPCOMING</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="class-meta">
                  <span><Calendar size={14} /> {new Date(item.scheduledAt).toLocaleDateString()}</span>
                  <span><Clock size={14} /> {new Date(item.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <button className="remind-btn" disabled>
                  Coming Soon <Lock size={14} />
                </button>
              </div>
            )) : (
              <div className="empty-state">
                <Calendar size={48} />
                <h3>No upcoming sessions scheduled</h3>
                <p>We'll notify you when new classes are added to your plan.</p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          Digi<span className="text-gradient">Qlik</span>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'recorded' ? 'active' : ''}`}
            onClick={() => setActiveTab('recorded')}
          >
            <PlayCircle size={20} />
            <span>Recorded Sessions</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'live' ? 'active' : ''}`}
            onClick={() => setActiveTab('live')}
          >
            <Video size={20} />
            <span>Live Classes</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            <Calendar size={20} />
            <span>Upcoming Classes</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              <UserIcon size={20} />
            </div>
            <div className="user-info">
              <p className="user-name">{user?.name}</p>
              <p className="user-plan">{user?.purchasedPlans?.length} Plans Active</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-search">
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Workspace</h2>
          </div>
          <div className="header-actions">
            <span className="last-sync">Plan: {user?.purchasedPlans?.join(', ').toUpperCase()}</span>
          </div>
        </header>

        <div className="dashboard-content">
          {notices.length > 0 && (
            <div className="global-notices-container">
              {notices.map(notice => (
                <div key={notice._id} className={`notice-banner ${notice.type}`}>
                  <div className="notice-icon">
                    <i className="fas fa-bullhorn"></i>
                  </div>
                  <div className="notice-text">
                    <strong>{notice.title}:</strong> {notice.content}
                  </div>
                </div>
              ))}
            </div>
          )}

          {(!user?.purchasedPlans || user.purchasedPlans.length === 0) ? (
            <UpsellView onPurchaseSuccess={handlePurchaseSuccess} />
          ) : (
            renderContent()
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
