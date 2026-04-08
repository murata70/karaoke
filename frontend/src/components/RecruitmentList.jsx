import React, { useState } from 'react';
import { Search, MapPin, Music2, Calendar, Users, Send, ChevronLeft, XCircle, Info, MessageSquare } from 'lucide-react';

function RecruitmentList({ user, isAdmin, recruitments, comments, applyToRecruitment, deleteRecruitment, setComments, setActiveTab, styles, initialSelectedId }) {
  const [selectedItem, setSelectedItem] = useState(() => {
    if (initialSelectedId) {
      return recruitments.find(r => r.id === initialSelectedId) || null;
    }
    return null;
  });
  
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('すべて');
  const [detailTab, setDetailTab] = useState('info');

  const getParticipantCount = (recruitmentId) => {
    return comments.filter(c => c.recruitmentId === recruitmentId && c.confirmed).length;
  };

  const getRecruitmentComments = (recruitmentId) => {
    return comments.filter(c => c.recruitmentId === recruitmentId);
  };

  // 自分が既に参加しているかチェック
  const isAlreadyJoined = selectedItem && comments.some(c => 
    c.recruitmentId === selectedItem.id && c.userName === user.name && c.confirmed
  );

  // 参加キャンセル処理
  const handleCancelJoin = () => {
    if (window.confirm("この募集への参加をキャンセルしますか？")) {
      const newComments = comments.filter(c => 
        !(c.recruitmentId === selectedItem.id && c.userName === user.name)
      );
      setComments(newComments);
      alert("参加をキャンセルしました。");
      setSelectedItem(null);
      setActiveTab('home');
    }
  };

  const handleApply = () => {
    if (!message.trim()) { alert("メッセージを入力してください"); return; }
    if (window.confirm(`「${selectedItem.title}」に参加を申し込みますか？`)) {
      applyToRecruitment(selectedItem, message);
      alert("メッセージを送信しました！");
      setMessage('');
      setSelectedItem(null);
      setActiveTab('home');
    }
  };

  // --- 1. 一覧表示画面 ---
  if (!selectedItem) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <Search size={24} color="#3f51b5" />
          <h2 style={{ fontSize: '1.8rem', color: '#3f51b5', margin: 0, fontWeight: '400' }}>募集を探す</h2>
        </div>
        
        {/* 検索・フィルタ */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', alignItems: 'center' }}>
          <div style={{ flex: '2', position: 'relative', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee' }}>
            <Search size={16} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
            <input type="text" placeholder="キーワード検索..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '10px 10px 10px 40px', border: 'none', background: 'transparent', fontSize: '14px', outline: 'none' }} />
          </div>
          <div style={{ flex: '1', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee', padding: '0 15px' }}>
            <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)} style={{ width: '100%', padding: '10px 0', border: 'none', background: 'transparent', fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
              <option value="すべて">全ジャンル</option>
              <option value="J-POP">J-POP</option>
              <option value="アニソン">アニソン</option>
              <option value="ボカロ">ボカロ</option>
              <option value="オールジャンル">オールジャンル</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {recruitments
            .filter(r => genreFilter === 'すべて' || r.musicGenre === genreFilter)
            .filter(r => r.title.includes(searchQuery) || r.content.includes(searchQuery))
            .map(item => {
              const participants = getParticipantCount(item.id);
              const isFull = participants >= item.capacity;
              return (
                <div key={item.id} onClick={() => setSelectedItem(item)} style={{ ...styles.card, padding: '12px 20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: isFull ? 0.8 : 1 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* ニックネームとタイトルの並び（ホーム画面と統一） */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#3f51b5', flexShrink: 0 }}>
                        {item.author}
                      </span>
                      <span style={{ 
                        fontWeight: 'bold', 
                        fontSize: '16px', 
                        color: '#333',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis' 
                      }}>
                        {item.title}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#666' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {item.location}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {item.date}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14} /> {participants} / {item.capacity}名</span>
                    </div>
                  </div>
                  <span style={{ padding: '2px 10px', backgroundColor: '#e8eaf6', color: '#3f51b5', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', flexShrink: 0, marginLeft: '10px' }}>
                    {item.musicGenre}
                  </span>
                </div>
              );
          })}
        </div>
      </div>
    );
  }

  // --- 2. 詳細表示画面 ---
  const currentParticipants = getParticipantCount(selectedItem.id);
  const remainingSlots = selectedItem.capacity - currentParticipants;
  const itemComments = getRecruitmentComments(selectedItem.id);

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto' }}>
      <button onClick={() => setSelectedItem(null)} style={{ display: 'flex', alignItems: 'center', gap: '5px', border: 'none', background: 'none', color: '#3f51b5', cursor: 'pointer', marginBottom: '15px', fontSize: '14px' }}>
        <ChevronLeft size={18} /> 一覧に戻る
      </button>

      <div style={{ ...styles.card, padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '25px 25px 15px 25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
            <h2 style={{ fontSize: '1.4rem', margin: 0 }}>{selectedItem.title}</h2>
            <span style={{ padding: '4px 12px', backgroundColor: '#e8eaf6', color: '#3f51b5', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>{selectedItem.musicGenre}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <div style={{ backgroundColor: '#f9f9f9', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#999' }}>場所</div>
              <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{selectedItem.location}</div>
            </div>
            <div style={{ backgroundColor: '#f9f9f9', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#999' }}>日時</div>
              <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{selectedItem.date}</div>
            </div>
            <div style={{ backgroundColor: '#f9f9f9', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#999' }}>定員</div>
              <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{currentParticipants}/{selectedItem.capacity}名</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #eee' }}>
          <button onClick={() => setDetailTab('info')} style={{ flex: 1, padding: '12px', border: 'none', background: 'none', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', color: detailTab === 'info' ? '#3f51b5' : '#888', borderBottom: detailTab === 'info' ? '2px solid #3f51b5' : 'none' }}>
            <Info size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> 募集内容
          </button>
          <button onClick={() => setDetailTab('chat')} style={{ flex: 1, padding: '12px', border: 'none', background: 'none', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', color: detailTab === 'chat' ? '#3f51b5' : '#888', borderBottom: detailTab === 'chat' ? '2px solid #3f51b5' : 'none' }}>
            <MessageSquare size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> やり取り ({itemComments.length})
          </button>
        </div>

        <div style={{ padding: '20px', minHeight: '120px' }}>
          {detailTab === 'info' ? (
            <div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>投稿者: {selectedItem.author}</div>
              <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', margin: 0 }}>{selectedItem.content}</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {itemComments.map(c => (
                <div key={c.id} style={{ alignSelf: c.userName === user.name ? 'flex-end' : 'flex-start', maxWidth: '90%' }}>
                  <div style={{ fontSize: '10px', color: '#aaa', marginBottom: '2px' }}>{c.userName}</div>
                  <div style={{ backgroundColor: c.userName === user.name ? '#3f51b5' : '#f0f2f5', color: c.userName === user.name ? '#fff' : '#444', padding: '8px 12px', borderRadius: '10px', fontSize: '13px' }}>{c.content}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: '20px', borderTop: '1px solid #eee', backgroundColor: '#fafafa' }}>
          {isAlreadyJoined ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: '#4caf50', fontWeight: 'bold', marginBottom: '10px' }}>この募集に参加済みです</p>
              <button onClick={handleCancelJoin} style={{ width: '100%', padding: '12px', backgroundColor: '#fff', color: '#ff4d4f', border: '1px solid #ff4d4f', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <XCircle size={18} /> 参加をキャンセルする
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <textarea 
                placeholder={remainingSlots <= 0 ? "満員です" : "メッセージを入力..."} 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                disabled={remainingSlots <= 0}
                style={{ flex: 1, height: '40px', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '13px', resize: 'none' }}
              />
              <button onClick={handleApply} disabled={remainingSlots <= 0} style={{ padding: '0 20px', backgroundColor: remainingSlots <= 0 ? '#ccc' : '#3f51b5', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>参加</button>
            </div>
          )}

          {(isAdmin || selectedItem.author === user.name) && (
            <button onClick={() => { if(window.confirm("中止しますか？")) { deleteRecruitment(selectedItem.id); setSelectedItem(null); }}} style={{ marginTop: '10px', width: '100%', padding: '8px', background: 'none', border: '1px solid #ff4d4f', color: '#ff4d4f', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>募集を中止する</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecruitmentList;