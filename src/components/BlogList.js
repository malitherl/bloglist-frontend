import { Link } from 'react-router-dom';
import { List, ListItem } from '@mui/material';
const BlogList = ({ blogs }) => {

  const style = {
    width: '100%',
    maxWidth: 250,
  }

  const linkType = {
    textDecoration: 'none',
    color: 'rgb(15,15,15)',
  }

  return (
    <div>
      <List sx={style}>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <ListItem key={blogs.indexOf(blog)}>
              <Link style={linkType} key={blog.id} to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default BlogList;
