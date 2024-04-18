import { Alert, Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const SIGNUP_TOKEN_URL = "http://localhost:8080/register";

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [validUsername, setValidUsername] = useState(true)
  const [validPassword, setValidPassword] = useState(true)

  const [signupButtonClicked, setSignupButtonClicked] = useState(false)

  const [signupError, setSignupError] = useState('')
  const [responseMsg, setResponseMsg] = useState('')

  const [successAlert, setSuccessAlert] = useState(false)
  const [errorAlert, setErrorAlert] = useState(false)

  const trueSA = () => {
    setSuccessAlert(true)
  }

  const falseSA = () => {
    setSuccessAlert(false)
  }

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

  function signup(e: any) {
    falseSA()
    falseEA()
    e.preventDefault()
    setSignupButtonClicked(true)
    if (!validUsername || !validPassword) {
      return
    }

    const signupBody = {
      username: username,
      password: password
    }

    axios.post(SIGNUP_TOKEN_URL, signupBody)
      .then(response => {
        setResponseMsg(response.data)
        trueSA()
      })
      .catch(error => {
        try {
          setSignupError(error.response.data)
          trueEA()
        } catch (e) {
          setSignupError("Cannot access registration server!")
        }
      });
    setSignupButtonClicked(false)
  }

  return (
    <div>
      <h2>Please sign up</h2>
      <form onSubmit={signup}>
        <Box>
          <TextField label='Username' onChange={e => setUsername(e.target.value)} />
        </Box>
        {!validUsername && signupButtonClicked ? (
          <Alert variant='standard' severity='error'>Username is required</Alert>
        ) : (
          <></>
        )}

        <Box>
          <TextField label='Password' type='password' onChange={e => setPassword(e.target.value)} />
        </Box>
        {!validPassword && signupButtonClicked ? (
          <Alert variant='standard' severity='error'>Password is required</Alert>
        ) : (
          <></>
        )}

        <Box>
          <Button type='submit' variant='contained'>
            Sign up
          </Button>
        </Box>

      </form>
      <h3>OR</h3>
      <Link to={'/'}>Log in</Link>

      {successAlert && <Alert variant='standard' severity='success'>{responseMsg}</Alert>}
      {errorAlert && <Alert variant='standard' severity='error'>{signupError}</Alert>}
    </div>
  )
}

export default Register