import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../../utilities/sessions-api";
import { getAllUsers } from "../../utilities/users-api";
import { findUserNameById } from "../../utilities/users-service";
import { showTemplatesForSession, createCharacterSheet } from "../../utilities/characterSheets-api";
import WhiteBoard from "../../components/WhiteBoard/WhiteBoard";
import DiceRoller from "../../components/DiceRoller/DiceRoller";
import CharacterSheetTemplateForm from "../../components/CharacterSheetTemplateForm/CharacterSheetTemplateForm";
import CharacterSheetTemplate from "../../components/CharacterSheetTemplate/CharacterSheetTemplate";

export default function SessionDetailPage({ user, sessions }) {
    const { sessionId } = useParams();
    const [session, setSession] = useState(null);
    const [users, setUsers] = useState([]);
    const [templates, setTemplates] = useState([]);
    const[formData, setFormData] = useState({
        characterName:''
    })

    // const [showTemplateForm, setShowTemplateForm] = useState(false);
    // const toggleTemplateForm=()=>{
    //     setShowTemplateForm((prevValue) => !prevValue)
    // }

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    useEffect(() => {
        async function fetchSessionDetails() {
            try {
                const fetchedSession = await getById(sessionId);
                setSession(fetchedSession);
    
                const fetchedUsers = await getAllUsers();
                setUsers(fetchedUsers);
    
                const fetchedTemplates = await showTemplatesForSession(sessionId);
                setTemplates(fetchedTemplates);
    
            } catch (err) {
                console.log('Error fetching session details', err);
            }
        }
        fetchSessionDetails();
    }, [sessionId]);

    const handleCreateCharacterSheet = async (templateId) => {
        try {
            await createCharacterSheet(templateId,  formData );
            const updatedTemplates = await showTemplatesForSession(sessionId);
            setTemplates(updatedTemplates);
        } catch (err) {
            console.log('Error creating character sheet', err);
        }
        };


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
            <CharacterSheetTemplate
            templates={templates}
            handleCreateCharacterSheet={handleCreateCharacterSheet}
            formData={formData}
            handleChange={handleChange}
        />
            <WhiteBoard />
            <DiceRoller user={user} />
        </>
        ) : (
        <p>Loading...</p>
        )}
        </>
    );
}