import { useState } from "react";
import CharacterSheetField from "../CharacterSheetField/CharacterSheetField";
import { createTemplate } from "../../utilities/characterSheets-api";

export default function CharacterSheetTemplateForm({ sessionId }){
    const [fields, setFields] = useState([]);

    const handleAddField=()=>{
        setFields([...fields, {label: '', type: 'text'}]);
    };
    
    const handleFieldChange = (index, updatedField)=> {
        const updatedFields = [...fields];
        updatedFields[index] = updatedField;
        setFields(updatedFields);
    };

    const handleSubmit = async (evt) =>{
        evt.preventDefault();
        try{
            await createTemplate(sessionId, fields);
        }catch(err){
            console.log(err)
        }
    };

    return(
        <>
            <form onSubmit={handleSubmit}>
                {fields.map((field, index) =>(
                    <CharacterSheetField 
                        key={index}
                        index={index}
                        field={field}
                        onChange={handleFieldChange}
                    />
                ))}
                <button type='button' onClick={handleAddField}>
                    Add Field        
                </button>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}