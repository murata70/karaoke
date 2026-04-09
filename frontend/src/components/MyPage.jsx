import React from 'react';
import { User, MapPin, Calendar, Users, Trash2, Mic2, CheckCircle, ChevronRight } from 'lucide-react';

function MyPage({ user, recruitments, comments, deleteRecruitment, styles, onViewDetail }) {
  // 自分が投稿した募集を抽出
  const myRecruitments = recruitments.filter(item => item.author === user.name);

  // 自分が参加している募集を抽出
  const joinedRecruitmentIds = comments
    .filter(c => c.userName === user.name && c.confirmed)
    .map(c => c.recruitmentId);
  
  const myJoinedRecruitments = recruitments.filter(item => 
    joinedRecruitmentIds.includes(item.id) && item.author !== user.name
  );

  const getParticipantCount = (recruitmentId) => {
    return comments.filter(c => c.recruitmentId === recruitmentId && c.confirmed).length;
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <User size={22} color="#3f51b5" />
        <h2 style={{ fontSize: '1.5rem', color: '#3f51b5', margin: 0, fontWeight: '400' }}>マイページ</h2>
      </div>

      {/* ユーザー情報 */}
      <div style={{ ...styles.card, padding: '12px 20px', marginBottom: '25px', borderLeft: '4px solid #3f51b5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
          {user.name} 
          <span style={{ marginLeft: '10px', fontSize: '11px', color: '#3f51b5', backgroundColor: '#e8eaf6', padding: '1px 8px', borderRadius: '4px', fontWeight: 'normal' }}>
            {user.role === 'admin' ? '管理者' : '一般ユーザー'}
          </span>
        </div>
        <div style={{ fontSize: '12px', color: '#888' }}>ログイン中</div>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        
        {/* 左側：自分の投稿一覧 */}
        <div style={{ flex: 1 }}>
          <h3 style={sectionTitleStyle}>
            <Mic2 size={16} color="#3f51b5" /> 自分の投稿
          </h3>
          <div style={listContainerStyle}>
            {myRecruitments.length === 0 ? (
              <div style={emptyCardStyle}>投稿なし</div>
            ) : (
              myRecruitments.map(item => {
                const participants = getParticipantCount(item.id);
                return (
                  <div 
                    key={item.id} 
                    onClick={() => onViewDetail(item.id)} // クリックで詳細へ
                    style={smallCardStyle}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={itemTitleStyle}>{item.title}</div>
                      <div style={itemMetaStyle}>
                        <Calendar size={12} /> {item.date}
                        <span style={{ color: participants >= item.capacity ? '#ff4d4f' : '#4caf50', fontWeight: 'bold', marginLeft: '5px' }}>
                          <Users size={12} /> {participants}/{item.capacity}
                        </span>
                      </div>
                    </div>
                    {/* 削除ボタンは詳細遷移とは別に動作させる */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // 詳細への遷移を止めて削除だけ実行
                        deleteRecruitment(item.id);
                      }}
                      style={deleteButtonStyle}
                      title="削除"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 右側：参加予定の募集 */}
        <div style={{ flex: 1 }}>
          <h3 style={sectionTitleStyle}>
            <CheckCircle size={16} color="#4caf50" /> 参加予定
          </h3>
          <div style={listContainerStyle}>
            {myJoinedRecruitments.length === 0 ? (
              <div style={emptyCardStyle}>予定なし</div>
            ) : (
              myJoinedRecruitments.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => onViewDetail(item.id)} // クリックで詳細へ
                  style={{ ...smallCardStyle, borderLeft: '3px solid #4caf50' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={itemTitleStyle}>{item.title}</div>
                    <div style={itemMetaStyle}>
                       <Calendar size={12} /> {item.date}
                       <span style={{ marginLeft: '5px', color: '#3f51b5' }}>主催: {item.author}</span>
                    </div>
                  </div>
                  <ChevronRight size={14} color="#eee" />
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// 内部スタイル（変更なし）
const sectionTitleStyle = { fontSize: '14px', color: '#444', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' };
const listContainerStyle = { display: 'flex', flexDirection: 'column', gap: '8px' };
const smallCardStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  border: '1px solid #f0f0f0',
  padding: '10px 12px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  transition: 'background-color 0.2s'
};
const emptyCardStyle = { padding: '20px', textAlign: 'center', color: '#aaa', fontSize: '12px', backgroundColor: '#fff', borderRadius: '8px', border: '1px dashed #eee' };
const itemTitleStyle = { fontWeight: 'bold', fontSize: '13px', color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
const itemMetaStyle = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#888', marginTop: '2px' };
const deleteButtonStyle = { border: 'none', background: 'none', cursor: 'pointer', color: '#ff4d4f', padding: '4px', display: 'flex', alignItems: 'center', flexShrink: 0 };

export default MyPage;