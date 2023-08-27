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
import {Button} from 'react-bootstrap'
import {Modal} from 'react-bootstrap'
import './SessionDetailPage.css'

export default function SessionDetailPage({ user, sessions }) {
    const { sessionId } = useParams();
    const [session, setSession] = useState(null);
    const [users, setUsers] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [areTemplatesLoading, setAreTemplatesLoading] = useState(true);
    const [characterSheets, setCharacterSheets] = useState([])
    const [formData, setFormData] = useState({
        characterName:'Adventurer'
    })
    
    const [showCreateTemplate, setShowCreateTemplate] = useState(false);

    const handleCloseCreateTemplate = () => setShowCreateTemplate(false);
    const handleShowCreateTemplate = () => setShowCreateTemplate(true);


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
                setAreTemplatesLoading(false);
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
            <h1 className="campaign-name">{session.campaignName}</h1>
            <p>Game Master: {findUserNameById(users, session.DM)}</p>
            

            <Modal show={showCreateTemplate} onHide={handleCloseCreateTemplate} centered>
                <Modal.Header closeButton>
                    Create a Character Sheet
                </Modal.Header>
                <Modal.Body>
                    <CharacterSheetTemplateForm sessionId={sessionId} onClose={handleCloseCreateTemplate} />
                    {areTemplatesLoading ? (
                        <p>Loading templates...</p>
                    ) : (
                        templates.map((template, index) => (
                            <CharacterSheetTemplate
                                key={template._id}
                                template={{
                                    ...template,
                                    fields: template.fields.map(field => {
                                        if (field.dropdownOptionsArray) {
                                            return {
                                                ...field,
                                                dropdownOptionsArray: field.dropdownOptionsArray.map(option => ({
                                                    ...option,
                                                    label: option.label.trim(),
                                                    value: option.value.trim()
                                                }))
                                            };
                                        } else {
                                            return field;
                                        }
                                    })
                                }}
                                handleCreateCharacterSheet={() => handleCreateCharacterSheet(template)}
                                formData={formData}
                                handleChange={handleChange}
                                sessionId={sessionId}
                            />
                        ))
                    )}
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCreateTemplate}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>

            {characterSheets.map((characterSheet) => (
                        <CharacterSheet
                            key={characterSheet._id}
                            characterSheet={characterSheet}
                            user={user}
                        />
                    ))}
            <WhiteBoard />
            <DiceRoller user={user} />
            
            <Button variant="primary" onClick={handleShowCreateTemplate}>
                Add a template
            </Button>
        </>
        ) : (
        <p>Loading...</p>
        )}
        </>
    );
}