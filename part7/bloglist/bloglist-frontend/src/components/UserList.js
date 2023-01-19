import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Container,
  Paper,
  Typography,
} from '@mui/material';

const User = ({ user }) => {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </TableCell>
      <TableCell>{user.blogs.length} </TableCell>
    </TableRow>
  );
};

const Users = () => {
  const users = useSelector((state) => state.users);
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        User list
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <User user={user} key={user.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Users;
