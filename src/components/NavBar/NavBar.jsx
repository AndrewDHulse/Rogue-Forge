import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function NavBar({ user, setUser }) {
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }

return (
<Navbar bg="dark" variant="dark" expand="sm" className="flex-column">
    <Container className="d-flex flex-column">
    <Navbar.Brand as={Link} to="/" className="brand"></Navbar.Brand>
    <Nav className="flex-column">
        {user ? (
        <>
            <span className='welcome-user'>Welcome, {user.name}</span>
            <Nav.Link as={Link} to="/sessions/new">
            New Campaign
            </Nav.Link>
            <Nav.Link as={Link} to="/sessions/table">
            Table
            </Nav.Link>
            <Nav.Link as={Link} to="/sessions/index">
            All Campaigns
            </Nav.Link>
            <Nav.Link as={Link} to="" onClick={handleLogOut}>
            Log Out
            </Nav.Link>
        </>
        ) : (
        <>
            <span className='welcome-user'>Welcome, adventurer</span>
            <Nav.Link as={Link} to="/sessions/table">
            Table
            </Nav.Link>
            <Nav.Link as={Link} to="/auth">
            Log In or signup
            </Nav.Link>
        </>
        )}
    </Nav>
    </Container>
</Navbar>
);
}