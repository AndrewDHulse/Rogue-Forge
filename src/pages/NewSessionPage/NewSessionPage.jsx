import { useState, useEffect, useRef } from 'react';
import { createSession } from '../../utilities/sessions-api';
import { getUser } from '../../utilities/users-service';
import CampaignNameField from '../../components/CampaignNameField/CampaignNameField';
import SystemField from '../../components/SystemField/SystemField';
import PlayersField from '../../components/PlayersField/PlayersField';
import { useNavigate } from 'react-router-dom';


export default function NewSessionPage(){
    const navigate= useNavigate();
    const currentUser= getUser()
    const [currentField, setCurrentField]=useState(0);
    const [sessionData, setSessionData] = useState({
        campaignName: '',
        system: '',
        DM: getUser(),
        players:null,
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

    function goToNextField(){
        setCurrentField(currentField + 1);
    }

    function goToPreviousField(){
        setCurrentField(currentField - 1);
    }

    function handleFieldChange(field, value){
        setSessionData((prevData)=> ({
            ...prevData,
            [field]: value === null ? undefined : value,
        }))
    }

    async function handleSubmit(evt){
        evt.preventDefault();
        try{
            await createSession(sessionData);
            navigate('/');
        }catch(err){
            console.log(err)
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
                <button onClick={goToPreviousField} disabled={currentField ===0}>
                    Previous
                </button>
                <button type="submit">Submit</button>
                <button onClick={goToNextField} disabled={currentField === formFields.length -1}>
                    Next
                </button>
            </form>
        </>
    )
}