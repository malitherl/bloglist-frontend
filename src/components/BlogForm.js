const BlogForm = ({ newAuthor, newTitle, newUrl, handleAuthorChange, handleTitleChange, handleUrlChange, handleBlogSubmit}) => {
    return (
      <div>
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
    )}
export default BlogForm;