import { deleteTemplate } from "../../utilities/characterSheets-api";
import { Button, } from 'react-bootstrap';

export default function CharacterSheetTemplate({
    template,
    handleCreateCharacterSheet,
    formData,
    handleChange,
    sessionId={sessionId},
    onClose,
    onDeleteTemplate,
    dropdownOptionsArray
}) {
    const handleDeleteTemplate = async () => {
        try{
            onDeleteTemplate()
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
                        {field.type === "dropdown" && field.options && (
                        <select
                            id={field._id}
                            name={field.label}
                            value={formData[field.label]}
                            onChange={handleChange}
                        >
                            {field.options.map((option, index) => (
                            <option
                                key={index}
                                value={index}
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