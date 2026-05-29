import './App.css'
import LoginPage from './page/Login'
import Profile from './components/profile'
import Header from './components/header'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Home from './page/Home'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("token"));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <>
          <Header onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </>
      )}
    </>
  )
}

export default App

