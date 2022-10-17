import BlogForm from './BlogForm';
import Notification from './Notification';
import Togglable from './Togglable';
import BlogList from './BlogList';

const Home = ({
  blogs,
  user,
  createBlog,
}) => {
  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <BlogList blogs={blogs} />
      {user && (
        <Togglable buttonLabel={'create new blog?'}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
      )}
    </div>
  );
};

export default Home;
