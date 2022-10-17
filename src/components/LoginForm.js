import { TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
const LoginForm = React.forwardRef(({
  username,
  password,
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
}, ) => {

  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          label="username"
          type="text"
          value={username}
          placeholder="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <TextField
          label="password"
          type="text"
          value={password}
          placeholder="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <Button type='submit'>Login</Button>
    </form>
  )
})
LoginForm.displayName = 'LoginForm'
LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired
}

export default LoginForm