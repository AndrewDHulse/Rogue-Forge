import WhiteBoard from '../../components/WhiteBoard/WhiteBoard'
import DiceRoller from '../../components/DiceRoller/DiceRoller';
export default function SessionTable(user){
    console.log('user passed to session table', user)
    return(
        <>
            < WhiteBoard />
            < DiceRoller user={user}/>
        </>
    );
}