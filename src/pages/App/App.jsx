import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import { getUser } from '../../utilities/users-service'
import { getAllSessions } from '../../utilities/sessions-api';
import AuthPage from '../AuthPage/AuthPage'
import NavBar from '../../components/NavBar/NavBar'
import SessionTable from '../SessionTable/SessionTable';
import NewSessionPage from '../../pages/NewSessionPage/NewSessionPage'
import SessionIndex from '../../pages/SessionIndex/SessionIndex'

export default function App() {
  const [user, setUser] = useState(getUser());
  const [sessions, setSessions] = useState([])

  useEffect(()=>{
    async function fetchSessions(){
      try{
        const fetchedSessions = await getAllSessions();
        console.log('fetched sessions',fetchedSessions);
        setSessions(fetchedSessions);
      }catch(err){
        console.log('error while fetching sessions', err)
      }
    }
      fetchSessions();
  }, [])

  return (
    <main className="App">
      {user ? 
      <>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="sessions/new" element={ < NewSessionPage/> }/>
          <Route path = 'sessions/table' element={< SessionTable user={user} />}/>
          <Route path="sessions/index" element={<SessionIndex sessions={sessions} />}  />
        </Routes>
      </>
      :
      <AuthPage setUser={setUser} />
    }
      </main>
    );
}
    