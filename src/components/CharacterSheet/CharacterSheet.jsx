import { showCharacterSheetsforUser, getField, deleteCharacterSheet } from "../../utilities/characterSheets-api";
import { useState, useEffect } from "react";
import DropdownField from "../DropdownField/DropdownField";
import TextFieldWithValue from "../TextFieldWithValue/TextFieldWithValue";
import CheckboxFieldWithValue from "../CheckboxFieldWithValue/CheckBoxFieldWithValue";
import NumberFieldWithValue from "../NumberFieldWithValue/NumberFieldWithValue";


export default function CharacterSheet({ user, characterSheet }) {
    const [template, setTemplate] = useState(null);
    const [fieldData, setFieldData] = useState([]);

    useEffect(() => {
        console.log('characterSheet prop:', characterSheet);
        if (characterSheet && characterSheet.template) {
            setTemplate(characterSheet.template);
        }
    }, [characterSheet]);

    useEffect(() => {
        async function fetchFieldData() {
            try {
                if (!characterSheet || !characterSheet.values) {
                    console.log('characterSheet or values is null or undefined');
                    return;
                }
                const fieldPromises = characterSheet.values.map(async (valueObj) => {
                    const { field, value } = valueObj;
                    const fieldResponse = await getField(valueObj.field);
        
                    return {
                        field,
                        value,
                        fieldData: fieldResponse,
                    };
                });
        
                const resolvedFieldData = await Promise.all(fieldPromises);
                setFieldData(resolvedFieldData);
                console.log('resolved field data:', resolvedFieldData)
            } catch (err) {
                console.log('Error fetching field data', err);
            }
        }
    
        if (characterSheet && characterSheet.values) {
            fetchFieldData();
        }
    }, [characterSheet]);

    if (!user || !characterSheet || !template) {
        return <p>Loading...</p>;
    }

    const handleDeleteCharacterSheet = async () => {
        try {
            const response = await deleteCharacterSheet(characterSheet._id);
            console.log('Delete Response:', response);
        } catch (err) {
            console.log('Error deleting character sheet', err);
        }
    };

    return (
        <div>
            <h3>{characterSheet.characterName}</h3>
            <p>Template: {template.templateName}</p>
            <ul>
                {fieldData.map((fieldInfo) => {
                    const { field, value, fieldData } = fieldInfo;
                    const fieldType = fieldData.type;
                    console.log(fieldData.label)

                    return (
                        <li key={field._id}>
                            {fieldType === 'checkbox' && (
                                <CheckboxFieldWithValue label={fieldData.label} value={value} />
                            )}
                            {fieldType === 'text' && (
                                <TextFieldWithValue label={fieldData.label} value={value} />
                            )}
                            {fieldType === 'number' && (
                                <NumberFieldWithValue label={fieldData.label} value={value} />
                            )}
                            {fieldType === 'dropdown' && (
                                <DropdownField label={fieldData.label} value={value} />
                            )}
                        </li>
                    );
                })}
            </ul>
            <button onClick={handleDeleteCharacterSheet}>Delete Character Sheet</button>
        </div>
    );
}