const MessageBox = ({ message, color }) => {
  if (message === null) {
    return null;
  }

  return (
    <div
      className="message"
      style={{ color: `${color === "green" ? "green" : "red"}` }}
    >
      {message}
    </div>
  );
};

export default MessageBox;
