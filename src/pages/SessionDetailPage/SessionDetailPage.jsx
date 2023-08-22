import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../../utilities/sessions-api";
import { getAllUsers } from "../../utilities/users-api";
import { findUserNameById } from "../../utilities/users-service";
import WhiteBoard from "../../components/WhiteBoard/WhiteBoard";
import DiceRoller from "../../components/DiceRoller/DiceRoller";

export default function SessionDetailPage({ user }) {
    const { sessionId } = useParams();
    const [session, setSession] = useState(null);
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function fetchSessionDetails() {
        try {
            const fetchedSession = await getById(sessionId);
            console.log('Fetched session details:', fetchedSession);
            setSession(fetchedSession);

            const fetchedUsers = await getAllUsers();
            setUsers(fetchedUsers)

        } catch (err) {
            console.log('Error fetching session details', err);
        }
        }
        fetchSessionDetails();
    }, [sessionId]);

    return (
        <div>
        {session ? (
            <>
            <h1>{session.campaignName}'s detail page</h1>
                <p>Game Master: {findUserNameById(users, session.DM)}</p>
                < WhiteBoard />
                < DiceRoller user={user}/>
                
                </>
        ) : (
            <p>Loading...</p>
        )}
        </div>
    );
}