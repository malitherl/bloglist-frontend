const LoginForm = ({ 
    username,
    password,
    handleLogin, 
    handleUsernameChange, 
    handlePasswordChange, 
  }) => {
    
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
  )}
export default LoginForm