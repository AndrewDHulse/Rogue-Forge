import { useState } from "react";
import CharacterSheetField from "../CharacterSheetField/CharacterSheetField";
import { createTemplate } from "../../utilities/characterSheets-api";
import CheckboxField from "../CheckboxField/CheckBoxField";
import DropdownField from "../DropdownField/DropdownField";
import NumberField from "../NumberField/NumberField";
import TextField from "../TextField/TextField";
import {Button} from 'react-bootstrap'
import './CharacterSheetTemplateForm.css'

export default function CharacterSheetTemplateForm({ sessionId, onClose, onSubmit }){
    const [fields, setFields] = useState([]);
    const [templateName, setTemplateName] = useState('');

    const handleAddField=()=>{
        setFields([
            ...fields, 
            {label: '', type: 'text', dropdownOptionsArray: []}
        ]);
    };

    const handleFieldChange = (index, updatedField) => {
        const updatedFields = [...fields];
    
        if (updatedField.type === "dropdown") {
            updatedFields[index] = {
                ...updatedField,
                dropdownOptionsArray: updatedField.dropdownOptionsArray, 
            };
        } else {
            updatedFields[index] = updatedField;
        }
    
        setFields(updatedFields);
    };

    const handleTemplateNameChange = (evt) => {
        setTemplateName(evt.target.value);
    };

    const handleSubmit = async (evt) =>{
        evt.preventDefault();
        try {
            const templateData = {
                templateName: templateName, 
                fields: fields,
            };
            await onSubmit(templateData);
            onClose()
        }catch(err){
            console.log(err)
        }
    };

    const handleDropdownOptionChange = (index, optionIndex, value) => {
        const updatedFields = [...fields];
        updatedFields[index].dropdownOptionsArray[optionIndex].label = value;
        setFields(updatedFields);
    };
    
    const handleRemoveDropdownOption = (index, optionIndex) => {
        const updatedFields = [...fields];
        updatedFields[index].dropdownOptionsArray.splice(optionIndex, 1);
        setFields(updatedFields);
    };
    
    const handleAddDropdownOption = (index) => {
        const updatedFields = [...fields];
        updatedFields[index].dropdownOptionsArray.push({ label: '', value: '' });
        setFields(updatedFields);
    };

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Template Name: 
                </label>
                &nbsp;
                    <input
                        type="text"
                        value={templateName}
                        onChange={handleTemplateNameChange}
                        required
                        style={{marginTop: "10"}}
                    />
                {fields.map((field, index) =>(
                    <div key={index} style={{ marginBottom: "10px" }}>
                    <CharacterSheetField
                        index={index}
                        field={field}
                        onChange={handleFieldChange}
                        handleDropdownOptionChange ={handleDropdownOptionChange}
                        handleRemoveDropdownOption={handleRemoveDropdownOption}
                        handleAddDropdownOption={handleAddDropdownOption}
                    />
                    </div>
                ))}
                <Button type='button' variant="secondary" onClick={handleAddField}>
                    Add Field        
                </Button>
                        <Button type='submit' variant="secondary">Submit</Button>
            </form>
            <div style={{ border: "1px solid #ccc", padding: "10px" }}>
            <h2>Preview</h2>
            <hr/>
                <h3 className="preview-template-name">{templateName}</h3>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                />
                {fields.map((field, index) => (
                    <div key={index}>
                        <hr/>
                        {field.type === "checkbox" && <CheckboxField label={field.label} />}
                        {field.type === "number" && <NumberField label={field.label} />}
                        {field.type === "text" && <TextField label={field.label} />}
                        {field.type === "dropdown" && (
                            <select
                                id={field._id}
                                name={field.label}
                                value={field.dropdownValue} 
                                onChange={(e) => {
                                    const updatedFields = [...fields];
                                    updatedFields[index].dropdownValue = e.target.value; 
                                    setFields(updatedFields);
                                }}
                            >
                            {field.dropdownOptionsArray.map((option, optionIndex) => (
                            <option key={optionIndex} value={option.value}>
                                {option.label}
                            </option>
                            ))}
                            </select>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}