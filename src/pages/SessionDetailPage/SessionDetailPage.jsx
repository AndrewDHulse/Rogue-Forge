import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getById } from "../../utilities/sessions-api";
import { getAllUsers } from "../../utilities/users-api";
import { findUserNameById } from "../../utilities/users-service";
import { 
    showTemplatesForSession, 
    createCharacterSheet, 
    showCharacterSheetsforUser 
} from "../../utilities/characterSheets-api";


import WhiteBoard from "../../components/WhiteBoard/WhiteBoard";
import DiceRoller from "../../components/DiceRoller/DiceRoller";
import CharacterSheetTemplateForm from "../../components/CharacterSheetTemplateForm/CharacterSheetTemplateForm";
import CharacterSheetTemplate from "../../components/CharacterSheetTemplate/CharacterSheetTemplate";
import CharacterSheet from "../../components/CharacterSheet/CharacterSheet";

export default function SessionDetailPage({ user, sessions }) {
    const { sessionId } = useParams();
    const [session, setSession] = useState(null);
    const [users, setUsers] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [characterSheets, setCharacterSheets] = useState([])
    const [formData, setFormData] = useState({
        characterName:'Adventurer'
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
                
                if (fetchedTemplates.length > 0) {
                    const firstTemplateFields = fetchedTemplates[0].fields;
                    const initialFormData = {
                        characterName: '',
                        ...firstTemplateFields.reduce((acc, field) => {
                            acc[field.label] = '';
                            return acc;
                        }, {}),
                    };
                    setFormData(initialFormData);
                }
    
            } catch (err) {
                console.log('Error fetching session details', err);
            }
        }
        fetchSessionDetails();
    }, [sessionId]);

    useEffect(() => {
        async function fetchCharacterSheetsForUser() {
            try {
                const fetchedCharacterSheets = await showCharacterSheetsforUser(user._id);
                setCharacterSheets(fetchedCharacterSheets);
            } catch (err) {
                console.log('Error fetching character sheets', err);
            }
        }
        fetchCharacterSheetsForUser();
    }, []);

    const handleCreateCharacterSheet = async (template) => { 
        try {
            console.log("Creating character sheet...");
    
            const updatedFormData = {
                ...formData,
                characterName: formData.characterName,
                ...template.fields.reduce((acc, field) => {
                    acc[field.label] = formData[field.label];
                    return acc;
                }, {}),
            };
            const response = await createCharacterSheet(template._id, updatedFormData); 
            console.log('API Response:', response);
    
            const updatedTemplates = await showTemplatesForSession(sessionId);
            console.log('Fetched updated templates:', updatedTemplates);
    
            setTemplates(updatedTemplates);
        } catch (err) {
            console.log('Error creating character sheet', err);
        }
    };

    useEffect(() => {
        async function updateCharacterSheets() {
            try {
                const fetchedCharacterSheets = await showCharacterSheetsforUser(user._id);
                setCharacterSheets(fetchedCharacterSheets);
            } catch (err) {
                console.log('Error fetching character sheets', err);
            }
        }

        if (templates.length > 0) {
            updateCharacterSheets();
        }
    }, [templates]);

    

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
            {templates.map((template, index) => (
                <CharacterSheetTemplate
                    key={template._id}
                    template={template}
                    handleCreateCharacterSheet={() => handleCreateCharacterSheet(template)}
                    formData={formData} 
                    handleChange={handleChange}
                    sessionId={sessionId}
                />
            ))}
            {characterSheets.map((characterSheet) => (
                        <CharacterSheet
                            key={characterSheet._id}
                            characterSheet={characterSheet}
                            user={user}
                        />
                    ))}
            <WhiteBoard />
            <DiceRoller user={user} />
        </>
        ) : (
        <p>Loading...</p>
        )}
        </>
    );
}