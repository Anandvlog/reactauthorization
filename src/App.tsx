import './App.css'
import LoginPage from './page/Login'
import Profile from './components/profile'
import Header from './components/header'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'

function App() {
        const [user, setUser] = useState<string | null>(null);

  
    return (
    <>
    {localStorage.getItem("token") && 
    <LoginPage />
  }
  <Header setUser={setUser}  user={user}/>
    <Routes>
      <Route path="/profile" element={<Profile user={user}  />} />
    </Routes>
      
    </>
  )
}

export default App
