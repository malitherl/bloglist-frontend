import { useState } from 'react'


const Blog = ({ blog, updateBlog, deleteBlog }) => {

  const [toggle, setToggle] = useState(false);
  const handleView = (() => setToggle(!toggle))

  const showView = { display: toggle ? '' : 'none' }
  const hideView = { display: toggle ? 'none' : '' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className="blogElement"style={blogStyle}>
      {blog.title} by {blog.author}<button style={hideView} onClick={handleView}>view</button>
      <div style={showView} className="toggable"><button onClick={handleView}>hide</button>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes} <button id={'like'} onClick={updateBlog}>like</button></p>
        <button id={'delete'} onClick={deleteBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog