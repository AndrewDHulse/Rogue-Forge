import { deleteTemplate } from "../../utilities/characterSheets-api";
import { Button, } from 'react-bootstrap';

export default function CharacterSheetTemplate({
    template,
    handleCreateCharacterSheet,
    formData,
    handleChange,
    sessionId={sessionId},
    onClose,
    onDeleteTemplate
}) {
    console.log('Template', template)
    console.log('formdata', formData)
    const handleDeleteTemplate = async () => {
        try{
            onDeleteTemplate()
            console.log('Delete Response', response);
            onClose()
        }catch (err){
            console.log('error deleting template', err)
        }
    };

    return (
        <div key={template._id}>
            <h3>{template.templateName}</h3>
            <form onSubmit={(evt) => {
                evt.preventDefault();
                handleCreateCharacterSheet(template._id);
            }}>
                <label>Name:</label>
                <input
                    type="text"
                    name="characterName"
                    value={formData.characterName}
                    onChange={handleChange}
                    required
                    />
                {(console.log('Template in CharacterSheetTemplate:', template))}
                {template.fields.map((field) => (
                    <div key={field._id}>
                        <hr/>
                        <label htmlFor={field._id}>{field.label}:</label>
                        {field.type === "text" && (
                            <input type="text" 
                            id={field._id}
                            name={field.label}  
                            value={formData[field.label]}
                            onChange={handleChange}
                            />
                            )}
                            
                        {field.type === "number" &&(
                            <input type="number" 
                            id={field._id} 
                            name={field.label} 
                            value={formData[field.label]}
                            onChange={handleChange}
                            />
                            )}
                        {field.type === "checkbox" && (
                            <input type="checkbox" 
                            id={field._id} 
                            name={field.label}
                            value={formData[field.label]} 
                            onChange={handleChange}
                            />
                        )}
                        {field.type === "dropdown" && (
                            <select 
                                id={field._id}
                                name={field.label} 
                                value={formData[field.label]}  
                                onChange={handleChange}
                            >
                                {field.dropdownOptionsArray.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                        selected={option.value === formData[field.label]}  
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                ))}
                <Button type="submit" variant="secondary" >Create Character Sheet</Button>
                <Button type="button"  variant="secondary" onClick={handleDeleteTemplate}>Delete Template</Button>
            </form>
        </div>
    );
}