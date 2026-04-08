import React from 'react';
import { Home, Search, PlusCircle, MessageSquare, User, LogOut, ChevronLeft, ChevronRight, Mic2 } from 'lucide-react';

function Sidebar({ activeTab, setActiveTab, onLogout, isSidebarOpen, setSidebarOpen }) {
  const menuItems = [
    { id: 'home', label: 'ホーム', icon: Home },
    { id: 'list', label: '募集を探す', icon: Search },
    { id: 'post', label: '新しく募集する', icon: PlusCircle },
    { id: 'logs', label: '連絡ログ', icon: MessageSquare },
    { id: 'mypage', label: 'マイページ', icon: User }, // 【追加】
    { id: 'registration', label: 'ユーザー登録', icon: User },
  ];

  const sidebarStyle = {
    width: isSidebarOpen ? '240px' : '80px',
    backgroundColor: '#fff',
    borderRight: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.3s ease',
    position: 'relative'
  };

  const navItemStyle = (id) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 24px',
    cursor: 'pointer',
    color: activeTab === id ? '#3f51b5' : '#666',
    backgroundColor: activeTab === id ? '#e8eaf6' : 'transparent',
    borderLeft: activeTab === id ? '4px solid #3f51b5' : '4px solid transparent',
    transition: 'all 0.2s'
  });

  return (
    <div style={sidebarStyle}>
      <div style={{ padding: '30px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Mic2 size={24} color="#3f51b5" />
        {isSidebarOpen && <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#3f51b5', letterSpacing: '1px' }}>Utamy</span>}
      </div>

      <nav style={{ flex: 1 }}>
        {menuItems.map((item) => (
          <div key={item.id} onClick={() => setActiveTab(item.id)} style={navItemStyle(item.id)}>
            <item.icon size={20} />
            {isSidebarOpen && <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.label}</span>}
          </div>
        ))}
      </nav>

      <div style={{ padding: '20px', borderTop: '1px solid #eee' }}>
        <div onClick={onLogout} style={{ ...navItemStyle('logout'), borderLeft: 'none' }}>
          <LogOut size={20} />
          {isSidebarOpen && <span style={{ fontSize: '14px', fontWeight: '500' }}>ログアウト</span>}
        </div>
      </div>

      <button 
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        style={{
          position: 'absolute', right: '-12px', top: '32px', backgroundColor: '#3f51b5',
          color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </div>
  );
}

export default Sidebar;