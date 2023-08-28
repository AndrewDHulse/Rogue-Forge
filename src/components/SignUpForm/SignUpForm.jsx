import { useState } from 'react';
import { signUp } from '../../utilities/users-service';
import { useNavigate } from 'react-router-dom';
import { showCharacterSheetsforUser } from '../../utilities/characterSheets-api';
import { Button } from 'react-bootstrap';
export default function SignUpForm({setUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Player'
  });
  const navigate=useNavigate()

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    try {
        await signUp(formData);
        showCharacterSheetsforUser(formData);
        setUser(formData); 
        navigate('/');
    } catch (error) {
        console.error('Error signing up:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
};
  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
        />
        </div>
        <div>
            <label>Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
          />
        </div>
        <div>
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Player">Player</option>
            <option value="DM">DM</option>
          </select>
        </div>
        <Button variant="secondary" type="submit">Sign Up</Button>
      </form>
    </div>
  );
}