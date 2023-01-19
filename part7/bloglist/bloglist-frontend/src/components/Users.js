import { useSelector } from 'react-redux';
const User = (user) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.name}</td>
    </tr>
  );
};

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <table>
      <thead>
        <tr></tr>
        <tr>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </tbody>
    </table>
  );
};
