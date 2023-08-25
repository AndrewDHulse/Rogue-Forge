import { Link } from 'react-router-dom';
import { getAllUsers } from '../../utilities/users-api'; 
import { findUserNameById } from '../../utilities/users-service';
import { useState, useEffect } from 'react'; 

export default function SessionIndex({ sessions }) {
    console.log('sessions passed to sessionindex', sessions);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getInfo() {
            try {
                const fetchedUsers = await getAllUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        getInfo();
    }, []);

    return (
        <>
            <h1>Sessions Index</h1>
            <ul>
                {sessions.map(session => (
                    <li key={session._id}>
                        <h2>{session.campaignName}</h2>
                        <p>{findUserNameById(users, session.DM)} is running a {session.system} game</p>
                        <Link to={`/sessions/details/${session._id}`}>View Campaign</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}