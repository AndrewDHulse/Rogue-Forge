import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import { getUser } from '../../utilities/users-service'
import AuthPage from '../AuthPage/AuthPage'
import NewSessionPage from '../../pages/NewSessionPage/NewSessionPage'
import NavBar from '../../components/NavBar/NavBar'
import SessionTable from '../SessionTable/SessionTable';
import WhiteBoard from '../../components/WhiteBoard/WhiteBoard'

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? 
      <>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="sessions/new" element={ < NewSessionPage/> }/>
          <Route path = 'sessions/table' element={< SessionTable/>}/>
        </Routes>
      </>
      :
      <AuthPage setUser={setUser} />
    }
      </main>
    );
}
    