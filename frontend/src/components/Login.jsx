import React, { useState } from 'react';
import { Mic2, Lock, Mail } from 'lucide-react';

function Login({ onLogin, styles }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 簡易的なバリデーション
    if (email.trim() && password.trim()) {
      onLogin(); 
    } else {
      alert("メールアドレスとパスワードを入力してください");
    }
  };

  // ログイン画面専用の追加スタイル
  const loginCardStyle = {
    ...styles.card,
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#1a1a2e', 
      backgroundImage: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    }}>
      <div style={loginCardStyle}>
        {/* ロゴ・タイトルエリア */}
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <div style={{ 
            backgroundColor: '#3f51b5', 
            width: '60px', 
            height: '60px', 
            borderRadius: '15px', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            margin: '0 auto 15px' 
          }}>
            <Mic2 size={32} color="#fff" />
          </div>
          <h1 style={{ 
            color: '#1a1a2e', 
            margin: 0, 
            fontSize: '2rem', // 少しだけ大きくしてバランス調整
            letterSpacing: '2px',
            fontFamily: 'sans-serif',
            fontWeight: '800'
          }}>
            Utamy
          </h1>
          {/* 小さい文章（キャッチコピー）は削除しました */}
        </div>

        {/* ログインフォーム */}
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Mail size={14} /> メールアドレス
            </label>
            <input 
              type="email" 
              style={styles.input} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="example@mail.com"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Lock size={14} /> パスワード
            </label>
            <input 
              type="password" 
              style={styles.input} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            style={{ 
              width: '100%', 
              padding: '12px', 
              backgroundColor: '#3f51b5', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '6px', 
              fontWeight: 'bold', 
              fontSize: '14px',
              cursor: 'pointer', 
              marginTop: '15px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#303f9f'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3f51b5'}
          >
            ログイン
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '25px', fontSize: '11px', color: '#999' }}>
          <p>テスト用：何でも入力してログインできます</p>
        </div>
      </div>
    </div>
  );
}

export default Login;