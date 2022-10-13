import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom';
import Blog from './components/Blog';
import Home from './components/Home';
import blogService from './services/blogs';
import loginService from './services/login';
import userService from './services/users';
import { messageChange, messageDefault } from './reducers/notificationReducer';
import { setBlogList } from './reducers/blogReducer';
import { setUser, logout } from './reducers/userReducer';
import Users from './components/Users';
import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';

const App = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogList(blogs)));
  }, []);

  useEffect(() => {
    const JSONuser = localStorage.getItem('blogUser');
    if (JSONuser) {
      const user = JSON.parse(JSONuser);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);

  const blogs = useSelector((state) => state.blog);
  const blogsCopy = blogs.slice();

  const user = useSelector((state) => state.user);
  const userCopy = { ...user };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });
      dispatch(setUser(user));
      setUserName(username);
      setPassword(password);
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      localStorage.setItem('blogUser', JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (e) {
      dispatch(messageChange(e));
      setTimeout(() => dispatch(messageDefault('')), 5000);
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
      setUserName('');
      setPassword('');
      localStorage.clear();
      localStorage.removeItem('blogUser');
    } catch (e) {
      dispatch(messageChange(e));
      setTimeout(() => dispatch(messageDefault('')), 5000);
    }
  };

  const createBlog = async (event) => {
    event.preventDefault();
    console.log(event.target.title.value);
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0,
    };
    blogService
      .create(newBlog)
      .then((returnedBlog) => {
        const updatedBlogList = [...blogs, returnedBlog];
        dispatch(setBlogList(updatedBlogList));
        dispatch(
          messageChange(`You have added ${newBlog.title} by ${newBlog.author}`)
        );
        setTimeout(() => dispatch(messageDefault('')), 5000);
      })
      .catch((e) => {
        dispatch(messageChange(e));
        setTimeout(() => dispatch(messageDefault('')), 5000);
      });
  };

  const updateBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    blogService
      .update(id, updatedBlog)
      .then(() => {
        const mapping = blogs.map((blog) => {
          if (blog.id === id) {
            return updatedBlog;
          } else {
            return blog;
          }
        });
        dispatch(setBlogList(mapping));
      })
      .catch((e) => {
        dispatch(messageChange(e));
        setTimeout(() => dispatch(messageDefault('')), 5000);
      });
  };

  const deleteBlog = async (id) => {
    const deletedBlog = id;
    blogService.remove(id).catch((e) => {
      dispatch(messageChange(e));
      setTimeout(() => dispatch(messageDefault('')), 5000);
    });
    const pruning = blogs.filter((blog) => blog.id !== deletedBlog);
    dispatch(setBlogList(pruning));
  };

  const handleUsernameChange = (event) => setUserName(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  return (
    <div>
      <div className='blogs'>
        <Router>
          <Navigation user= {userCopy} handleLogout={handleLogout} />
          {<Routes>
            <Route path='/' element={<Home blogs= {blogsCopy} user={userCopy} createBlog={createBlog}
              handleLogin={handleLogin} handleLogout={handleLogout}
              handlePasswordChange={handlePasswordChange} handleUsernameChange={handleUsernameChange} />} />
            {
              blogsCopy.map((blog) => (
                <Route path={`/blogs/${blog.id}`} key={blogsCopy.indexOf(blog)} element={
                  <Blog key={blog.id} blog={blog} updateBlog={() => updateBlog(blog.id)} deleteBlog={() => deleteBlog(blog.id)} />}
                />
              ))
            }
            <Route path={'/users'} element= {<Users users = {users}/>} />
            <Route path={'/login'} element= {<LoginForm
              handleLogin={handleLogin}
              handlePasswordChange={handlePasswordChange}
              handleUsernameChange={handleUsernameChange}/>}/>
          </Routes>
          }
        </Router>
      </div>
    </div>
  );
};

export default App;
