import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';

const User = () => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      {user === null ? (
        <LoginForm
        //   handleSubmit={handleLogin}
        //   handleUsernameChange={({ target }) => setUsername(target.value)}
        //   handlePasswordChange={({ target }) => setPassword(target.value)}
        //   username={username}
        //   password={password}
        />
      ) : (
        <p>
          {user.name} logged in
          <button>logout</button>
        </p>
      )}
    </div>
  );
};

export default User;
