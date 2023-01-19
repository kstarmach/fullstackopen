import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeBlog } from '../reducers/blogReducer';
import Comments from './Comments';

const BlogDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const user = useSelector((state) => state.user);

  const handleLike = (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: user };
    dispatch(likeBlog(blogToUpdate));
  };

  if (!blog) return null;

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{' '}
        <button onClick={() => handleLike(blog)}> like</button>
      </div>
      <div>added by {blog.author}</div>
      <Comments blog={blog} />
    </div>
  );
};

export default BlogDetails;
