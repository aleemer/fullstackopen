const Notification = ({ message }) => {
  const messageStyle = {
    color: message.error ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return (
    <div style={messageStyle}>
      {message.content}
    </div>
  )
}

export default Notification