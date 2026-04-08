function Sidebar({ isOpen, onClose }) {
  // isOpen が true のときだけ表示されるスタイル
  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    right: isOpen ? '0' : '-300px', // スイッチがオフなら画面の外（右側）に隠す
    width: '300px',
    height: '100%',
    backgroundColor: '#f8f9fa',
    boxShadow: '-2px 0 5px rgba(0,0,0,0.2)',
    transition: '0.3s ease-in-out', // ヌルッと動かすアニメーション
    padding: '80px 20px 20px', // ヘッダーに被らないように上の余白を多めに
    zIndex: 999,
  };

  return (
    <div style={sidebarStyle}>
      <button onClick={onClose} style={{ float: 'right' }}>×</button>
      <h3>メニュー</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={itemStyle}>マイページ</li>
        <li style={itemStyle}>お気に入り</li>
        <li style={itemStyle}>設定</li>
        <li style={itemStyle}>ログアウト</li>
      </ul>
    </div>
  );
}

const itemStyle = {
  padding: '15px 0',
  borderBottom: '1px solid #ddd',
  cursor: 'pointer'
};

export default Sidebar;