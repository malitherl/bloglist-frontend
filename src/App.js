import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const JSONuser = localStorage.getItem('blogUser')
    if (JSONuser) {
      const user = JSON.parse(JSONuser);
      setUser(user)
      blogService.setToken(user.token);
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);

    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUserName(username)
      setPassword(password)
      localStorage.setItem('username', username)
      localStorage.setItem('password', password)
      localStorage.setItem('blogUser', JSON.stringify(user));
      blogService.setToken(user.token)
    } catch (exception) {
      setErrorMessage('Error: Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    try {
      setUser(null);
      setUserName('')
      setPassword('')
      localStorage.clear();
      localStorage.removeItem('blogUser');
    } catch (e) {
      setErrorMessage(e)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const createBlog = async (newBlog) => {
    try {
      const response = blogService.create(newBlog)
      console.log(response)
    } catch (e) {
      setErrorMessage(e)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (updatedBlog, id) => {
    try {
      blogService.update(id, updatedBlog)
    } catch (e) {
      setErrorMessage(e)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      const response = blogService.remove(id)
      console.log(response)
    } catch (e) {
      setErrorMessage(e)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUsernameChange = (event) => setUserName(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)

  return (
    <div>

      <Notification message={errorMessage} />
      {user &&
        <div>
          <p>welcome, {localStorage.getItem('username')}</p>
          <button
            type='button'
            onClick={handleLogout}>
            Logout
          </button>
          <Togglable buttonLabel={'create new blog?'}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      }
      {
        !user &&

        <Togglable buttonLabel={'login'}>
          <LoginForm
            handleLogin={handleLogin}
            handlePasswordChange={handlePasswordChange}
            handleUsernameChange={handleUsernameChange} />
        </Togglable>
      }

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog= {updateBlog} deleteBlog={deleteBlog} />
      )}

    </div>
  )
}

export default App
