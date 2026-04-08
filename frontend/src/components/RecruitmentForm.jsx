import React, { useState } from 'react';
import { Send, MapPin, Music2, Tag, AlignLeft, Calendar, Users, XCircle } from 'lucide-react';

function PostForm({ addRecruitment, setActiveTab, styles }) {
  // 今日の日付を取得（YYYY-MM-DD形式）して、過去日を選択不可にする
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: today, // 初期値を今日にする
    musicGenre: 'J-POP',
    capacity: 4, 
    content: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // バリデーションチェック
    if (!formData.title.trim()) {
      alert("タイトルを入力してください");
      return;
    }
    if (!formData.location.trim()) {
      alert("場所を入力してください");
      return;
    }
    if (!formData.date) {
      alert("日付を選択してください");
      return;
    }
    if (formData.capacity < 1 || formData.capacity > 20) {
      alert("定員は1名から20名の間で設定してください");
      return;
    }
    
    addRecruitment(formData);
    alert("募集を投稿しました！");
    setActiveTab('home');
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
      <h2 style={{ fontSize: '1.5rem', color: '#3f51b5', marginBottom: '25px', fontWeight: '400' }}>
        新しく募集する
      </h2>

      <div style={{ ...styles.card, padding: '30px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={labelStyle}><Tag size={16} color="#3f51b5"/>タイトル</label>
            <input 
              style={inputStyle} 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              placeholder="募集のタイトル" 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={labelStyle}><Calendar size={16} color="#3f51b5"/>日付</label>
              <input 
                type="date" 
                style={inputStyle} 
                min={today} // 【追加】今日より前の日付を選択不可に
                value={formData.date} 
                onChange={e => setFormData({...formData, date: e.target.value})} 
              />
            </div>
            <div>
              <label style={labelStyle}><Users size={16} color="#3f51b5"/>定員（人数）</label>
              <input 
                type="number" 
                min="1" 
                max="20" // 【追加】最大20名までに制限
                style={inputStyle} 
                value={formData.capacity} 
                onChange={e => setFormData({...formData, capacity: parseInt(e.target.value) || 1})} 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={labelStyle}><MapPin size={16} color="#3f51b5"/>場所</label>
              <input 
                style={inputStyle} 
                value={formData.location} 
                onChange={e => setFormData({...formData, location: e.target.value})} 
                placeholder="例：梅田ジャンカラ" 
              />
            </div>
            <div>
              <label style={labelStyle}><Music2 size={16} color="#3f51b5"/>ジャンル</label>
              <select 
                style={inputStyle} 
                value={formData.musicGenre} 
                onChange={e => setFormData({...formData, musicGenre: e.target.value})}
              >
                <option value="J-POP">J-POP</option>
                <option value="アニソン">アニソン</option>
                <option value="ボカロ">ボカロ</option>
                <option value="洋楽">洋楽</option>
                <option value="ロック">ロック</option>
                <option value="演歌">演歌</option>
                <option value="オールジャンル">オールジャンル</option>
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle}><AlignLeft size={16} color="#3f51b5"/>内容</label>
            <textarea 
              style={{ ...inputStyle, height: '80px', resize: 'none' }} 
              value={formData.content} 
              onChange={e => setFormData({...formData, content: e.target.value})} 
              placeholder="自由に入力してください" 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
            <button 
              type="button" 
              onClick={() => setActiveTab('home')}
              style={{ padding: '14px', backgroundColor: '#f5f5f5', color: '#666', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <XCircle size={18} /> 募集を中止する
            </button>
            <button 
              type="submit"
              style={{ padding: '14px', backgroundColor: '#3f51b5', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Send size={18} /> 新しく募集する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;