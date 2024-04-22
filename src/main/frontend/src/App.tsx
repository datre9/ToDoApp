import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';

function App() {
  const [user, setUser] = useState(getUserToken())

  function getUserToken() {
    let userToken = JSON.parse(localStorage.getItem('userToken') || '""')
    return userToken
  }

  function setUserToken(userToken: any) {
    localStorage.setItem('userToken', JSON.stringify(userToken))
    setUser(userToken)
  }

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home user={user} setUserToken={setUserToken} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;