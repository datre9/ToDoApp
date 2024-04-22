import React, { useState, useEffect } from 'react';
import { Alert, Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css'; 
import todoLogo from '../images/todo-logo.png';

const SIGNUP_TOKEN_URL = "http://localhost:8080/register";

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const [signupButtonClicked, setSignupButtonClicked] = useState(false);

  const [signupError, setSignupError] = useState('');
  const [responseMsg, setResponseMsg] = useState('');

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  useEffect(() => {
    setValidUsername(username.length > 0);
    setValidPassword(password.length > 0);
  }, [username, password]);

  function signup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSignupButtonClicked(true);
    if (!validUsername || !validPassword) {
      setSignupButtonClicked(false);
      return;
    }

    axios.post(SIGNUP_TOKEN_URL, { username, password })
      .then(response => {
        setResponseMsg(response.data);
        setSuccessAlert(true);
      })
      .catch(error => {
        const errorMessage = error.response?.data || "Cannot access registration server!";
        setSignupError(errorMessage);
        setErrorAlert(true);
      })
      .finally(() => {
        setSignupButtonClicked(false);
      });
  }

  return (
    <div className="register-page">
      <div className="form-container">
        <Box className="register-container">
          <h2>Please sign up</h2>
          <form onSubmit={signup}>
            <TextField 
              fullWidth
              label='Username' 
              margin="normal" 
              onChange={e => setUsername(e.target.value)} 
              error={!validUsername && signupButtonClicked}
              helperText={!validUsername && signupButtonClicked ? "Username is required" : ""}
            />

            <TextField 
              fullWidth
              label='Password' 
              type='password' 
              margin="normal" 
              onChange={e => setPassword(e.target.value)} 
              error={!validPassword && signupButtonClicked}
              helperText={!validPassword && signupButtonClicked ? "Password is required" : ""}
            />

            <Button 
              fullWidth
              type='submit' 
              variant='contained' 
              sx={{ marginTop: 2 }}
              disabled={signupButtonClicked}>
              Sign up
            </Button>

            {successAlert && <Alert severity='success'>{responseMsg}</Alert>}
            {errorAlert && <Alert severity='error'>{signupError}</Alert>}
          </form>
          <h3>OR</h3>
          <Link to={'/login'}>Log in</Link>
        </Box>
      </div>
      <div className="logo-container">
        <img src={todoLogo} alt="ToDo Logo" className="logo" />
      </div>
    </div>
  );
};

export default Register;
