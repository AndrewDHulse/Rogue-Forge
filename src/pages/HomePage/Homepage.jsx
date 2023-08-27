import './Homepage.css'

export default function HomePage(){
    return(
        <>
            <h1 className="welcome">Welcome to Rogue Forge</h1>
            <div className='body'>
                <h2 className='section-head'>
                    Who Are We?
                </h2>
                <p>
                    Rogue Forge is a tool for Game masters and players to efficiently 
                    run a remote or local game. We feature dynamically created character sheets,
                    so whether you play 5th edition, GURPS, or a system of your own creation, 
                    we are here to help. 
                </p>
                <h2 className='section-head'>
                    Getting Started
                </h2>
                <p>
                    If you've brought your own character sheets, or you are a true rogue 
                    and do not wish to share your name, simply click on the "Table" link.
                    Here, you will find a whiteboard and a diceroller. What else could you possibly need?
                    &nbsp;&nbsp;
                    If instead, you want to join our party, click on the signup link, and we will remember you.
                    Either click "New Campaign", or "All Campaigns".
                </p>
            </div>
        </>
    )
}