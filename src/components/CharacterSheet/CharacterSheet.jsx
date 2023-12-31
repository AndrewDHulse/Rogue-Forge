import { getField, updateCharacterSheet } from "../../utilities/characterSheets-api";
import { useState, useEffect } from "react";
import DropdownFieldWithValues from "../DropdownFieldWithValues/DropdownFieldWithValues";
import TextFieldWithValue from "../TextFieldWithValue/TextFieldWithValue";
import CheckboxFieldWithValue from "../CheckboxFieldWithValue/CheckBoxFieldWithValue";
import NumberFieldWithValue from "../NumberFieldWithValue/NumberFieldWithValue";
import {Button} from 'react-bootstrap'
import './CharacterSheet.css'
export default function CharacterSheet({ user, characterSheet, onDeleteCharacterSheet }) {
    const [template, setTemplate] = useState(null);
    const [fieldData, setFieldData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const handleToggleEdit = () => {
        setIsEditing(prevIsEditing => !prevIsEditing);
    };

    useEffect(() => {
        if (characterSheet && characterSheet.template) {
            setTemplate(characterSheet.template);
        }
    }, [characterSheet]);

    useEffect(() => {
        async function fetchFieldData() {
            try {
                if (!characterSheet || !characterSheet.values) {
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
            } catch (err) {
                console.log('Error fetching field data', err);
            }
        }
    
        if (characterSheet && characterSheet.values) {
            fetchFieldData();
        }
    }, [characterSheet]);

    
    const handleUpdateCharacterSheet = async () => {
        try {
            const updatedValues = fieldData.map(fieldInfo => ({
                field: fieldInfo.fieldData._id,
                value: fieldInfo.value,
            }));
    
            const updatedCharacterSheet = {
                values: updatedValues,
            };
            const response = await updateCharacterSheet(characterSheet._id, updatedCharacterSheet);
            setCharacterSheets(updatedCharacterSheets);
            
        } catch (err) {
            console.log('Error updating character sheet', err);
        }
    };
    
    
    const handleFieldChange = (field, newValue) => {
        setFieldData((prevData) =>
        prevData.map((fieldInfo) => {
            if (fieldInfo.field === field) {
                    return { ...fieldInfo, value: newValue };
                }
                return fieldInfo;
            })
        );
    };

    
    if (!user || !characterSheet || !template) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>{characterSheet.characterName}</h2>
            <p>Template: {template.templateName}</p>
            <ul>
                {fieldData.map((fieldInfo) => {
                    const { field, value, fieldData } = fieldInfo;
                    const fieldType = fieldData.type;
                    return (
                        <li key={field._id}>
                            <hr/>
                            {fieldType === 'checkbox' && (
                                <CheckboxFieldWithValue
                                label={<label className="charactersheetlabel">{fieldData.label}</label>}
                                value={value}
                                disabled={!isEditing}
                                onChange={(newValue) => handleFieldChange(field, newValue)}
                            />
                            )}
                            {fieldType === 'text' && (
                                <TextFieldWithValue
                                    label={<label className="charactersheetlabel">{fieldData.label}</label>}
                                    value={value}
                                    disabled={!isEditing}
                                    onChange={(newValue) => handleFieldChange(field, newValue)}
                                />
                            )}
                            {fieldType === 'number' && (
                                <NumberFieldWithValue
                                    label={<label className="charactersheetlabel">{fieldData.label}</label>}
                                    value={value}
                                    disabled={!isEditing}
                                    onChange={(newValue) => handleFieldChange(field, newValue)}
                                />
                            )}
                            {fieldType === 'dropdown' && (
                                <DropdownFieldWithValues
                                    label={<label className="charactersheetlabel">{fieldData.label}</label>}
                                    value={value}
                                    options={fieldData.options}
                                    disabled={!isEditing}
                                    onChange={(newValue) => handleFieldChange(field, newValue)}
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
            <Button variant="secondary" size="sm" onClick={()=>onDeleteCharacterSheet(characterSheet._id)}>Delete</Button>
            <Button variant="secondary" size="sm" onClick={handleToggleEdit}>Toggle Edit Mode</Button>
            <Button variant="secondary" size="sm" onClick={handleUpdateCharacterSheet}>Update Character Sheet</Button>
        </div>
    );
}