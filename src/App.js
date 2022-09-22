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

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    console.log('attemption to add new blog');
    console.log(newTitle, newAuthor, newUrl);
    try {
      const blog = {
        'title': newTitle,
        'author': newAuthor,
        'url': newUrl,
        'likes': 0
      }
      const response = blogService.create(blog)
      console.log(response)

    } catch (e) {
      setErrorMessage(e)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const handleLike = async () => {
    try {
      const incLike = blog.likes
      const id = blog.id
      const updatedBlog = {
        ...blog,
        likes: incLike + 1
      }
      blogService.update(id, updatedBlog)
      blog = updatedBlog;
    } catch (e) {
      console.log(e)
    }
  }


  const handleDelete = async (event) => {
    const blogToDelete = blog
    if (window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}`)) {
      try {
        const response = blogService.remove(event.target.id)
        console.log(response)
        console.log(blogToDelete)
      } catch (e) {
        console.log(e)
      }
    }
  }


  const handleUsernameChange = (event) => setUserName(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)


  const handleTitleChange = (event) => setNewTitle(event.target.value)
  const handleAuthorChange = (event) => setNewAuthor(event.target.value)
  const handleUrlChange = (event) => setNewUrl(event.target.value)



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
            <BlogForm
              newTitle={newTitle}
              newAuthor={newAuthor}
              newUrl={newUrl}
              handleTitleChange={handleTitleChange}
              handleAuthorChange={handleAuthorChange}
              handleUrlChange={handleUrlChange}
              handleBlogSubmit={handleBlogSubmit}
            />
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
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
      )}

    </div>
  )
}

export default App
