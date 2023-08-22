import {Link} from 'react-router-dom'
import * as userService from '../../utilities/users-service'

export default function NavBar({ user, setUser }){
    function handleLogOut(){
        userService.logOut();
        setUser(null);
    }

    return(
        <nav>
            <Link to='/sessions/new'>New Session</Link>
            &nbsp;&nbsp;
            <Link to='/sessions/table'>board</Link>
            &nbsp;&nbsp;
            <Link to='/sessions/index'>all sessions</Link>
            &nbsp;&nbsp;
            <span>Welcome, {user.name}</span>
            &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
    )

}