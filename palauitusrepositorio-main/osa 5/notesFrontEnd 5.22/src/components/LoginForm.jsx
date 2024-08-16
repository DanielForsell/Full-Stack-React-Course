import PropTypes from 'prop-types'

const LoginForm = (props) => {

    return (
      <div>
        
        <form onSubmit={props.handleSubmit}>
          <div>
            Username
            <input
              style={{ marginLeft: 5 , marginBottom: 5}}
              value={props.username}
              onChange={props.handleUsernameChange}
              name="username"
              data-testid="username"
            />
          </div>
          <div>
          Password
          <input
            style={{ marginLeft: 5 , marginBottom: 5}}
            type="password"
            value={props.password}
            onChange={props.handlePasswordChange}
            data-testid="password"
          />
      </div>
          <button style={{ marginBottom: 5}} type="submit">Login</button>
        </form>
      </div>
    )
  }
 
  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

 export default LoginForm