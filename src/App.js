import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({message}) => {
  if(message == null){
    return null
  } else {
    let notifStyle = {}
    if(message.toLowerCase().includes('error')){
       notifStyle = {
        border: "1px solid red",
        color: "red"
      }
    } else {
      notifStyle = {
        border: "1px solid yellowgreen",
        color: "yellowgreen"
      }
    }  
    return(
      <div className='notification' style={notifStyle}>
        {message}
      </div>
    )
  }
}


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
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const JSONuser = localStorage.getItem('blogUser')
    if(JSONuser){
      const user = JSON.parse(JSONuser);
      setUser(user)
      blogService.setToken(user.token);
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault(); 
    console.log('logging in with', username, password);

    try{
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

  const handleLogout = async (event) => {
    console.log('logging out');
    try {
      setUser(null);
      setUserName('')
      setPassword('')
      localStorage.clear();
      localStorage.removeItem('blogUser');
    } catch (e){
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
        "title": newTitle,
        "author": newAuthor, 
        "url": newUrl,
        "likes": 0
      }
      const response = blogService.create(blog) 
      

    } catch (e) {
      setErrorMessage(e)
      setTimeout(()=> {
        setErrorMessage(null)
      }, 5000)
    }
  }

  
  const handleTitleChange = (event) => setNewTitle(event.target.value)
  const handleAuthorChange = (event) => setNewAuthor(event.target.value)
  const handleUrlChange = (event) => setNewUrl(event.target.value)



  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <Notification message={errorMessage} />
      { user && 
          <div>
            <p>welcome, {username}</p>
               <button 
                  type='button' 
                  onClick={handleLogout}>
                      Logout
                </button>
                <h3>Add a new...</h3>
          <form onSubmit={handleBlogSubmit}>
            Title   
            <input value={newTitle} onChange={handleTitleChange} required={true}/> 
            <br/>
            Author  
            <input value={newAuthor} onChange={handleAuthorChange} required={true}/>
            <br/>
            Blog Url 
            <input value={newUrl} onChange={handleUrlChange} required={true}/>
            <button type="submit">create new blog</button>  
          </form>
          
         </div>
        } 
        
        { !user && 
            <form onSubmit={handleLogin}>
            <div>
              username: 
              <input
                type="text"
                value={username}
                placeholder="Username"
                onChange={({target}) => setUserName(target.value)}
              />
            </div>
            <div>
              password: 
                <input
                  type="text"
                  value={password}
                  placeholder="Password"
                  onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type='submit'>Login</button>
          </form>
        }
        
    </div>
  )
}

export default App
