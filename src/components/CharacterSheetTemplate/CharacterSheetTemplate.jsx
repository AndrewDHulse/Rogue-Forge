import { useState } from "react"

export default function CharacterSheetTemplate({ 
    templates, 
    handleCreateCharacterSheet,
    formData,
    handleChange
    }) {

    return (
        <div>
        <h2>Character Sheet Templates</h2>
        {templates.map((template) => (
            <div key={template._id}>
            <h3>{template.templateName} </h3>
            <form onSubmit={(evt)=>{
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
                    {field.type === 'text' && <input type="text" id={field._id} />}
                    {field.type === 'number' && <input type="number" id={field._id} />}
                    {field.type === 'checkbox' && <input type="checkbox" id={field._id} />}
                    {field.type === 'dropdown' && (
                    <select id={field._id}>
                        <option value="">fix this later</option>
                    </select>
                    )}
                </div>
                ))}
                <button type="submit">
                Create Character Sheet
                </button>
            </form>
            </div>
        ))}
        </div>
    );
}