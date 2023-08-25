import { deleteTemplate } from "../../utilities/characterSheets-api";


export default function CharacterSheetTemplate({
    template,
    handleCreateCharacterSheet,
    formData,
    handleChange,
    sessionId={sessionId}
}) {

    const handleDeleteTemplate = async () => {
        try{
            const response = await deleteTemplate(template._id);
            console.log('Delete Response', response);
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
                                {field.options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                ))}
                <button type="submit">Create Character Sheet</button>
                <button type="button" onClick={handleDeleteTemplate}>Delete Template</button>
            </form>
        </div>
    );
}