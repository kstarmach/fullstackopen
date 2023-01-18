import { useSelector, useDispatch } from 'react-redux';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  //const user = blog.user;
  const user = useSelector((state) => state.user);

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure?`)) {
      dispatch(deleteBlog(id));
    }
  };

  const handleLike = (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: user };
    dispatch(likeBlog(blogToUpdate));
  };

  return (
    <tr>
      <td>{blog.title} </td>
      <td>{blog.author}</td>
      <td>{blog.likes}</td>
      <td>
        <button onClick={() => handleLike(blog)}>like</button>
        {blog.user === user ? (
          <button onClick={() => handleDelete(blog.id)}>delete</button>
        ) : (
          ''
        )}
      </td>
    </tr>
  );
};

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <table>
      <thead>
        <tr>
          <th>tittle</th>
          <th>author</th>
          <th>likes</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog) => (
          <Blog blog={blog} key={blog.id} />
        ))}
      </tbody>
    </table>
  );
};

export default BlogList;
