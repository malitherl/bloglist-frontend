import PropTypes from 'prop-types';

const LoginForm = React.forwardRef(({ 
    username,
    password,
    handleLogin, 
    handleUsernameChange, 
    handlePasswordChange, 
  }, ref) => {
    
  return(
    <form onSubmit={handleLogin}>
    <div>
      username: 
      <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      password: 
        <input
          type="text"
          value={password}
          placeholder="Password"
          onChange={handlePasswordChange}
        />
    </div>
    <button type='submit'>Login</button>
  </form>
)})

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired
}

export default LoginForm