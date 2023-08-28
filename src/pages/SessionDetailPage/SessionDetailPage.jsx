import { useEffect, useState, useRef, Component } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../../utilities/sessions-api";
import { getAllUsers } from "../../utilities/users-api";
import { findUserNameById } from "../../utilities/users-service";
import { 
    showTemplatesForSession, 
    createCharacterSheet, 
    showCharacterSheetsforUser ,
    deleteCharacterSheet,
    createTemplate,
    deleteTemplate
} from "../../utilities/characterSheets-api";

import WhiteBoard from "../../components/WhiteBoard/WhiteBoard";
import DiceRoller from "../../components/DiceRoller/DiceRoller";
import CharacterSheetTemplateForm from "../../components/CharacterSheetTemplateForm/CharacterSheetTemplateForm";
import CharacterSheetTemplate from "../../components/CharacterSheetTemplate/CharacterSheetTemplate";
import CharacterSheet from "../../components/CharacterSheet/CharacterSheet";
import { Tabs, Tab, Button, Modal, Container, Row, Col } from 'react-bootstrap';
import './SessionDetailPage.css';
import ErrorBoundary from "../../ErrorBoundary";

export default function SessionDetailPage({ user, sessions }) {
    const { sessionId } = useParams();
    const [session, setSession] = useState(null);
    const [users, setUsers] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [areTemplatesLoading, setAreTemplatesLoading] = useState(true);
    const [characterSheets, setCharacterSheets] = useState([])
    const [formData, setFormData] = useState({
        characterName: 'Adventurer'
    })
    const [showCreateTemplate, setShowCreateTemplate] = useState(false);
    const handleCloseCreateTemplate = () => setShowCreateTemplate(false);
    const handleShowCreateTemplate = () => setShowCreateTemplate(true);
    const [showTemplate, setShowShowTemplate] = useState(false);
    const handleCloseShowTemplate = () => setShowShowTemplate(false);
    const handleShowShowTemplate = () => setShowShowTemplate(true);
    const [sidebarExpanded, setSidebarExpanded] = useState(false);

    const characterSheetsRef = useRef(characterSheets);
    const templatesRef = useRef([]);

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
                console.log('Fetched templates:', fetchedTemplates)
                templatesRef.current = fetchedTemplates; 
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
                characterSheetsRef.current = fetchedCharacterSheets; 
                setCharacterSheets(fetchedCharacterSheets);
            } catch (err) {
                console.log('Error fetching character sheets', err);
            }
        }
        if (!characterSheetsRef.current.length) { 
            fetchCharacterSheetsForUser();
        } else {
            setCharacterSheets(characterSheetsRef.current); 
        }
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
            handleCloseShowTemplate()
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

    
    const onDeleteCharacterSheet = async (characterSheetId) => {
        try {
            console.log('delete character sheet with ID:', characterSheetId);
            const response = await deleteCharacterSheet(characterSheetId);
            const updatedCharacterSheets = characterSheets.filter(sheet => sheet._id !== characterSheetId);
            setCharacterSheets(updatedCharacterSheets);
            console.log('Delete Response:', response);
        } catch (err) {
            console.log('Error deleting character sheet', err);
        }
    };

    const handleTemplateFormSubmit = async (templateData) =>{
        try {
            await createTemplate(sessionId, templateData);
            const updatedTemplates = await showTemplatesForSession(sessionId);
            setTemplates(updatedTemplates);

            handleCloseCreateTemplate();
        }catch(err){
            console.log(err)
        }
    };

    const handleDeleteTemplate= async (templateId)=>{
        try{
            await deleteTemplate(templateId);
            const updatedTemplates = templates.filter(template => template._id !== templateId)
            setTemplates(updatedTemplates);
        }catch(err){
            console.log('Error deleting template:', err)
        }
    }

        return (
            <Container fluid className={`main-content ${sidebarExpanded ? 'main-content-expanded' : ''}`}>
            {session ? (
                <Row>
                <Col sm={12} md={8} lg={9}>
                    <h1 className="campaign-name">{session.campaignName}</h1>
                    <p>Game Master: {findUserNameById(users, session.DM)}</p>
                    <WhiteBoard />
                    <DiceRoller user={user} />
                    <Button variant="secondary" onClick={handleShowCreateTemplate}>
                    Add a template
                    </Button>
                    <Button variant="secondary" onClick={handleShowShowTemplate}>
                    Create a Character
                    </Button>
                </Col>
                <Col sm={12} md={4} lg={3}>
                    <Button
                    variant="secondary"
                    onClick={() => setSidebarExpanded(!sidebarExpanded)}
                    >
                    Toggle Character Sheets
                    </Button>
                </Col>
                </Row>
            ) : (
                <p>Loading...</p>
            )}
        
        <div className={`sidebar ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
                <Tabs defaultActiveKey={0} id="character-sheets-tabs">
                    {characterSheets.map((characterSheet, index) => (
                        <Tab
                            eventKey={index}
                            title={characterSheet.characterName}
                            key={characterSheet._id}
                        >
                            <CharacterSheet
                                key={characterSheet._id}
                                characterSheet={characterSheet}
                                user={user}
                                characterSheets={characterSheets}
                                onDeleteCharacterSheet={onDeleteCharacterSheet}
                            />
                        </Tab>
                    ))}
                </Tabs>
            </div>

        
            <Modal show={showCreateTemplate} onHide={handleCloseCreateTemplate} centered>
                <Modal.Header closeButton>
                Create a Character Sheet
                </Modal.Header>
                <Modal.Body>
                    <ErrorBoundary>
                <CharacterSheetTemplateForm 
                sessionId={sessionId} 
                onClose={handleCloseCreateTemplate} 
                onSubmit={handleTemplateFormSubmit}
                />
                </ErrorBoundary>
                </Modal.Body>
            </Modal>
        
            <Modal show={showTemplate} onHide={handleCloseShowTemplate} centered>
                <Modal.Header closeButton>
                Create a Character
                </Modal.Header>
                <Modal.Body>
                <Tabs defaultActiveKey={0} id="character-sheet-tabs">
                    {areTemplatesLoading ? (
                    <Tab eventKey={0} title="Loading...">
                        <p>Loading templates...</p>
                    </Tab>
                    ) : (
                    templates.map((template, index) => (
                        <Tab
                        eventKey={index}
                        title={template.templateName}
                        key={template._id}
                        >
                            <ErrorBoundary>
                    <CharacterSheetTemplate
                        onClose={handleCloseShowTemplate}
                        onDeleteTemplate={() => handleDeleteTemplate(template._id)}
                        template={{
                            ...template,
                            fields: (template.fields || []).map(field => {
                                if (field.dropdownOptionsArray) {
                                    return {
                                        ...field,
                                        dropdownOptionsArray: (field.dropdownOptionsArray || []).map(option => ({
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
                        </ErrorBoundary>
                        </Tab>
                    ))
                    )}
                </Tabs>
                </Modal.Body>
            </Modal>
            </Container>
        );
}