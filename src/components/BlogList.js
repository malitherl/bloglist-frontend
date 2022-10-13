import { Link } from 'react-router-dom';
const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <li key={blogs.indexOf(blog)}>
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </li>
        ))}
    </div>
  );
};

export default BlogList;
