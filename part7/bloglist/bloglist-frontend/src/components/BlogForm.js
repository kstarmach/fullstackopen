import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = () => {
  // const [title, setTitle] = useState('');
  // const [author, setAuthor] = useState('');
  // const [url, setUrl] = useState('');
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    dispatch(createBlog(newBlog));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input {...title} />
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          url:
          <input {...url} />
        </div>
        <button type="submit" id="create_new_blog">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
