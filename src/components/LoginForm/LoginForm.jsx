import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    name: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate=useNavigate()
  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
      navigate('/');
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div>
      <div className="form-container">
        <h2>Login</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={credentials.name} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <Button variant="secondary" type="submit">LOG IN</Button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}