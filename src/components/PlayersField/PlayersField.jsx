import { useState, useEffect } from 'react';
import * as usersAPI from '../../utilities/users-api';

export default function PlayersField({ onChange }) {
    const [allUsers, setAllUsers] = useState([]);
    const [players, setPlayers] = useState([]); // Separate state for players

    useEffect(() => {
        async function fetchAllUsers() {
            try {
                const users = await usersAPI.getAllUsers();
                const playersOnly = users.filter(user => user.role === 'Player');
                setAllUsers(playersOnly);
            } catch (error) {
                console.error(error);
            }
        }

        fetchAllUsers();
    }, []);

    const handlePlayerChange = (index, playerId) => {
        const updatedPlayers = [...players];
        updatedPlayers[index] = playerId;
        setPlayers(updatedPlayers);
        onChange(updatedPlayers);
    };

    const handleAddPlayer = () => {
        setPlayers([...players, '']);
        onChange([...players, '']);
    };

    return (
        <div>
            <label>Players: </label>
            {players.map((playerId, index) => (
                <div key={index}>
                    <select
                        value={playerId}
                        onChange={evt => handlePlayerChange(index, evt.target.value)}
                    >
                        <option value="">Select a player</option>
                        {allUsers.map(user => (
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