import { useSelector } from 'react-redux';
import { Alert } from '@mui/material';
const Notifiaction = () => {
  const notification = useSelector((state) => state.notification);
  if (notification === null) {
    return null;
  }

  if (notification.errorType === 'error') {
    return <Alert severity="error">{notification.message}</Alert>;
  }

  return <Alert severity="success">{notification.message}</Alert>;
};

export default Notifiaction;
