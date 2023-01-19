import { Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { commentBlog } from '../reducers/blogReducer';

const Comments = ({ blog }) => {
  const { reset: resetComment, ...newComment } = useField('text');
  const dispatch = useDispatch();

  const handleComment = (event) => {
    event.preventDefault();
    if (!newComment) return;
    dispatch(commentBlog(blog.id, newComment.value));
    resetComment();
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        comments
      </Typography>
      <form onSubmit={handleComment}>
        <TextField label="add comment" size="small" {...newComment} />
        <Button variant="contained" color="primary" type="submit">
          add comment
        </Button>
      </form>
      <ul>
        {blog.comments.map((value, key) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
