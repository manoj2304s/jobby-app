import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMessage: '', onSubmitError: false}

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({errorMessage: error, onSubmitError: true})
  }

  submitTheLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const credentials = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMessage, onSubmitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="login-main-container">
          <form onSubmit={this.submitTheLoginForm} className="login-container">
            <img
              className="login-company-logo"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
            <div className="label-input-container">
              <label className="login-labels" htmlFor="username">
                USERNAME
              </label>{' '}
              <br />
              <input
                onChange={this.getUsername}
                value={username}
                id="username"
                className="login-input-box"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="label-input-container">
              <label className="login-labels" htmlFor="password">
                PASSWORD
              </label>
              <br />
              <input
                onChange={this.getPassword}
                value={password}
                id="password"
                className="login-input-box"
                type="password"
                placeholder="Password"
              />
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
            {onSubmitError && <p className="error-message">*{errorMessage}</p>}
          </form>
        </div>
      </>
    )
  }
}
export default Login
