import { useState } from "react"
import blogService from '../services/blogs'


const Blog = ({blog}) => {

const [toggle, setToggle] = useState(false);
const handleView = (() => setToggle(!toggle))

const handleLike = async () => {
  try {
    const incLike = blog.likes
    const id = blog.id
    const updatedBlog = {
      ...blog, 
      likes: incLike+1
    }
    blogService.update(id, updatedBlog)
    blog = updatedBlog;
  } catch (e) {
    console.log(e)
  }  
}


const handleDelete = async (event) => {
  const blogToDelete = blog
  if(window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}`)){
    try {
      const response = blogService.remove(event.target.id)
      console.log(response)
      console.log(blogToDelete)
    } catch (e) {
      console.log(e)
    }
  }
}



const showView = { display: toggle ? '' : 'none'}
const hideView = { display: toggle ? 'none' : ''}
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}


return(
  <div style={blogStyle}>
    {blog.title} by {blog.author}<button style= {hideView} onClick={handleView}>view</button>
    <div style={showView}><button onClick={handleView}>hide</button>
      <p>url: {blog.url}</p>
      <p>likes: {blog.likes} <button onClick={handleLike}>like</button></p>
      <button id= {blog.id} onClick={handleDelete}>remove</button>
    </div>
  </div>  
  )
}

export default Blog