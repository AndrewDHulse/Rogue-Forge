export default function CharacterSheetField({index, field, onChange}){
    const handleFieldChange = (fieldKey, value) =>{
        const updatedField={...field, [fieldKey]: value };
        onChange(index, updatedField);
    };

    return(
        <>
            <input
                type='text'
                value={field.label}
                onChange={evt => handleFieldChange('label', evt.target.value)}
            />
            <select
                value={field.type}
                onChange={evt => handleFieldChange('type', evt.target.value)}
            >
                <option value='text'>text</option>
                <option value='number'>number</option>
                <option value='checkbox'>checkbox</option>
                <option value='dropdown'>dropdown</option>
            </select>
            {field.type === 'dropdown' &&(
                <input
                    type='text'
                    value={field.dropdownOptions}
                    onChange={evt=>
                        handleFieldChange('dropdownOptions', evt.target.value)
                    }
                />
            )}
        </>
    )

}