import { showCharacterSheetsforUser } from "../../utilities/characterSheets-api";
import { useState, useEffect } from "react";

export default function CharacterSheet({ user }) {
    const [characterSheets, setCharacterSheets] = useState([]);

    useEffect(() => {
        async function fetchCharacterSheets() {
            try {
                const fetchedCharacterSheets = await showCharacterSheetsforUser(user._id);
                setCharacterSheets(fetchedCharacterSheets);
            } catch (err) {
                console.log('Error fetching character sheets', err);
            }
        }
        fetchCharacterSheets();
    }, [user]);

    return (
        <>
            <h1>Character Sheets</h1>
            {characterSheets.map((characterSheet) => (
                <div key={characterSheet._id}>
                    <h3>{characterSheet.characterName}</h3>
                    <p>Template: {characterSheet.template.templateName}</p>
                    <ul>
                    {characterSheet.values.map((valueObj) => (
                        <li key={valueObj.field._id}>
                            {valueObj.field.label}: {valueObj.value}
                        </li>
                    ))}
                </ul>
                </div>
            ))}
        </>
    );
}