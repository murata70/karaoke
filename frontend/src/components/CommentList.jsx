import React from 'react';
import { Bell, ArrowLeft } from 'lucide-react';

function CommentList({ comments, handleConfirm, styles, setActiveTab }) {
  return (
    <div style={styles.card}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('home')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#666' }}>
          <ArrowLeft size={20} />
        </button>
        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>連絡ログ一覧</h2>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>日付・時刻</th>
            <th style={styles.th}>名前</th>
            <th style={styles.th}>内容</th>
            <th style={styles.th}>状態</th>
          </tr>
        </thead>
        <tbody>
          {comments.map(log => (
            <tr key={log.id}>
              <td style={{ ...styles.td, color: '#999', width: '150px' }}>
                {new Date(log.createdAt).toLocaleString([], { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
              </td>
              <td style={{ ...styles.td, fontWeight: 'bold', width: '80px' }}>{log.userName}</td>
              <td style={styles.td}>{log.content}</td>
              <td style={{ ...styles.td, textAlign: 'right', width: '100px' }}>
                {log.confirmed ? (
                  <span style={{ fontSize: '11px', backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '4px 8px', borderRadius: '4px' }}>確認済</span>
                ) : (
                  <button onClick={() => handleConfirm(log.id)} style={{ fontSize: '11px', cursor: 'pointer', border: '1px solid #3f51b5', borderRadius: '4px', background: '#fff', color: '#3f51b5', padding: '4px 8px' }}>確認する</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CommentList;