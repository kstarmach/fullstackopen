import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Container,
  Paper,
  Button,
  TableHead,
  Typography,
} from '@mui/material';

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();

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
    <TableRow>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>{' '}
      </TableCell>
      <TableCell>{blog.author}</TableCell>
      <TableCell>{blog.likes}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleLike(blog)}
        >
          like
        </Button>
        {blog.user.username !== user.username ? (
          ''
        ) : (
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(blog.id)}
          >
            delete
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);

  if (!user) return '';

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Blog list
      </Typography>
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>tittle</TableCell>
              <TableCell>author</TableCell>
              <TableCell>likes</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <Blog blog={blog} user={user} key={blog.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BlogList;
