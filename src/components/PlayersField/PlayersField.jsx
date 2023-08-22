import {useState, useEffect} from 'react'

import * as usersAPI from '../../utilities/users-api'

export default function PlayersField({ value, onChange }) {
    const [allUsers, setAllUsers] = useState([]);
    
        useEffect(() => {
        async function fetchAllUsers() {
            try {
            const users = await usersAPI.getAllUsers();
            setAllUsers(users);
            } catch (error) {
            console.error(error);
            }
        }
    
        fetchAllUsers();
        }, []);
    
        const handlePlayerChange = (index, playerId) => {
        const updatedPlayers = [...value];
        updatedPlayers[index] = playerId;
        onChange('players', updatedPlayers);
        };
    
        const handleAddPlayer = () => {
        onChange('players', [...value, '']);
        };
    
        return (
        <div>
            <label>Players: </label>
            {value.map((playerId, index) => (
            <div key={index}>
                <select
                value={playerId}
                onChange={(evt) => handlePlayerChange(index, evt.target.value)}
                >
                <option value="">Select a player</option>
                {allUsers.map((user) => (
                    <option key={user._id} value={user._id}>
                    {user.name}
                    </option>
                ))}
                </select>
            </div>
            ))}
            <button type="button" onClick={handleAddPlayer}>
            Add Player
            </button>
        </div>
        );
}