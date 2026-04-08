import React from 'react';
import { User, MapPin, Calendar, Users, Trash2, Mic2 } from 'lucide-react';

function MyPage({ user, recruitments, comments, deleteRecruitment, styles }) {
  // 自分が投稿した募集だけを抽出
  const myRecruitments = recruitments.filter(item => item.author === user.name);

  // 参加人数（確認済みログ）を計算する関数
  const getParticipantCount = (recruitmentId) => {
    return comments.filter(c => c.recruitmentId === recruitmentId && c.confirmed).length;
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
        <User size={24} color="#3f51b5" />
        <h2 style={{ fontSize: '1.8rem', color: '#3f51b5', margin: 0, fontWeight: '400' }}>マイページ</h2>
      </div>

      {/* ユーザー情報簡易表示 */}
      <div style={{ ...styles.card, padding: '20px', marginBottom: '30px', borderLeft: '6px solid #3f51b5' }}>
        <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>ログイン中のユーザー</div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
          {user.name} 
          <span style={{ marginLeft: '10px', fontSize: '12px', color: '#3f51b5', backgroundColor: '#e8eaf6', padding: '2px 8px', borderRadius: '4px' }}>
            {user.role === 'admin' ? '管理者権限' : '一般ユーザー'}
          </span>
        </div>
      </div>

      <h3 style={{ fontSize: '16px', color: '#444', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Mic2 size={18} color="#3f51b5" /> 自分の投稿一覧
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {myRecruitments.length === 0 ? (
          <div style={{ ...styles.card, padding: '40px', textAlign: 'center', color: '#888' }}>
            まだ募集を投稿していません。
          </div>
        ) : (
          myRecruitments.map(item => {
            const participants = getParticipantCount(item.id);
            const isFull = participants >= item.capacity;

            return (
              <div key={item.id} style={{ 
                ...styles.card, 
                padding: '15px 20px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#333', marginBottom: '5px' }}>
                    {item.title}
                  </div>
                  <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#666' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {item.location}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {item.date}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: isFull ? '#ff4d4f' : '#4caf50', fontWeight: 'bold' }}>
                      <Users size={14} /> {participants} / {item.capacity}名
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '11px', color: '#3f51b5', fontWeight: 'bold', backgroundColor: '#e8eaf6', padding: '2px 8px', borderRadius: '4px' }}>
                    {item.musicGenre}
                  </span>
                  <button 
                    onClick={() => deleteRecruitment(item.id)}
                    style={{ 
                      border: 'none', background: 'none', cursor: 'pointer', 
                      color: '#ff4d4f', padding: '5px', display: 'flex', alignItems: 'center' 
                    }}
                    title="募集を中止する"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default MyPage;