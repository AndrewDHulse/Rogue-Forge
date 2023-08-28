import { useNavigate } from 'react-router-dom'
import {useState} from 'react'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'


export default function AuthPage({ setUser }) {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(true);

    return (
        <main className="AuthPage">
            <h1>Signup or Login</h1>
            {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
            <div>
                <h2 onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SWITCH TO SIGN UP' : 'SWITCH TO LOG IN'}</h2>
            </div>
        </main>
    );
}