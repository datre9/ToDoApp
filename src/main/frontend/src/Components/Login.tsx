import { Alert, Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const LOGIN_TOKEN_URL = "http://localhost:8080/login"

const Login = (props: any) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [validUsername, setValidUsername] = useState(false)
  const [validPassword, setValidPassword] = useState(false)

  const [loginButtonClicked, setLoginButtonClicked] = useState(false)

  const [loginError, setLoginError] = useState("")

  const [errorAlert, setErrorAlert] = useState(false)

  const trueEA = () => {
    setErrorAlert(true)
  }

  const falseEA = () => {
    setErrorAlert(false)
  }

  useEffect(() => {
    setValidUsername(username.length > 0)
    setValidPassword(password.length > 0)
  }, [username, password])

  function login(e: any) {
    falseEA()
    e.preventDefault()
    setLoginButtonClicked(true)

    if (!validUsername || !validPassword) {
      trueEA()
      return
    }

    const userCredentials = {
      username: username,
      password: password
    }

    axios.post(LOGIN_TOKEN_URL, userCredentials)
      .then(response => {
        props.setUserToken(response.data)
      })
      .catch(error => {
        try {
          setLoginError(error.response.data)
          trueEA()
        } catch (e) {
          setLoginError("Cannot access server")
        }
      })
    setLoginButtonClicked(false)
  }

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={login}>
        <Box>
          <TextField label='Username' onChange={e => setUsername(e.target.value)} />
        </Box>
        {!validUsername && loginButtonClicked ? (
          <Alert variant='standard' severity='error'>Username is incorrect</Alert>) : (
          <></>
        )}

        <Box>
          <TextField label='Password' type='password' onChange={e => setPassword(e.target.value)} />
        </Box>
        {!validPassword && loginButtonClicked ? (
          <Alert variant='standard' severity='error'>Password is incorrect</Alert>) : (
          <></>
        )}

        <Box>
          <Button type='submit' variant='contained'>Log in</Button>
        </Box>
      </form>

      <h3>Or</h3>
      <Link to='/register'>Sign up NOW</Link>
      {errorAlert && <Alert variant='standard' severity='error'>{loginError}</Alert>}      
    </div>
  )
}

export default Login