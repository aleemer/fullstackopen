const LoginForm = ({ onLoginClick }) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={onLoginClick}>
        <div>username<input id="username" name="username" required/></div>
        <div>password<input id="password" name="password" required/></div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm