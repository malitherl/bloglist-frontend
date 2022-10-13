import BlogForm from './BlogForm';
import Notification from './Notification';
import LoginForm from './LoginForm';
import Togglable from './Togglable';
import BlogList from './BlogList';

const Home = ({
  blogs,
  user,
  createBlog,
  handleLogin,
  handleLogout,
  handlePasswordChange,
  handleUsernameChange,
}) => {
  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {user && (
        <div>
          <p>welcome, {localStorage.getItem('username')}</p>
          <button type='button' onClick={handleLogout}>
            Logout
          </button>
          <Togglable buttonLabel={'create new blog?'}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      )}
      {!user && (
        <Togglable buttonLabel={'login'}>
          <LoginForm
            handleLogin={handleLogin}
            handlePasswordChange={handlePasswordChange}
            handleUsernameChange={handleUsernameChange}
          />
        </Togglable>
      )}
      <BlogList blogs={blogs} />
    </div>
  );
};

export default Home;
