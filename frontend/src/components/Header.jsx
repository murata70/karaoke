function Header({ onLoginClick }) {
  return (
    <header style={headerStyle}>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>🎤 Karaoke Match</h1>
      <button onClick={onLoginClick} style={buttonStyle}>
        ログイン
      </button>
    </header>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px',
  height: '60px',
  backgroundColor: '#333',
  color: 'white',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000
};

const buttonStyle = {
  padding: '8px 16px',
  backgroundColor: '#ff4757',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Header;