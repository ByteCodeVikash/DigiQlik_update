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
  FileText,
  Shield,
  Search,
  Bell,
  CheckCircle2,
  PlayCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Clock
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
    { id: 'dm-mastery', name: 'Digital Marketing Mastery', icon: <TrendingUp size={18} /> },
    { id: 'seo-growth', name: 'SEO Growth System', icon: <Search size={18} /> },
    { id: 'social-media', name: 'Social Media Marketing', icon: <PlayCircle size={18} /> },
    { id: 'performance-ads', name: 'Performance Ads Mastery', icon: <TrendingUp size={18} /> },
    { id: 'google-ads', name: 'Google Ads Professional', icon: <Search size={18} /> },
    { id: 'content-marketing', name: 'Content Marketing Blueprint', icon: <FileText size={18} /> },
    { id: 'branding', name: 'Branding Strategy', icon: <Shield size={18} /> },
    { id: 'ecommerce', name: 'E-commerce Marketing', icon: <ExternalLink size={18} /> }
  ];

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('studentToken');
      
      if (token === 'mock_admin_token') {
        setStudents([
          { _id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', age: 24, purchasedPlans: ['dm-mastery'], createdAt: new Date() },
          { _id: '2', name: 'Priya Verma', email: 'priya@example.com', phone: '8877665544', age: 22, purchasedPlans: ['seo-growth'], createdAt: new Date() },
          { _id: '3', name: 'Ankit Gupta', email: 'ankit@example.com', phone: '7766554433', age: 25, purchasedPlans: ['social-media'], createdAt: new Date() }
        ]);
        setContent([
          { _id: '101', title: 'Session 01: The SEO Landscape', courseId: 'seo-growth', type: 'recorded', duration: '45m', createdAt: new Date() },
          { _id: '102', title: 'Social Media Ads Blueprint', courseId: 'social-media', type: 'recorded', duration: '1h 20m', createdAt: new Date() }
        ]);
        setNotices([
          { _id: '201', title: 'System Maintenance', content: 'Scheduled for tonight at 2 AM IST.', type: 'warning', createdAt: new Date() }
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
          <h2>DigiQlik<span>.</span></h2>
        </div>

        <nav className="aside-nav">
          <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={18} /> <span>Analytics Hub</span>
          </button>
          <button className={activeTab === 'students' ? 'active' : ''} onClick={() => setActiveTab('students')}>
            <Users size={18} /> <span>Learner Base</span>
          </button>
          <button className={activeTab === 'content' ? 'active' : ''} onClick={() => setActiveTab('content')}>
            <Video size={18} /> <span>LMS Builder</span>
          </button>
          <button className={activeTab === 'notices' ? 'active' : ''} onClick={() => setActiveTab('notices')}>
            <Megaphone size={18} /> <span>Broadcast</span>
          </button>
        </nav>

        <div className="aside-footer">
          <button onClick={handleLogout} className="logout-trigger">
            <LogOut size={18} /> <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Viewport */}
      <main className="admin-viewport">
        <header className="viewport-header">
          <div className="header-context">
            <h1>Welcome Back, {user?.name?.split(' ')[0] || 'Admin'}</h1>
            <p>Your LMS ecosystem is operating at peak performance.</p>
          </div>
          <div className="header-actions">
            <div className="bell-icon"><Bell size={20} /></div>
            <div className="user-profile">
              <div className="profile-text">
                <span className="name">{user?.name || 'DigiQlik Admin'}</span>
                <span className="role">Administrator</span>
              </div>
              <div className="profile-avatar">{user?.name?.charAt(0) || 'A'}</div>
            </div>
          </div>
        </header>

        <div className="viewport-content">
          {activeTab === 'overview' && (
            <div className="tab-overview fade-in">
              <div className="metrics-row">
                <div className="metric-card">
                  <div className="metric-icon students"><Users /></div>
                  <div className="metric-data">
                    <h3>{students.length}</h3>
                    <p>Total Students</p>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon content"><Video /></div>
                  <div className="metric-data">
                    <h3>{content.length}</h3>
                    <p>Lessons Live</p>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon status"><CheckCircle2 /></div>
                  <div className="metric-data">
                    <h3>99.9%</h3>
                    <p>System Uptime</p>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon notices"><TrendingUp /></div>
                  <div className="metric-data">
                    <h3>+12%</h3>
                    <p>Growth Rate</p>
                  </div>
                </div>
              </div>

              <div className="content-card">
                <div className="card-header" style={{padding: '1.5rem'}}>
                  <h3>Recent Enrollment Performance</h3>
                  <button onClick={() => setActiveTab('students')} className="text-btn">View All Learners <ChevronRight size={14} /></button>
                </div>
                <div className="table-responsive">
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th>Identity</th>
                        <th>Course Access</th>
                        <th>Enrollment Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.slice(0, 5).map(student => (
                        <tr key={student._id}>
                          <td>
                            <div className="identity-cell">
                              <div className="id-avatar">{student.name.charAt(0)}</div>
                              <div className="id-text">
                                <strong>{student.name}</strong>
                                <span>{student.email}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="plans-cell">
                              {student.purchasedPlans.map(p => (
                                <span key={p} className="mini-badge">{p}</span>
                              ))}
                            </div>
                          </td>
                          <td>{new Date(student.createdAt).toLocaleDateString()}</td>
                          <td><span className="status-tag active">Verified</span></td>
                          <td>
                            <button className="row-action-btn" onClick={() => handleUpdatePlans(student._id, student.purchasedPlans)}>
                              Edit Access
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

          {activeTab === 'students' && (
            <div className="tab-students fade-in">
              <div className="content-card">
                <div className="table-responsive">
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th>Full Name</th>
                        <th>Contact Detail</th>
                        <th>Active Plans</th>
                        <th>Status</th>
                        <th>Management</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(student => (
                        <tr key={student._id}>
                          <td>
                            <div className="identity-cell">
                              <div className="id-avatar">{student.name.charAt(0)}</div>
                              <strong>{student.name}</strong>
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
                            </div>
                          </td>
                          <td><span className="status-tag active">Active</span></td>
                          <td>
                            <button className="row-action-btn" onClick={() => handleUpdatePlans(student._id, student.purchasedPlans)}>
                              Update Permissions
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
            <div className="tab-content fade-in">
              <div className="builder-layout">
                <div className="content-card">
                  <div className="card-header" style={{padding: '1.5rem', borderBottom: '1px solid var(--border-color)'}}>
                    <h3>Upload New Lesson</h3>
                  </div>
                  <form onSubmit={handleAddContent} className="builder-form">
                    <div className="field">
                      <label>Destination Course</label>
                      <select value={contentForm.courseId} onChange={(e) => setContentForm({...contentForm, courseId: e.target.value})}>
                        {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label>Lesson Title</label>
                      <input type="text" placeholder="e.g. Masterclass #05: Advanced SEO" value={contentForm.title} onChange={(e) => setContentForm({...contentForm, title: e.target.value})} required />
                    </div>
                    <div className="field">
                      <label>Video URL / Resource Link</label>
                      <input type="text" placeholder="https://..." value={contentForm.url} onChange={(e) => setContentForm({...contentForm, url: e.target.value})} required />
                    </div>
                    <div className="field">
                      <label>Estimated Duration (e.g. 45m)</label>
                      <input type="text" placeholder="30m" value={contentForm.duration} onChange={(e) => setContentForm({...contentForm, duration: e.target.value})} />
                    </div>
                    <button type="submit" className="submit-btn primary">
                      <Video size={18} /> Publish Lesson
                    </button>
                  </form>
                </div>

                <div className="content-card">
                  <div className="card-header" style={{padding: '1.5rem', borderBottom: '1px solid var(--border-color)'}}>
                    <h3>Existing Lessons</h3>
                    <span className="count-badge">{content.length} Published</span>
                  </div>
                  <div className="lesson-scroll-area">
                    {content.map(item => (
                      <div key={item._id} className="lesson-card">
                        <div className="lesson-icon"><PlayCircle size={20} /></div>
                        <div className="lesson-info">
                          <h4>{item.title}</h4>
                          <div className="lesson-meta">
                            <span className="course-name">{courses.find(c => c.id === item.courseId)?.name || item.courseId}</span>
                            <span>•</span>
                            <span className="time"><Clock size={12} /> {item.duration || 'N/A'}</span>
                          </div>
                        </div>
                        <button className="delete-trigger" onClick={() => handleDeleteContent(item._id)}><Trash2 size={16} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notices' && (
            <div className="tab-notices fade-in">
              <div className="builder-layout">
                <div className="content-card">
                  <div className="card-header" style={{padding: '1.5rem', borderBottom: '1px solid var(--border-color)'}}>
                    <h3>Broadcast Hub</h3>
                  </div>
                  <form onSubmit={handlePostNotice} className="builder-form">
                    <div className="field">
                      <label>Subject Line</label>
                      <input type="text" placeholder="Urgent: Live session starting in 10 mins" value={noticeForm.title} onChange={(e) => setNoticeForm({...noticeForm, title: e.target.value})} required />
                    </div>
                    <div className="field">
                      <label>Announcement Content</label>
                      <textarea rows="5" placeholder="Details of the announcement..." value={noticeForm.content} onChange={(e) => setNoticeForm({...noticeForm, content: e.target.value})} required />
                    </div>
                    <button type="submit" className="submit-btn primary">
                      <Megaphone size={18} /> Push Announcement
                    </button>
                  </form>
                </div>

                <div className="content-card">
                  <div className="card-header" style={{padding: '1.5rem', borderBottom: '1px solid var(--border-color)'}}>
                    <h3>Active History</h3>
                  </div>
                  <div className="lesson-scroll-area">
                    {notices.map(notice => (
                      <div key={notice._id} className="lesson-card">
                        <div className="lesson-icon"><Bell size={18} /></div>
                        <div className="lesson-info">
                          <h4>{notice.title}</h4>
                          <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>{notice.content.substring(0, 50)}...</p>
                        </div>
                      </div>
                    ))}
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
