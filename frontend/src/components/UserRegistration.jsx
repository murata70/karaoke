import React, { useState } from 'react';
import { User, Mail, Calendar, Music2, Star, Save, AlertCircle, Trash2, UserCircle } from 'lucide-react';

function UserRegistration({ user, setUser, deleteUser, setActiveTab, styles }) {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    birthday: user.birthday || '',
    favoriteGenre: user.favoriteGenre || 'J-POP',
    favoriteArtist: user.favoriteArtist || '',
  });

  const checkAdult = (birthday) => {
    if (!birthday) return false;
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }
    return age >= 18;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!checkAdult(formData.birthday)) {
      alert("申し訳ありません。本アプリは18歳未満の方はご利用いただけません。");
      return;
    }
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("ニックネームとメールアドレスは必須です");
      return;
    }
    setUser({ ...user, ...formData, role: 'user' });
    alert("プロフィールを更新しました！");
  };

  const handleGuestSignUp = () => {
    const guestData = {
      name: 'ゲスト',
      email: 'guest@example.com',
      birthday: '2000-01-01',
      favoriteGenre: 'オールジャンル',
      favoriteArtist: '未設定',
      role: 'user'
    };
    setUser(guestData);
    setFormData(guestData);
    alert("ゲストとして登録しました！");
  };

  const handleDelete = () => {
    if (deleteUser()) {
      setActiveTab('home');
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd',
    fontSize: '14px', boxSizing: 'border-box', outline: 'none'
  };

  const labelStyle = {
    display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px',
    fontWeight: 'bold', color: '#555', marginBottom: '8px'
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <User size={24} color="#3f51b5" />
        <h2 style={{ fontSize: '1.8rem', color: '#3f51b5', margin: 0, fontWeight: '400' }}>ユーザー設定</h2>
      </div>

      <div style={{ ...styles.card, padding: '25px 35px', marginBottom: '20px' }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* ニックネームと生年月日を横並び (1:1) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={labelStyle}><User size={16} color="#3f51b5"/>ニックネーム</label>
              <input style={inputStyle} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="名前" />
            </div>
            <div>
              <label style={labelStyle}><Calendar size={16} color="#3f51b5"/>生年月日</label>
              <input type="date" style={inputStyle} value={formData.birthday} onChange={e => setFormData({...formData, birthday: e.target.value})} />
            </div>
          </div>

          {/* メールアドレス */}
          <div>
            <label style={labelStyle}><Mail size={16} color="#3f51b5"/>メールアドレス</label>
            <input type="email" style={inputStyle} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="example@mail.com" />
          </div>

          {/* ジャンルとアーティストを横並び */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={labelStyle}><Music2 size={16} color="#3f51b5"/>好きなジャンル</label>
              <select style={inputStyle} value={formData.favoriteGenre} onChange={e => setFormData({...formData, favoriteGenre: e.target.value})}>
                <option value="J-POP">J-POP</option>
                <option value="アニソン">アニソン</option>
                <option value="ボカロ">ボカロ</option>
                <option value="オールジャンル">オールジャンル</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}><Star size={16} color="#3f51b5"/>好きなアーティスト</label>
              <input style={inputStyle} value={formData.favoriteArtist} onChange={e => setFormData({...formData, favoriteArtist: e.target.value})} placeholder="アーティスト名" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '5px' }}>
            <button 
              type="button" 
              onClick={handleGuestSignUp}
              style={{ padding: '12px', backgroundColor: '#f5f5f5', color: '#666', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <UserCircle size={18} /> ゲスト登録
            </button>
            <button 
              type="submit" 
              style={{ padding: '12px', backgroundColor: '#3f51b5', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Save size={18} /> 保存する
            </button>
          </div>
        </form>
      </div>

      {/* 削除セクションを上に引き上げ */}
      <div style={{ ...styles.card, padding: '20px 30px', border: '1px solid #ffcdd2', backgroundColor: '#fffbfa' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '14px', color: '#d32f2f', marginTop: 0, marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={18} /> データの初期化
            </h3>
            <p style={{ fontSize: '11px', color: '#888', margin: 0 }}>
              登録したプロフィール情報をすべて削除します。
            </p>
          </div>
          <button 
            onClick={handleDelete}
            style={{ padding: '8px 16px', backgroundColor: 'transparent', color: '#d32f2f', border: '1px solid #d32f2f', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Trash2 size={14} /> 情報を削除
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserRegistration;