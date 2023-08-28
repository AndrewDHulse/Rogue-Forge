import { Link } from 'react-router-dom';
import { getAllUsers } from '../../utilities/users-api';
import { findUserNameById } from '../../utilities/users-service';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import './SessionIndex.css';

export default function SessionIndex({ sessions }) {
    console.log('sessions passed to sessionindex', sessions);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getInfo() {
            try {
                const fetchedUsers = await getAllUsers();
                setUsers(fetchedUsers);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        getInfo();
    }, []);

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