import { Link } from 'react-router-dom';
import LoggedUser from './LoggedUser';

const NavBar = () => {
  const navStyle = {
    backgroundColor: '#d3d3d3',
  };

  const liStyle = {
    display: 'inline-block',
    padding: '0 3px',
  };

  return (
    <nav style={navStyle}>
      <ol>
        <li style={liStyle}>
          <Link to={'/'}>blogs </Link>
        </li>
        <li style={liStyle}>
          <Link to={'/users'}>users </Link>
        </li>
        <li style={liStyle}>
          <LoggedUser />
        </li>
      </ol>
    </nav>
  );
};
export default NavBar;
