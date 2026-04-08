import React, { useState } from 'react';
import { User, Mail, Calendar, Music, Mic2, FileText, CheckCircle, AlertCircle } from 'lucide-react';

function UserProfile({ user, setUser, styles, setActiveTab }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: '',
    genre: '',
    artist: '',
    bio: ''
  });
  
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.birthDate) {
      setError('生年月日を入力してください。');
      return;
    }
    const birth = new Date(formData.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) { age--; }

    if (age < 18) {
      setError('18歳未満の方は利用できません。');
      return;
    }

    if (!formData.name || !formData.email) {
      setError('ニックネームとメールアドレスは必須です。');
      return;
    }

    setUser({ ...formData, registered: true });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setActiveTab('home'); 
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '540px', margin: '0 auto', paddingTop: '5px' }}>
      
      {/* タイトルセクション：サイドバーと連動したアイコンを追加し、左寄せ青文字に修正 */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        marginBottom: '25px' 
      }}>
        <User size={24} color="#3f51b5" strokeWidth={1.5} />
        <h2 style={{ 
          fontSize: '1.5rem', 
          color: '#3f51b5', 
          fontWeight: '400', 
          margin: 0,
          letterSpacing: '0.5px'
        }}>
          新規ユーザー登録
        </h2>
      </div>

      <div style={{ ...styles.card, padding: '20px', boxShadow: 'none', border: '1px solid #f0f0f0' }}>
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* ニックネーム */}
            <div style={{ ...fieldStyle, flex: 1 }}>
              <label style={labelStyle}><User size={13} color="#3f51b5" /> ニックネーム</label>
              <input type="text" style={inputStyle} value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="奈央" />
            </div>
            {/* メールアドレス */}
            <div style={{ ...fieldStyle, flex: 1 }}>
              <label style={labelStyle}><Mail size={13} color="#3f51b5" /> メールアドレス</label>
              <input type="email" style={inputStyle} value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="mail@example.com" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            {/* 生年月日 */}
            <div style={{ ...fieldStyle, flex: 1 }}>
              <label style={labelStyle}><Calendar size={13} color="#3f51b5" /> 生年月日（18歳以上）</label>
              <input type="date" style={inputStyle} value={formData.birthDate}
                onChange={(e) => setFormData({...formData, birthDate: e.target.value})} />
            </div>
            {/* 好きなジャンル */}
            <div style={{ ...fieldStyle, flex: 1 }}>
              <label style={labelStyle}><Music size={13} color="#3f51b5" /> 好きなジャンル</label>
              <input type="text" style={inputStyle} value={formData.genre}
                onChange={(e) => setFormData({...formData, genre: e.target.value})} placeholder="J-POP, ロック等" />
            </div>
          </div>

          {/* 好きなアーティスト */}
          <div style={fieldStyle}>
            <label style={labelStyle}><Mic2 size={13} color="#3f51b5" /> 好きなアーティスト</label>
            <input type="text" style={inputStyle} value={formData.artist}
              onChange={(e) => setFormData({...formData, artist: e.target.value})} placeholder="例: Official髭男dism" />
          </div>

          {/* 自己紹介 */}
          <div style={fieldStyle}>
            <label style={labelStyle}><FileText size={13} color="#3f51b5" /> 自己紹介</label>
            <textarea
              style={{ ...inputStyle, minHeight: '60px', resize: 'none', lineHeight: '1.4' }}
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder="週末によく歌っています。よろしくお願いします！"
            />
          </div>

          {error && (
            <div style={{ color: '#f44336', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: '#fff5f5', padding: '8px', borderRadius: '6px' }}>
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <button type="submit" style={buttonStyle}>
            {isSaved ? <CheckCircle size={18} /> : 'アカウントを作成する'}
          </button>
        </form>
      </div>
    </div>
  );
}

const fieldStyle = { display: 'flex', flexDirection: 'column', gap: '4px' };
const labelStyle = { fontSize: '11px', fontWeight: 'bold', color: '#888', display: 'flex', alignItems: 'center', gap: '5px' };
const inputStyle = {
  padding: '8px 10px',
  borderRadius: '6px',
  border: '1px solid #eee',
  fontSize: '13px',
  outline: 'none',
  backgroundColor: '#fafafa'
};
const buttonStyle = {
  marginTop: '5px',
  padding: '10px',
  backgroundColor: '#3f51b5',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '13px',
  fontWeight: 'bold',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px'
};

export default UserProfile;