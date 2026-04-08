import React from 'react';
import { MessageSquare, Clock, ChevronRight } from 'lucide-react';

function MessageLogs({ comments, styles, onViewDetail }) {
  const sortedComments = [...comments].reverse();

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      {/* タイトル：サイドバーと同じアイコン + 青文字(#3f51b5) */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        marginBottom: '25px'
      }}>
        <MessageSquare size={24} color="#3f51b5" strokeWidth={1.5} />
        <h2 style={{ 
          fontSize: '1.5rem', 
          color: '#3f51b5', // ここを確実に青に修正しました
          fontWeight: '400', 
          margin: 0,
          letterSpacing: '0.5px'
        }}>
          連絡ログ
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {comments.length === 0 ? (
          <div style={{ 
            ...styles.card, 
            height: '150px', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            color: '#bbb',
            fontSize: '13px',
            boxShadow: 'none',
            border: '1px solid #f0f0f0'
          }}>
            まだやり取りはありません。
          </div>
        ) : (
          sortedComments.map(comment => (
            <div 
              key={comment.id} 
              onClick={() => onViewDetail(comment.recruitmentId)}
              style={{ 
                ...styles.card, 
                padding: '10px 18px', 
                cursor: 'pointer',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                boxShadow: 'none',
                border: '1px solid #f0f0f0',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
            >
              <div style={{ position: 'relative', width: '100%', minWidth: 0 }}>
                {/* 1段目：ニックネームとメッセージ内容 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px', paddingRight: '20px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '12px', color: '#3f51b5', flexShrink: 0 }}>
                    {comment.userName}
                  </span>
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#666', 
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    flex: 1
                  }}>
                    {comment.content}
                  </span>
                </div>
                
                {/* 2段目：下部中央の日付 */}
                <div style={{ 
                  fontSize: '9px', 
                  color: '#ccc', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '4px'
                }}>
                  <Clock size={10} /> {new Date(comment.id).toLocaleString()}
                </div>

                {/* 右端の矢印 */}
                <ChevronRight 
                  size={14} 
                  color="#eee" 
                  style={{ 
                    position: 'absolute', 
                    right: '-5px', 
                    top: '50%', 
                    transform: 'translateY(-50%)' 
                  }} 
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MessageLogs;