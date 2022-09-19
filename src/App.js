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

const Filter = (props) => {
  return(
    <p>
      Filter: <input value = {props.filter} onChange={props.onChange}/>
    </p>
  )
}

const PersonForm = (props) => {
  return(
    <div>
      <h3>Add a new...</h3>
          <form onSubmit={props.handleSubmit}>
            Name   
            <input value={props.newName} onChange={props.handleNameChange} /> 
            <p>
              Phone  
              <input value={props.newPhone} onChange={props.handlePhoneChange} />
              <button type="submit">add</button>
            </p>
          </form>
    </div>
  )
}


const Persons = ({filter, persons, removeData}) => {

  const handleClick = (event) => {
    const {name, id} = event.target; 
    if(window.confirm(`Are you sure you want to delete ${name}?`)){
      removeData(id);
    }
  } 
  return (
    <div>
      <h2>Numbers</h2>
      { persons
          .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map(person => 
              <p key={person.name}>{person.name} {person.number} 
              <button onClick={handleClick} name={person.name} id={person.id}> delete </button>
              </p>)}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
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
      console.log(JSON)
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
              <div>
                
                </div>
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
