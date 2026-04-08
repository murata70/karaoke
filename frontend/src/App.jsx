import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { useUtamyData } from './hooks/useUtamyData';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedRecruitmentId, setSelectedRecruitmentId] = useState(null);

  const { 
    user, setUser, recruitments, comments, setComments,
    applyToRecruitment, addRecruitment, deleteRecruitment, isAdmin 
  } = useUtamyData();

  // 奈央さんこだわりの「細身・スリム」なカードスタイル
  const styles = {
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      padding: '20px',
      border: '1px solid #f0f0f0',
      transition: 'transform 0.2s ease'
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedRecruitmentId(null);
        }} 
        isSidebarOpen={isSidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* 表示ロジックを丸投げ */}
          <MainContent 
            activeTab={activeTab}
            user={user}
            setUser={setUser}
            recruitments={recruitments}
            comments={comments}
            setComments={setComments}
            applyToRecruitment={applyToRecruitment}
            addRecruitment={addRecruitment}
            deleteRecruitment={deleteRecruitment}
            isAdmin={isAdmin}
            styles={styles}
            selectedRecruitmentId={selectedRecruitmentId}
            setSelectedRecruitmentId={setSelectedRecruitmentId}
            setActiveTab={setActiveTab}
          />
        </div>
      </main>
    </div>
  );
}

export default App;