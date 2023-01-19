import { TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = () => {
  const { reset: resetTitle, ...title } = useField('text');
  const { reset: resetAuthor, ...author } = useField('text');
  const { reset: resetUrl, ...url } = useField('text');

  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    dispatch(createBlog(newBlog));
    resetTitle();
    resetAuthor();
    resetUrl();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField label="title" size="small" {...title} />
        </div>
        <div>
          <TextField label="author" size="small" {...author} />
        </div>
        <div>
          <TextField label="url" size="small" {...url} />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="small"
          id="create_new_blog"
        >
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
