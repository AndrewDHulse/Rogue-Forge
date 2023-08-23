import { useState } from "react";
import CharacterSheetField from "../CharacterSheetField/CharacterSheetField";
import { createTemplate } from "../../utilities/characterSheets-api";
import CheckboxField from "../CheckboxField/CheckBoxField";
import DropdownField from "../DropdownField/DropdownField";
import NumberField from "../NumberField/NumberField";
import TextField from "../TextField/TextField";

export default function CharacterSheetTemplateForm({ sessionId }){
    const [fields, setFields] = useState([]);
    const [templateName, setTemplateName] = useState('');

    const handleAddField=()=>{
        setFields([...fields, {label: '', type: 'text', dropdownOptions: ['separate options with commas']}]);
        console.log('Fields after adding:', fields)
    };
    
    const handleFieldChange = (index, updatedField)=> {
        const updatedFields = [...fields];
        updatedFields[index] = updatedField;
        setFields(updatedFields);
        console.log('Fields after updating:', fields)
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
            await createTemplate(sessionId, templateData);
        }catch(err){
            console.log(err)
        }
    };

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Template Name: 
                    <input
                        type="text"
                        value={templateName}
                        onChange={handleTemplateNameChange}
                        required
                    />
                </label>
                {fields.map((field, index) =>(
                    <div key={index} style={{ marginBottom: "10px" }}>
                    <CharacterSheetField 
                        index={index}
                        field={field}
                        onChange={handleFieldChange}
                    />
                    </div>
                ))}
                <button type='button' onClick={handleAddField}>
                    Add Field        
                </button>
                <button type='submit'>Submit</button>
            </form>
            <h2>Preview:</h2>
            <div style={{ border: "1px solid #ccc", padding: "10px" }}>
                {fields.map((field, index) => (
                    <div key={index}>
                        {field.type === "checkbox" && <CheckboxField label={field.label} />}
                        {field.type === "number" && <NumberField label={field.label} />}
                        {field.type === "text" && <TextField label={field.label} />}
                        {field.type === "dropdown" && (
                            <DropdownField label={field.label} options={field.dropdownOptions} />
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}