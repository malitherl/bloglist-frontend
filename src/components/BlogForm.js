import { useState } from 'react'
const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => setNewTitle(event.target.value)
  const handleAuthorChange = (event) => setNewAuthor(event.target.value)
  const handleUrlChange = (event) => setNewUrl(event.target.value)

  return (
    <div>
      <form onSubmit={createBlog}>
        Title
        <input value={newTitle} onChange={handleTitleChange} id= {'title'} required={true} placeholder={'title'}/>
        <br />
        Author
        <input value={newAuthor} onChange={handleAuthorChange} id= {'author'} required={true} placeholder={'author'} />
        <br />
        Blog Url
        <input value={newUrl} onChange={handleUrlChange} id={'url'} required={true} placeholder={'url'} />
        <button id={'save'} type="submit">create new blog</button>
      </form>
    </div>
  )
}
export default BlogForm;