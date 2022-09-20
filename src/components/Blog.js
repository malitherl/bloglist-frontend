import { useState } from "react"



const Blog = ({blog}) => {
  
const [toggle, setToggle] = useState(false);


const handleView = (() => setToggle(!toggle))

const showView = { display: toggle ? '' : 'none'}
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}


  return(
  <div style={blogStyle}>
    {blog.title} by {blog.author} <button onClick={handleView}>view</button>
    
    <div style={showView}>
      <p>url: {blog.url}</p>
      <p>likes: {blog.likes}</p>
      <button onClick={handleView}>hide</button>
    </div>
  </div>  )
}

export default Blog