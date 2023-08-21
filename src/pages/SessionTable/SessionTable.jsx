import WhiteBoard from '../../components/WhiteBoard/WhiteBoard'
import DiceRoller from '../../components/DiceRoller/DiceRoller';
export default function SessionTable(user){
    return(
        <>
            < WhiteBoard />
            < DiceRoller user={user}/>
        </>
    );
}