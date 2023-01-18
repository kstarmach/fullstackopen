import { useSelector } from 'react-redux';

const Notifiaction = () => {
  const notification = useSelector((state) => state.notification);
  if (notification === null) {
    return null;
  }

  if (notification.errorType === 'error') {
    return <div className="error">{notification.message}</div>;
  }

  return <div className="success">{notification.message}</div>;
};

export default Notifiaction;
