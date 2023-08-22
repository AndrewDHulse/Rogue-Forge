export default function SessionIndex({sessions}){
    console.log('sessions passed to sessionindex',sessions)
    return(
        <>
            <h1>Sessions Index</h1>
            <ul>
                {sessions.map(session =>(
                    <li key={session._id}>
                        <h2>{session.campaignName}</h2>
                        <p>{session.system}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}