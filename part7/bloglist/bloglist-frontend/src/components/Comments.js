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
      <h4>comments</h4>
      <form onSubmit={handleComment}>
        <input {...newComment} />
        <button>add comment</button>
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
