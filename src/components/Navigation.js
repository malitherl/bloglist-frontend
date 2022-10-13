import { Link } from 'react-router-dom';

const Navigation = ({ handleLogout }) => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-evenly'
  }


  return (
    <div style= {navStyle}>
      <Link to='/'>blogs</Link>
      <Link to='/users'>users</Link>
      welcome, {localStorage.getItem('username')}
      <button type='button' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navigation;
