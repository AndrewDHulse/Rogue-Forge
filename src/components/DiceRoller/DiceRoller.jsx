import { useState } from "react";

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

    const handleRoll = (evt) => {
        evt.preventDefault();
        let sum = 0;
        for (let i = 0; i < rollQuantity; i++) {
            sum += Roll[selectedDice]();
        }
        setTotalRoll(sum);
    };

    return (
        <div>
            <form id="diceRoll">
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
                <button id="diceRollButton" onClick={handleRoll}>
                    Roll Em
                </button>
            </form>
            <h1 id="rollOutput">
                Total result for {rollQuantity} {selectedDice}: {totalRoll}
            </h1>
        </div>
    );
}