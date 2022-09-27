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

  const createBlog = async (event) => {
    event.preventDefault();
    console.log(event.target.title.value)
    const newBlog = {
      'title': event.target.title.value,
      'author': event.target.author.value,
      'url': event.target.url.value,
      'likes': 0
    }
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        const addedBlog = [...blogs, returnedBlog]
        setBlogs(addedBlog)
      })
      .catch((e) => {
        setErrorMessage(e)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

  }

  const updateBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogService
      .update(id, updatedBlog)
      .then(() => {
        const mapping = blogs.map(blog => {
          if (blog.id === id) {
            return updatedBlog
          } else {
            return blog
          }
        })
        setBlogs(mapping)
      })
      .catch((e) => {
        setErrorMessage(e)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }


  const deleteBlog = async (id) => {
    const deletedBlog = id
    blogService
      .remove(id)
      .catch((e) => {
        setErrorMessage(e)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    const pruning = blogs.filter(blog => blog.id !== deletedBlog)
    setBlogs(pruning)
  }

  const handleUsernameChange = (event) => setUserName(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)


  return (
    <div>
      <h1>Blogs</h1>
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
      <div className='blogs'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={() => updateBlog(blog.id)} deleteBlog={() => deleteBlog(blog.id)} />
        )}
      </div>
    </div>
  )
}

export default App
