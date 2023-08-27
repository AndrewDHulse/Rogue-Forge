import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css'
export default function NavBar({ user, setUser }) {
    function handleLogOut() {
    userService.logOut();
    setUser(null);
    }

    if (user) {
        return (
        <nav>
            <Link to= "/" className='brand'>RF</Link>
            &nbsp;&nbsp;
            <Link to="/sessions/new">New Campaign</Link>
            &nbsp;&nbsp;
            <Link to="/sessions/table">Table</Link>
            &nbsp;&nbsp;
            <Link to="/sessions/index">All Campaigns</Link>
            &nbsp;&nbsp;
            <span>Welcome, {user.name}</span>
            &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
        );
    } else {
        
        return (
            <nav>
            <Link to= "/">RF</Link>
            &nbsp;&nbsp;
            <Link to="/sessions/table">board</Link>
            &nbsp;&nbsp;
            <Link to="/auth">Log In or signup</Link>
            &nbsp;&nbsp;
            <span>Welcome, adventurer</span>
        </nav>
        );
    }
}