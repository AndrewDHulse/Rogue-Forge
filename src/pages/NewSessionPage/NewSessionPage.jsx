import { useState, useEffect, useRef } from 'react';
import { createSession, getAllSessions } from '../../utilities/sessions-api';
import { getUser } from '../../utilities/users-service';
import CampaignNameField from '../../components/CampaignNameField/CampaignNameField';
import SystemField from '../../components/SystemField/SystemField';
import PlayersField from '../../components/PlayersField/PlayersField';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function NewSessionPage({setSessions}){
    const navigate= useNavigate();
    const currentUser= getUser()
    const [currentField, setCurrentField]=useState(0);
    const [sessionData, setSessionData] = useState({
        campaignName: '',
        system: '',
        DM: currentUser._id,
        players:[],
    })

    const formFields=[
        {
        component: CampaignNameField,
        field: 'campaignName',
        id: 0
        },
        {
        component: SystemField,
        field: 'system',
        id: 1
        },
        {
        component: PlayersField,
        field: 'players',
        id: 2
        },
    ];

    const CurrentFieldComponent = formFields[currentField].component;

    function goToNextField() {
        if (currentField < formFields.length - 1) {
            setCurrentField(currentField + 1);
        }
    }

    function goToPreviousField() {
        if (currentField > 0) {
            setCurrentField(currentField - 1);
        }
    }

    function handleFieldChange(field, value) {
        setSessionData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    }

    async function handleSubmit(evt){
        evt.preventDefault();
        try{
            await createSession(sessionData);
            console.log('session creation successful')
            const fetchedSessions = await getAllSessions();
            setSessions(fetchedSessions)
            navigate('/sessions/index');
        }catch(err){
            console.log('failed to create new session',err)
        }
    }

    return(
        <>
            <h1>New Session Page</h1>
            <form onSubmit={handleSubmit}>
                <CurrentFieldComponent
                    value={sessionData[formFields[currentField].field]}
                    onChange={handleFieldChange}
                />
                <Button variant='secondary' onClick={goToPreviousField} disabled={currentField ===0}>
                    Previous
                </Button>
                <Button variant='secondary' type="submit">Submit</Button>
                <Button variant='secondary' onClick={goToNextField} disabled={currentField === formFields.length -1}>
                    Next
                </Button>
            </form>
        </>
    )
}