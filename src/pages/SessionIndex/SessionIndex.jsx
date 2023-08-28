import { Link } from 'react-router-dom';
import { getAllUsers } from '../../utilities/users-api';
import { getAllSessions, deleteSession } from '../../utilities/sessions-api';
import { findUserNameById } from '../../utilities/users-service';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import './SessionIndex.css';

export default function SessionIndex({ sessions, setSessions, user }) {
    console.log('sessions passed to sessionindex', sessions);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getInfo() {
            try {
                const [fetchedUsers, fetchedSessions] = await Promise.all([
                    getAllUsers(),
                    getAllSessions()
                ]);
                setUsers(fetchedUsers);
                setSessions(fetchedSessions);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getInfo();
    }, []);

    async function handleDelete(sessionId) {
        try {
            console.log('Deleting session with ID:', sessionId);
            const response = await deleteSession(sessionId);
            console.log('Delete response:', response);
            const fetchedSessions = await getAllSessions();
            setSessions(fetchedSessions);
        } catch (error) {
            console.error('Error deleting session:', error);
    
            if (error.response) {
                console.log('Error response:', error.response);
            }
        }
    }

    return (
        <>
            <h1 className='page-title'>Find an Adventure</h1>
            <div className='main'>
                {isLoading ? (
                    <p>Loading sessions...</p>
                ) : (
                    <div className='card-columns'>
                        {sessions.length === 0 ? (
                            <p>No sessions available.</p>
                        ) : (
                            sessions.map(session => (
                                <Card key={session._id} border='light' className='session-card'>
                                    <Card.Body>
                                        <h2 className='session-name' >{session.campaignName}</h2>
                                        <hr />
                                        <Card.Text>
                                            {findUserNameById(users, session.DM)} is running a {session.system} game
                                        </Card.Text>
                                        {user && session.DM === user._id && (
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDelete(session._id)}
                                            >
                                                Delete
                                            </button>
                                        )}
                                        <Link to={`/sessions/details/${session._id}`} className='btn btn-secondary'>
                                            View Campaign
                                        </Link>
                                    </Card.Body>
                                </Card>
                            ))
                        )}
                    </div>
                )}
            </div>
        </>
    );
}