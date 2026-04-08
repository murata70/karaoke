import React from 'react';
import { MessageSquare, Calendar, ChevronRight, Search, PlusCircle, Mic2 } from 'lucide-react';

function Home({ recruitments, comments, setActiveTab, styles, onViewDetail }) {
  const recentRecruitments = [...recruitments].reverse().slice(0, 3);
  const recentComments = [...comments].reverse().slice(0, 5);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '50px', paddingTop: '20px' }}>
      
      {/* ロゴセクション */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Mic2 size={32} color="#3f51b5" />
            <h1 style={{ fontSize: '2.5rem', color: '#3f51b5', margin: 0, fontFamily: '"Righteous", sans-serif' }}>
              Utamy
            </h1>
          </div>
          <div style={{ width: '100%', height: '3px', backgroundColor: '#3f51b5', marginTop: '8px' }}></div>
        </div>
      </div>

      {/* メインボタン */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <button 
          onClick={() => setActiveTab('list')}
          style={{ flex: 1, maxWidth: '200px', padding: '15px', backgroundColor: 'transparent', color: '#3f51b5', border: '1px solid #eee', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
        >
          <Search size={18} />
          募集を探す
        </button>
        <button 
          onClick={() => setActiveTab('post')}
          style={{ flex: 1, maxWidth: '200px', padding: '15px', backgroundColor: 'transparent', color: '#3f51b5', border: '1px solid #eee', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
        >
          <PlusCircle size={18} />
          新しく募集する
        </button>
      </div>

      {/* コンテンツエリア */}
      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        
        {/* 左側：連絡ログ */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#888' }}>
            <MessageSquare size={16} />
            <span style={{ fontSize: '13px', fontWeight: 'bold' }}>最新の連絡ログ</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recentComments.map(comment => (
              <div 
                key={comment.id} 
                onClick={() => onViewDetail(comment.recruitmentId)} // クリックイベントを追加
                style={{ 
                  ...styles.card, 
                  padding: '10px 12px', 
                  boxShadow: 'none', 
                  border: '1px solid #f0f0f0',
                  cursor: 'pointer', // カーソルをポインターに
                  position: 'relative',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
              >
                <div style={{ minWidth: 0, paddingRight: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '12px', color: '#3f51b5', flexShrink: 0 }}>
                      {comment.userName}
                    </span>
                    <span style={{ fontSize: '12px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
                      {comment.content}
                    </span>
                  </div>
                  <div style={{ fontSize: '9px', color: '#aaa', marginTop: '2px' }}>
                    {new Date(comment.id).toLocaleDateString()}
                  </div>
                </div>
                {/* 矢印アイコンを追加 */}
                <ChevronRight size={12} color="#eee" style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            ))}
          </div>
        </div>

        {/* 右側：新着募集 */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#888' }}>
            <Calendar size={16} />
            <span style={{ fontSize: '13px', fontWeight: 'bold' }}>新着の募集</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recentRecruitments.map(item => (
              <div 
                key={item.id} 
                onClick={() => onViewDetail ? onViewDetail(item.id) : setActiveTab('list')} // 詳細表示へ飛ばす
                style={{ 
                  ...styles.card, 
                  padding: '10px 12px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  boxShadow: 'none', 
                  border: '1px solid #f0f0f0',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '12px', color: '#444', flexShrink: 0 }}>
                      {item.author}
                    </span>
                    <span style={{ 
                      fontWeight: 'bold', 
                      fontSize: '12px', 
                      color: '#444', 
                      whiteSpace: 'nowrap', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      flex: 1 
                    }}>
                      {item.title}
                    </span>
                  </div>
                  <div style={{ fontSize: '9px', color: '#aaa', marginTop: '2px' }}>
                    {item.location} / {item.date}
                  </div>
                </div>
                <ChevronRight size={14} color="#eee" style={{ flexShrink: 0, marginLeft: '5px' }} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;