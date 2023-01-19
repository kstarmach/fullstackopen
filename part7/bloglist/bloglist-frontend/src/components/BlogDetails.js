import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeBlog } from '../reducers/blogReducer';
import Comments from './Comments';
import { Button, Typography } from '@mui/material';
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
      <Typography variant="h3" gutterBottom>
        {blog.title}
      </Typography>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{' '}
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleLike(blog)}
        >
          {' '}
          like
        </Button>
      </div>
      <div>added by {blog.user.username}</div>
      <Comments blog={blog} />
    </div>
  );
};

export default BlogDetails;
