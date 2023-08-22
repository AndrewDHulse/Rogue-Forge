import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../../utilities/sessions-api";
import { getAllUsers } from "../../utilities/users-api";
import { findUserNameById } from "../../utilities/users-service";
import WhiteBoard from "../../components/WhiteBoard/WhiteBoard";
import DiceRoller from "../../components/DiceRoller/DiceRoller";
import CharacterSheetTemplateForm from "../../components/CharacterSheetTemplateForm/CharacterSheetTemplateForm";

export default function SessionDetailPage({ user, sessions }) {
    const { sessionId } = useParams();
    const [session, setSession] = useState(null);
    const [users, setUsers] = useState([])
    const [showTemplateForm, setShowTemplateForm] = useState(false);

    const toggleTemplateForm=()=>{
        setShowTemplateForm((prevValue) => !prevValue)
    }

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
        <>
        {session ? (
        <>
            <h1>{session.campaignName}'s detail page</h1>
            <p>Game Master: {findUserNameById(users, session.DM)}</p>
            
            {/* {user.role === "DM" && (
                <button onClick={toggleTemplateForm}>
                    Create Character Sheet Template
                </button>
            )}
            
            {showTemplateForm && (
                <CharacterSheetTemplateForm sessionId={sessionId} />
            )} */}
            <CharacterSheetTemplateForm sessionId={sessionId} />
            <WhiteBoard />
            <DiceRoller user={user} />
        </>
        ) : (
        <p>Loading...</p>
        )}
        </>
    );
}