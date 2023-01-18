const Notifiaction = ({ message }) => {
  if (message === null) {
    return null;
  }

  if (message.errorType === 'error') {
    return <div className="error">{message.message}</div>;
  }

  return <div className="success">{message.message}</div>;
};

export default Notifiaction;
