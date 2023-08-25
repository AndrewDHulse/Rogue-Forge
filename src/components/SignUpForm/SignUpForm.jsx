import { useState } from 'react';
import { signUp } from '../../utilities/users-service';

export default function SignUpForm({ }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Player'
  });

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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}