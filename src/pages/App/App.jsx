import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { getUser } from '../../utilities/users-service';
import { getAllSessions } from '../../utilities/sessions-api';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import SessionTable from '../SessionTable/SessionTable';
import NewSessionPage from '../../pages/NewSessionPage/NewSessionPage';
import SessionIndex from '../../pages/SessionIndex/SessionIndex';
import SessionDetailPage from '../SessionDetailPage/SessionDetailPage';
import HomePage from '../../pages/HomePage/Homepage';
import { Container, Row, Col } from 'react-bootstrap';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const fetchedSessions = await getAllSessions();
        setSessions(fetchedSessions);
      } catch (err) {
        console.log('error while fetching sessions', err);
      }
    }
    fetchSessions();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col xs={3} className="p-0">
          <NavBar user={user} setUser={setUser} />
        </Col>
        <Col xs={9} className="p-3">
          <main className="App">
            <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage setUser={setUser} />} />
        <Route path="/sessions/table" element={<SessionTable user={user} />} />
        {user && (
          <>
            <Route path="/sessions/new" element={<NewSessionPage setSessions={setSessions} />} />
            <Route path="/sessions/index" element={<SessionIndex sessions={sessions} setSessions={setSessions} user={user} />} />
            <Route path="/sessions/details/:sessionId" element={<SessionDetailPage sessions={sessions} user={user} />} />
            <Route path="/*" element={<Navigate to="/homepage" />} />
          </>
        )}
  </Routes>
          </main>
        </Col>
      </Row>
    </Container>
  );
}