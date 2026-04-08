import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Users, LogOut, Home, Mic2, Calendar, Music, CheckCircle2, Bell, ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  // 登録用ステート
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [favoriteArtist, setFavoriteArtist] = useState('');
  const [musicGenre, setMusicGenre] = useState('J-POP');
  const [loading, setLoading] = useState(false);

  const genres = ['J-POP', 'アニソン', 'ロック', 'V系', '演歌・歌謡曲', 'ボカロ', '洋楽', 'その他'];

  const demoLogs = [
    { id: 1, time: '16:30', name: '奈央', content: '[5/10 梅田] 5分ほど遅れます、すみません！', confirmed: true },
    { id: 2, time: '15:45', name: '田中', content: '[5/15 難波] 楽しみにしてます！', confirmed: false },
    { id: 3, time: '12:10', name: '佐藤', content: '[5/10 梅田] 駅の北口に到着しました。', confirmed: true }
  ];

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
    } catch (error) { console.error("Fetch error:", error); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleAddUser = async () => {
    if (!nickname || !email || !birthDate || !favoriteArtist) return alert("全項目入力してください");
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/users', {
        nickname, email, passwordHash: 'pass123', musicGenre, favoriteArtist, birthDate
      });
      setNickname(''); setEmail(''); setBirthDate(''); setFavoriteArtist('');
      fetchUsers();
      alert("保存完了");
      setActiveTab('list');
    } catch (error) { alert("エラーが発生しました"); } finally { setLoading(false); }
  };

  const styles = {
    app: { display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f8', fontSize: '13px' },
    sidebar: { width: isSidebarOpen ? '220px' : '70px', backgroundColor: '#1a1a2e', color: '#fff', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column', padding: '15px 10px', position: 'relative' },
    toggleBtn: { position: 'absolute', right: '-12px', top: '20px', backgroundColor: '#3f51b5', borderRadius: '50%', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px', display: 'flex', zIndex: 10 },
    main: { flex: 1, padding: '25px', overflowY: 'auto' },
    card: { backgroundColor: '#fff', padding: '18px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '15px' },
    navItem: (active) => ({ display: 'flex', alignItems: 'center', padding: '12px', color: active ? '#fff' : '#adb5bd', backgroundColor: active ? '#3f51b5' : 'transparent', borderRadius: '6px', cursor: 'pointer', marginBottom: '5px', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden' }),
    inputGroup: { marginBottom: '15px' },
    label: { fontSize: '11px', color: '#666', fontWeight: 'bold', marginBottom: '4px', display: 'block' },
    input: { padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '13px', width: '100%', boxSizing: 'border-box' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' },
    th: { textAlign: 'left', padding: '8px', borderBottom: '2px solid #eee', color: '#888' },
    td: { padding: '8px', borderBottom: '1px solid #eee' }
  };

  return (
    <div style={styles.app}>
      {/* サイドバー */}
      <aside style={styles.sidebar}>
        <button style={styles.toggleBtn} onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        <div style={{ marginBottom: '30px', paddingLeft: '5px' }}>
          {isSidebarOpen ? <h2 style={{ fontSize: '1.1rem', margin: 0, whiteSpace: 'nowrap' }}>カラオケ募集くん</h2> : <Mic2 size={24} />}
        </div>

        <nav style={{ flex: 1 }}>
          <div style={styles.navItem(activeTab === 'home')} onClick={() => setActiveTab('home')}>
            <Home size={18} /> {isSidebarOpen && <span style={{ marginLeft: '12px' }}>ホーム</span>}
          </div>
          <div style={styles.navItem(activeTab === 'registration')} onClick={() => setActiveTab('registration')}>
            <UserPlus size={18} /> {isSidebarOpen && <span style={{ marginLeft: '12px' }}>ユーザー登録</span>}
          </div>
          <div style={styles.navItem(activeTab === 'list')} onClick={() => setActiveTab('list')}>
            <Users size={18} /> {isSidebarOpen && <span style={{ marginLeft: '12px' }}>募集・参加リスト</span>}
          </div>
        </nav>
        
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px', color: '#ff6b6b', cursor: 'pointer' }}>
          <LogOut size={18} /> {isSidebarOpen && <span style={{ marginLeft: '12px' }}>ログアウト</span>}
        </div>
      </aside>

      {/* メイン */}
      <main style={styles.main}>
        {activeTab === 'home' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' }}>
            <div>
              <div style={styles.card}>
                <h3 style={{ marginTop: 0, fontSize: '0.9rem', color: '#3f51b5', display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16}/> 次回の参加予定</h3>
                <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '6px', borderLeft: '4px solid #3f51b5' }}>
                  <div style={{ fontWeight: 'bold' }}>2026-05-10 14:00〜</div>
                  <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>場所：梅田付近 / ジャンル：J-POP</div>
                </div>
              </div>

              <div style={styles.card}>
                <h3 style={{ marginTop: 0, fontSize: '0.9rem', color: '#3f51b5', display: 'flex', alignItems: 'center', gap: '6px' }}><Bell size={16}/> 連絡ログ</h3>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>時刻</th>
                      <th style={styles.th}>名前</th>
                      <th style={styles.th}>内容</th>
                      <th style={styles.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoLogs.map(log => (
                      <tr key={log.id}>
                        <td style={{ ...styles.td, color: '#999', width: '50px' }}>{log.time}</td>
                        <td style={{ ...styles.td, fontWeight: 'bold', width: '60px' }}>{log.name}</td>
                        <td style={styles.td}>{log.content}</td>
                        <td style={{ ...styles.td, textAlign: 'right' }}>
                          {log.confirmed && <span style={{ fontSize: '10px', backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '2px 6px', borderRadius: '4px' }}>確認済</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ ...styles.card, textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#888' }}>累計参加回数</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3f51b5' }}>12 <span style={{ fontSize: '12px', color: '#333' }}>回</span></div>
              </div>
              <div style={styles.card}>
                <h3 style={{ marginTop: 0, fontSize: '0.85rem', color: '#888' }}>お知らせ</h3>
                <ul style={{ paddingLeft: '15px', fontSize: '12px', color: '#666', lineHeight: '1.8', margin: 0 }}>
                  <li>5/10 募集が満員になりました</li>
                  <li>本人確認が完了しました</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ユーザー登録画面 */}
        {activeTab === 'registration' && (
          <div style={{ maxWidth: '700px' }}>
            <div style={styles.card}>
              <h2 style={{ marginTop: 0, fontSize: '1.2rem', marginBottom: '20px' }}>ユーザー登録</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={styles.inputGroup}><label style={styles.label}>ニックネーム</label><input style={styles.input} value={nickname} onChange={(e) => setNickname(e.target.value)} /></div>
                <div style={styles.inputGroup}><label style={styles.label}>メールアドレス</label><input style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div style={styles.inputGroup}><label style={styles.label}>生年月日（年齢確認用）</label><input type="date" style={styles.input} value={birthDate} onChange={(e) => setBirthDate(e.target.value)} /></div>
                <div style={styles.inputGroup}><label style={styles.label}>主なアーティスト</label><input style={styles.input} value={favoriteArtist} onChange={(e) => setFavoriteArtist(e.target.value)} /></div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>得意ジャンル</label>
                  <select style={styles.input} value={musicGenre} onChange={(e) => setMusicGenre(e.target.value)}>
                    {genres.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>
              <button style={{ marginTop: '10px', padding: '10px 30px', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }} onClick={handleAddUser} disabled={loading}>
                {loading ? '保存中...' : 'プロフィールを保存'}
              </button>
            </div>
          </div>
        )}

        {/* 募集・参加リスト画面 */}
        {activeTab === 'list' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem' }}>募集・参加リスト</h2>
              <button style={{ padding: '8px 16px', backgroundColor: '#2e7d32', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>新規募集</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
              <div style={styles.card}>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>デモユーザー</div>
                <div style={{ fontSize: '12px', color: '#3f51b5', margin: '5px 0' }}>【J-POP】 米津玄師</div>
                <div style={{ fontSize: '11px', color: '#888' }}>2026-05-10 14:00〜</div>
                <button style={{ marginTop: '10px', width: '100%', border: '1px solid #3f51b5', color: '#3f51b5', background: 'none', padding: '6px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>詳細・参加</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;