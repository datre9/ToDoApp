import React, { useState, useEffect, useRef } from 'react';
import { Alert, Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css';
import todoLogo from '../images/todo-logo.png';
import { format } from 'date-fns'; 
import FlyingTodosContainer from './FlyingTodosContainer';

const SIGNUP_TOKEN_URL = "http://localhost:8080/register";

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [signupButtonClicked, setSignupButtonClicked] = useState(false);

  const [signupError, setSignupError] = useState('');
  const [responseMsg, setResponseMsg] = useState('');

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const formRef = useRef<HTMLDivElement>(null); // Reference pro registrační formulář

  useEffect(() => {
    setValidUsername(username.length > 0);
    setValidPassword(password.length > 0 && password === confirmPassword);
    setPasswordsMatch(password === confirmPassword);

    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, [username, password, confirmPassword]);

  function signup(e: React.FormEvent<HTMLFormElement>) {
    setErrorAlert(false);
    setSuccessAlert(false);
    e.preventDefault();
    setSignupButtonClicked(true);
    if (!validUsername || !validPassword || !passwordsMatch) {
      setSignupButtonClicked(false);
      setErrorAlert(true);
      setSignupError('Please correct passwords. Passwords do not match!');
      return;
    }

    axios.post(SIGNUP_TOKEN_URL, { username, password })
      .then(response => {
        setResponseMsg(response.data);
        setSuccessAlert(true);
        setSignupButtonClicked(false);
      })
      .catch(error => {
        const errorMessage = error.response?.data || "Cannot access registration server!";
        setSignupError(errorMessage);
        setErrorAlert(true);
      });
  }
  return (
    <div className="register-page">
      <FlyingTodosContainer formRef={formRef} />
      <header className="header">
        <div className="logo-container">
          <img src={todoLogo} alt="ToDo Logo" className="logo" />
        </div>
        <div className="header-title">ToDo App</div>
        <div className="time-display">{format(currentTime, 'PPpp')}</div>
      </header>
      <div className="form-container">
        <Box className="register-container" ref={formRef}>
          <h2>PLEASE SIGN UP</h2>
          <form onSubmit={signup}>
            <TextField fullWidth label='Username' margin="normal" onChange={e => setUsername(e.target.value)} error={!validUsername && signupButtonClicked} helperText={!validUsername && signupButtonClicked ? "Username is required" : ""} />
            <TextField fullWidth label='Password' type='password' margin="normal" onChange={e => setPassword(e.target.value)} error={!validPassword && signupButtonClicked} helperText={!validPassword && signupButtonClicked ? "Password is required" : ""} />
            <TextField fullWidth label='Confirm Password' type='password' margin="normal" onChange={e => setConfirmPassword(e.target.value)} error={!passwordsMatch && signupButtonClicked} helperText={!passwordsMatch && signupButtonClicked ? "Passwords do not match" : ""} />
            <Button fullWidth type='submit' variant='contained' sx={{ marginTop: 2, backgroundColor: '#1959b3', color: 'white', ':hover': { backgroundColor: '#303f9f' }, disabled: { backgroundColor: '#ccc', color: '#666' } }} disabled={signupButtonClicked}>Sign up</Button>
            {successAlert && <Alert severity='success'>{responseMsg}</Alert>}
            {errorAlert && <Alert severity='error'>{signupError}</Alert>}
          </form>
          <h3>OR</h3>
          <Button component={Link} to="/login" variant="contained" fullWidth sx={{ marginTop: 2, backgroundColor: '#1959b3', color: 'white', ':hover': { backgroundColor: '#303f9f' }}}>Log in</Button>
        </Box>
      </div>
    </div>
  );
};

export default Register;
