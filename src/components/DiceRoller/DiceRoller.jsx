import { useState, useEffect } from "react";
import './DiceRoller.css'
export default function DiceRoller({ user }) {
    const Roll = {
        D4: () => Math.floor(Math.random() * 4) + 1,
        D6: () => Math.floor(Math.random() * 6) + 1,
        D8: () => Math.floor(Math.random() * 8) + 1,
        D10: () => Math.floor(Math.random() * 10) + 1,
        D12: () => Math.floor(Math.random() * 12) + 1,
        D20: () => Math.floor(Math.random() * 20) + 1,
        D100: () => Math.floor(Math.random() * 100) + 1,
    };
    
    const diceOptions = Object.keys(Roll);
    
    const [selectedDice, setSelectedDice] = useState(diceOptions[0]); 
    const [rollQuantity, setRollQuantity] = useState(1);
    const [totalRoll, setTotalRoll] = useState(0);
    const [diceRolled, setDiceRolled] = useState(false)
    const [rollingUser, setRollingUser] = useState(null);

    const handleRoll = (evt) => {
        evt.preventDefault();
        let sum = 0;
        for (let i = 0; i < rollQuantity; i++) {
            sum += Roll[selectedDice]();
        }
        setTotalRoll(sum);
        setDiceRolled(true);
        setRollingUser(user.name);
    };

    useEffect(() => {
    }, [rollingUser]);

    
    return (
        <div>
            <form className="diceRoll">
                <input
                    type="number"
                    id="diceQuantity"
                    min="1"
                    max="100"
                    value={rollQuantity}
                    onChange={(evt) => setRollQuantity(evt.target.value)}
                />
                <select
                    value={selectedDice}
                    onChange={(evt) => setSelectedDice(evt.target.value)}
                >
                    {diceOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <button className="diceRollButton" onClick={handleRoll}>
                    Roll Em
                </button>
            {diceRolled && (
                <h1 className="rollOutput">
                    Result for {rollQuantity} {selectedDice}: {totalRoll}
                </h1>
            )}
            </form>
        </div>
    );
}