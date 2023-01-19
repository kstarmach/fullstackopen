import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );

  if (!user) return null;

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="h4" gutterBottom>
        added blogs
      </Typography>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default UserDetails;
