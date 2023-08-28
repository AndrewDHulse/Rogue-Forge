import WhiteBoard from '../../components/WhiteBoard/WhiteBoard'
import DiceRoller from '../../components/DiceRoller/DiceRoller';
import './SessionTable.css'
export default function SessionTable(user){
    return(
        <div className='page'>
            <h1>A New Adventure</h1>
            <div className='whiteboard'>
                < WhiteBoard />
            </div>
            <div className='diceroller'>
                < DiceRoller user={user}/>
            </div>
        </div>
    );
}