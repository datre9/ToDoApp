import React, { useState, useEffect, useRef } from 'react';
import { Alert, Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';
import todoLogo from '../images/todo-logo.png';
import { format } from 'date-fns'; 
import FlyingTodosContainer from './FlyingTodosContainer';

interface LoginProps {
  setUserToken: (token: string) => void;
}

const LOGIN_TOKEN_URL = "http://localhost:8080/login";

const Login: React.FC<LoginProps> = ({ setUserToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [loginButtonClicked, setLoginButtonClicked] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setValidUsername(username.length > 0);
    setValidPassword(password.length > 0);

    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, [username, password]);

  function login(e: React.FormEvent<HTMLFormElement>) {
    setErrorAlert(false);
    setSuccessAlert(false);
    e.preventDefault();
    setLoginButtonClicked(true);

    if (!validUsername || !validPassword) {
      setLoginButtonClicked(false); 
      setErrorAlert(true);
      setLoginError('Username or password is incorrect');
      return;
    }

    axios.post(LOGIN_TOKEN_URL, { username, password })
      .then(response => {
        setUserToken(response.data);
        setResponseMsg('Login successful!');
        setSuccessAlert(true);
        setLoginButtonClicked(false);
        setTimeout(() => navigate('/'), 1000);  // Přesměrování po úspěchu
      })
      .catch(error => {
        const errorMessage = error.response?.data || "Cannot access server";
        setLoginError(errorMessage);
        setErrorAlert(true);
        setLoginButtonClicked(false);
      });
  }

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
    if (loginButtonClicked) {
      setLoginButtonClicked(false);
    }
  };

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
          <h2>PLEASE LOG IN</h2>
          <form onSubmit={login}>
            <TextField fullWidth label='Username' margin="normal" onChange={handleInputChange(setUsername)} error={!validUsername && loginButtonClicked} helperText={!validUsername && loginButtonClicked ? "Username is required" : ""} />
            <TextField fullWidth label='Password' type='password' margin="normal" onChange={handleInputChange(setPassword)} error={!validPassword && loginButtonClicked} helperText={!validPassword && loginButtonClicked ? "Password is required" : ""} />
            <Button fullWidth type="submit"  variant='contained' sx={{ marginTop: 2, backgroundColor: '#1959b3', color: 'white', ':hover': { backgroundColor: '#303f9f' }, disabled: { backgroundColor: '#ccc', color: '#666' } }} disabled={loginButtonClicked}>Log in</Button>
            {successAlert && <Alert severity='success'>{responseMsg} </Alert>}
            {errorAlert && <Alert severity='error'>{loginError}</Alert>}
          </form>
          <h3>OR</h3>
          <Button component={Link} to="/register" variant="contained" fullWidth sx={{ marginTop: 2, backgroundColor: '#1959b3', color: 'white', ':hover': { backgroundColor: '#303f9f' }}}>Sign up</Button>
        </Box>
      </div>
    </div>
  );
};

export default Login;
