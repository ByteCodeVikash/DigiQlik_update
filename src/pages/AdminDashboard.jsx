import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Video, 
  Megaphone, 
  Trash2, 
  LogOut, 
  Plus, 
  LayoutDashboard,
  Calendar,
  AlertCircle,
  FileText,
  Clock,
  ExternalLink,
  MoreVertical,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [students, setStudents] = useState([]);
  const [content, setContent] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form States
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '', type: 'info' });
  const [contentForm, setContentForm] = useState({ 
    title: '', courseId: 'dm-mastery', type: 'recorded', url: '', description: '', scheduledAt: '', duration: '' 
  });

  const courses = [
    { id: 'dm-mastery', name: 'Digital Marketing Mastery', icon: '🚀' },
    { id: 'seo-growth', name: 'SEO Growth System', icon: '📈' },
    { id: 'social-media', name: 'Social Media Marketing', icon: '📱' },
    { id: 'performance-ads', name: 'Performance Ads Mastery', icon: '🎯' },
    { id: 'google-ads', name: 'Google Ads Professional', icon: '🔍' },
    { id: 'content-marketing', name: 'Content Marketing Blueprint', icon: '✍️' },
    { id: 'branding', name: 'Branding Strategy', icon: '💎' },
    { id: 'ecommerce', name: 'E-commerce Marketing', icon: '🛍️' }
  ];

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('studentToken');
      
      if (token === 'mock_admin_token') {
        // Provide rich demo data as requested by user's "Premium" requirement
        setStudents([
          { _id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', age: 24, purchasedPlans: ['dm-mastery'], createdAt: new Date() },
          { _id: '2', name: 'Priya Verma', email: 'priya@example.com', phone: '8877665544', age: 22, purchasedPlans: ['seo-growth'], createdAt: new Date() }
        ]);
        setContent([
          { _id: '101', title: 'Intro to Digital Marketing', courseId: 'dm-mastery', type: 'recorded', createdAt: new Date() },
          { _id: '102', title: 'SEO Keyword Research', courseId: 'seo-growth', type: 'recorded', createdAt: new Date() }
        ]);
        setNotices([
          { _id: '201', title: 'Welcome Admin!', content: 'This is a demo mode for UI/UX inspection.', type: 'info', createdAt: new Date() }
        ]);
        setLoading(false);
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [studentsRes, contentRes, noticesRes] = await Promise.all([
        axios.get('/api/admin/students', config),
        axios.get('/api/admin/content', config),
        axios.get('/api/admin/notices', config)
      ]);

      setStudents(studentsRes.data.students || []);
      setContent(contentRes.data.content || []);
      setNotices(noticesRes.data.notices || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostNotice = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/notices', noticeForm);
      setNoticeForm({ title: '', content: '', type: 'info' });
      fetchData();
      alert('Announcement published successfully!');
    } catch (error) {
      alert('Failed to publish notice');
    }
  };

  const handleAddContent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/content', contentForm);
      setContentForm({ title: '', courseId: 'dm-mastery', type: 'recorded', url: '', description: '', scheduledAt: '', duration: '' });
      fetchData();
      alert('LMS Content assigned successfully!');
    } catch (error) {
      alert('Failed to assign content');
    }
  };

  const handleDeleteContent = async (id) => {
    if (window.confirm('Are you sure you want to remove this video/link?')) {
      try {
        await axios.delete(`/api/admin/content?id=${id}`);
        fetchData();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  const handleUpdatePlans = async (studentId, currentPlans) => {
    const planString = prompt('Enter comma separated plans (e.g. dm-mastery, seo-growth):', currentPlans.join(', '));
    if (planString === null) return;
    
    const plans = planString.split(',').map(p => p.trim()).filter(p => p);
    try {
      await axios.put('/api/admin/students', { studentId, purchasedPlans: plans });
      fetchData();
    } catch (error) {
      alert('Update failed');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (authLoading) return <div className="admin-loading-screen">Authenticating Admin...</div>;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-aside">
        <div className="aside-brand">
          <div className="brand-logo">D</div>
          <h2>DigiQlik<span>.</span>Admin</h2>
        </div>

        <nav className="aside-nav">
          <button 
            className={activeTab === 'overview' ? 'active' : ''} 
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={20} /> <span>Command Center</span>
          </button>
          <button 
            className={activeTab === 'students' ? 'active' : ''} 
            onClick={() => setActiveTab('students')}
          >
            <Users size={20} /> <span>Student Base</span>
          </button>
          <button 
            className={activeTab === 'content' ? 'active' : ''} 
            onClick={() => setActiveTab('content')}
          >
            <Video size={20} /> <span>LMS Builder</span>
          </button>
          <button 
            className={activeTab === 'notices' ? 'active' : ''} 
            onClick={() => setActiveTab('notices')}
          >
            <Megaphone size={20} /> <span>Publicity Hub</span>
          </button>
        </nav>

        <div className="aside-footer">
          <button onClick={handleLogout} className="logout-trigger">
            <LogOut size={20} /> <span>Exit Securely</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <main className="admin-viewport">
        <header className="viewport-header">
          <div className="header-context">
            <h1>{activeTab === 'overview' ? 'Operational Hub' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
            <p>Managing {students.length} active students across 8 courses</p>
          </div>
          <div className="header-actions">
            <div className="system-status">
              <div className="status-dot"></div>
              <span>System Live</span>
            </div>
            <div className="user-profile">
              <div className="profile-text">
                <span className="name">DigiQlik Owner</span>
                <span className="role">Administrator</span>
              </div>
              <div className="profile-avatar">DO</div>
            </div>
          </div>
        </header>

        <div className="viewport-content">
          {activeTab === 'overview' && (
            <div className="tab-overview">
              <div className="metrics-row">
                <div className="metric-card">
                  <div className="metric-icon students"><Users size={24} /></div>
                  <div className="metric-data">
                    <h3>{students.length}</h3>
                    <p>Total Registered</p>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon content"><Video size={24} /></div>
                  <div className="metric-data">
                    <h3>{content.length}</h3>
                    <p>Lessons Uploaded</p>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon notices"><Megaphone size={24} /></div>
                  <div className="metric-data">
                    <h3>{notices.length}</h3>
                    <p>Global Alerts</p>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon status"><CheckCircle2 size={24} /></div>
                  <div className="metric-data">
                    <h3>99.9%</h3>
                    <p>Uptime Status</p>
                  </div>
                </div>
              </div>

              <div className="overview-grid">
                <div className="overview-card courses-list">
                  <div className="card-header">
                    <h3>Course Ecosystem</h3>
                    <button onClick={() => setActiveTab('content')}>Manage All</button>
                  </div>
                  <div className="course-mini-grid">
                    {courses.map(c => (
                      <div key={c.id} className="course-pill">
                        <span className="pill-icon">{c.icon}</span>
                        <span className="pill-name">{c.name}</span>
                        <span className="pill-count">{content.filter(i => i.courseId === c.id).length}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="overview-card recent-activity">
                  <div className="card-header">
                    <h3>Latest Sessions</h3>
                  </div>
                  <div className="activity-list">
                    {content.slice(0, 5).map(item => (
                      <div key={item._id} className="activity-item">
                        <div className={`type-dot ${item.type}`}></div>
                        <div className="activity-details">
                          <p>{item.title}</p>
                          <span>Assigned to {item.courseId.toUpperCase()}</span>
                        </div>
                        <span className="activity-time">{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="tab-students">
              <div className="content-card">
                <div className="card-actions-bar">
                  <div className="search-box">
                    <Users size={18} />
                    <input type="text" placeholder="Filter by name or email..." />
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th>Identity</th>
                        <th>Contact</th>
                        <th>Purchased Ecosystem</th>
                        <th>Enrolled At</th>
                        <th>Status</th>
                        <th>Manage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(student => (
                        <tr key={student._id}>
                          <td>
                            <div className="identity-cell">
                              <div className="id-avatar">{student.name.charAt(0)}</div>
                              <div className="id-text">
                                <strong>{student.name}</strong>
                                <span>Age: {student.age}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="contact-cell">
                              <p>{student.email}</p>
                              <span>{student.phone}</span>
                            </div>
                          </td>
                          <td>
                            <div className="plans-cell">
                              {student.purchasedPlans.map(p => (
                                <span key={p} className="mini-badge">{p}</span>
                              ))}
                              {student.purchasedPlans.length === 0 && <span className="no-badge">Guest Access</span>}
                            </div>
                          </td>
                          <td>{new Date(student.createdAt).toLocaleDateString()}</td>
                          <td><span className="status-tag active">Active</span></td>
                          <td>
                            <button className="row-action-btn" onClick={() => handleUpdatePlans(student._id, student.purchasedPlans)}>
                              Manage Access
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="tab-content">
              <div className="builder-layout">
                <div className="builder-form-side">
                  <div className="content-card">
                    <div className="card-header">
                      <h3><Plus size={20} /> Video Lesson Uploader</h3>
                    </div>
                    <form onSubmit={handleAddContent} className="builder-form">
                      <div className="form-row">
                        <div className="field">
                          <label>Target Course (Destination)</label>
                          <select 
                            value={contentForm.courseId} 
                            onChange={(e) => setContentForm({...contentForm, courseId: e.target.value})}
                          >
                            {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="field">
                        <label>Lesson Title</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Masterclass #1: SEO Fundamentals"
                          value={contentForm.title}
                          onChange={(e) => setContentForm({...contentForm, title: e.target.value})}
                          required
                        />
                      </div>
                      <div className="field">
                        <label>Description (Optional)</label>
                        <textarea 
                          rows="2"
                          placeholder="What will students learn in this session?"
                          value={contentForm.description}
                          onChange={(e) => setContentForm({...contentForm, description: e.target.value})}
                        ></textarea>
                      </div>
                      <div className="form-row-2">
                        <div className="field">
                          <label>Session Type</label>
                          <select 
                            value={contentForm.type} 
                            onChange={(e) => setContentForm({...contentForm, type: e.target.value})}
                          >
                            <option value="recorded">Recorded Masterclass</option>
                            <option value="live">Live Class Link</option>
                            <option value="upcoming">Future Schedule</option>
                          </select>
                        </div>
                        <div className="field">
                          <label>{contentForm.type === 'recorded' ? 'Duration (e.g. 1h 20m)' : 'Date/Time'}</label>
                          {contentForm.type === 'recorded' ? (
                            <input 
                              type="text" 
                              placeholder="45m"
                              value={contentForm.duration}
                              onChange={(e) => setContentForm({...contentForm, duration: e.target.value})}
                            />
                          ) : (
                            <input 
                              type="datetime-local" 
                              value={contentForm.scheduledAt}
                              onChange={(e) => setContentForm({...contentForm, scheduledAt: e.target.value})}
                            />
                          )}
                        </div>
                      </div>
                      <div className="field">
                        <label>Video URL (YouTube / Vimeo / Zoom)</label>
                        <input 
                          type="text" 
                          placeholder="https://youtube.com/watch?v=..."
                          value={contentForm.url}
                          onChange={(e) => setContentForm({...contentForm, url: e.target.value})}
                        />
                      </div>
                      <button type="submit" className="submit-btn primary">
                        <Video size={18} /> Push to Student Dashboard
                      </button>
                    </form>
                  </div>
                </div>

                <div className="builder-list-side">
                  <div className="content-card">
                    <div className="card-header">
                      <h3>Active Course Content</h3>
                      <span className="count-badge">{content.length} Items</span>
                    </div>
                    <div className="lesson-scroll-area">
                      {content.map(item => (
                        <div key={item._id} className="lesson-card">
                          <div className={`lesson-type ${item.type}`}>
                            {item.type === 'recorded' ? <Video size={16} /> : <Calendar size={16} />}
                          </div>
                          <div className="lesson-info">
                            <h4>{item.title}</h4>
                            <div className="lesson-meta">
                              <span className="course-id">{item.courseId.toUpperCase()}</span>
                              <span className="separator">•</span>
                              <span className="type-label">{item.type}</span>
                            </div>
                          </div>
                          <button className="delete-trigger" onClick={() => handleDeleteContent(item._id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      {content.length === 0 && (
                        <div className="empty-state-v2">
                          <Video size={40} />
                          <p>No lessons assigned yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notices' && (
            <div className="tab-notices">
              <div className="grid-2-col-v2">
                <div className="content-card">
                  <div className="card-header">
                    <h3><Megaphone size={20} /> Publish Global Announcement</h3>
                  </div>
                  <form onSubmit={handlePostNotice} className="builder-form">
                    <div className="field">
                      <label>Announcement Headline</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Server Maintenance or New Course Launch"
                        value={noticeForm.title}
                        onChange={(e) => setNoticeForm({...noticeForm, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="field">
                      <label>Urgency Level</label>
                      <select 
                        value={noticeForm.type} 
                        onChange={(e) => setNoticeForm({...noticeForm, type: e.target.value})}
                      >
                        <option value="info">General Info</option>
                        <option value="warning">Important Warning</option>
                        <option value="urgent">Urgent Action Required</option>
                        <option value="success">Celebration / Success</option>
                      </select>
                    </div>
                    <div className="field">
                      <label>Detailed Message</label>
                      <textarea 
                        rows="5" 
                        placeholder="Write the full message for all students..."
                        value={noticeForm.content}
                        onChange={(e) => setNoticeForm({...noticeForm, content: e.target.value})}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="submit-btn primary">
                      <Megaphone size={18} /> Broadcast to All
                    </button>
                  </form>
                </div>

                <div className="content-card">
                  <div className="card-header">
                    <h3>Active Broadcast History</h3>
                  </div>
                  <div className="notice-scroll-area">
                    {notices.map(notice => (
                      <div key={notice._id} className={`notice-item-v2 ${notice.type}`}>
                        <div className="notice-item-header">
                          <h4>{notice.title}</h4>
                          <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p>{notice.content}</p>
                      </div>
                    ))}
                    {notices.length === 0 && (
                      <div className="empty-state-v2">
                        <Megaphone size={40} />
                        <p>No active announcements</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
