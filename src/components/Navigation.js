import { Link } from 'react-router-dom';

const Navigation = ({ user, handleLogout }) => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-evenly'
  }
  console.log(user.name)

  return (
    <div style= {navStyle}>
      <Link to='/'>blogs</Link>
      <Link to='/users'>users</Link>
      {user.name && `welcome, ${localStorage.getItem('username')}` &&
        <button type='button' onClick={handleLogout}>
          Logout
        </button>
      }
      {
        !user.name && <button> <Link to="/login">login</Link> </button>
      }

    </div>
  );
};

export default Navigation;
