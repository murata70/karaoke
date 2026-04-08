import React, { useState } from 'react';
import { PlusCircle, MapPin, Calendar, Users, Music2, FileText, Send } from 'lucide-react';

function PostForm({ addRecruitment, setActiveTab, styles }) {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    capacity: 2,
    musicGenre: 'J-POP',
    content: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.location || !formData.date) {
      alert("必須項目（タイトル・場所・日付）を入力してください");
      return;
    }

    const confirmPost = window.confirm(
      `以下の内容で募集を公開しますか？\n\nタイトル: ${formData.title}\n場所: ${formData.location}\n日付: ${formData.date}`
    );

    if (confirmPost) {
      addRecruitment(formData);
      alert("募集を公開しました！");
      setActiveTab('list');
    }
  };

  const inputStyle = {
    width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd',
    fontSize: '14px', outline: 'none', boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px',
    fontWeight: 'bold', color: '#555', marginBottom: '6px'
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <PlusCircle size={24} color="#3f51b5" />
        <h2 style={{ fontSize: '1.8rem', color: '#3f51b5', margin: 0, fontWeight: '400' }}>新しく募集する</h2>
      </div>

      <div style={{ ...styles.card, padding: '25px 35px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div>
            <label style={labelStyle}><FileText size={16} color="#3f51b5"/> タイトル</label>
            <input 
              style={inputStyle} 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              placeholder="例：週末にみんなでカラオケ！" 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={labelStyle}><MapPin size={16} color="#3f51b5"/> 開催場所</label>
              <input 
                style={inputStyle} 
                value={formData.location} 
                onChange={e => setFormData({...formData, location: e.target.value})} 
                placeholder="例：梅田・難波" 
              />
            </div>
            <div>
              <label style={labelStyle}><Calendar size={16} color="#3f51b5"/> 開催日</label>
              <input 
                type="date" 
                style={inputStyle} 
                value={formData.date} 
                onChange={e => setFormData({...formData, date: e.target.value})} 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={labelStyle}><Users size={16} color="#3f51b5"/> 募集定員 (名)</label>
              <input 
                type="number" 
                min="1" 
                max="10"
                style={inputStyle} 
                value={formData.capacity} 
                onChange={e => setFormData({...formData, capacity: parseInt(e.target.value)})} 
              />
            </div>
            <div>
              <label style={labelStyle}><Music2 size={16} color="#3f51b5"/> ジャンル</label>
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
            <label style={labelStyle}><FileText size={16} color="#3f51b5"/> 詳細内容</label>
            <textarea 
              style={{ ...inputStyle, height: '80px', resize: 'none' }} 
              value={formData.content} 
              onChange={e => setFormData({...formData, content: e.target.value})} 
              placeholder="歌いたい曲や雰囲気を自由に書いてください"
            />
          </div>

          <button 
            type="submit" 
            style={{ 
              marginTop: '5px', padding: '14px', backgroundColor: '#3f51b5', color: 'white', 
              border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' 
            }}
          >
            <Send size={18} /> 募集を公開する
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostForm;