import React, { useState } from 'react';
import { User, Save } from 'lucide-react';

function Registration({ user, setUser, styles }) {
  const [tempName, setTempName] = useState(user.name);

  const handleSave = () => {
    if (!tempName.trim()) {
      alert("名前を入力してください");
      return;
    }
    setUser({ ...user, name: tempName });
    alert("プロフィールを更新しました！");
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', color: '#3f51b5', marginBottom: '25px', fontWeight: '400' }}>
        プロフィール登録
      </h2>
      
      <div style={{ ...styles.card, padding: '30px' }}>
        <div style={{ marginBottom: '25px' }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            fontSize: '14px', 
            fontWeight: 'bold', 
            color: '#555', 
            marginBottom: '10px' 
          }}>
            <User size={18} color="#3f51b5" />
            表示名（ニックネーム）
          </label>
          <input 
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '6px', 
              border: '1px solid #ddd',
              fontSize: '14px',
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />
        </div>

        <button 
          onClick={handleSave}
          style={{ 
            width: '100%',
            padding: '12px',
            backgroundColor: '#3f51b5',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Save size={18} />
          設定を保存する
        </button>
      </div>
    </div>
  );
}

export default Registration;