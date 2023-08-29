import { Button } from "react-bootstrap";

export default function CharacterSheetField({ 
    index, 
    field, 
    onChange,
    handleAddDropdownOption,
    handleDropdownOptionChange,
    handleRemoveDropdownOption

    }) {
    const handleFieldChange = (fieldKey, value) => {
        const updatedField = { ...field, [fieldKey]: value };
        onChange(index, updatedField);
    };

    return (
        <>
            <input
                type="text"
                value={field.label}
                onChange={(evt) => handleFieldChange('label', evt.target.value)}
            />
            <select
                value={field.type}
                onChange={(evt) => handleFieldChange('type', evt.target.value)}
            >
                <option value="text">text</option>
                <option value="number">number</option>
                <option value="checkbox">checkbox</option>
                <option value="dropdown">dropdown</option>
            </select>
            {field.type === 'dropdown' && (
    <>
        {field.dropdownOptionsArray.map((option, optionIndex) => (
            <div key={optionIndex}>
                <input
                    type="text"
                    value={option.label}
                    onChange={(evt) => handleDropdownOptionChange(index, optionIndex, evt.target.value)}
                />
                <Button
                    variant="secondary"
                    type="button"
                    onClick={() => handleRemoveDropdownOption(index, optionIndex)}
                >
                    Remove Option
                </Button>
            </div>
        ))}
        <Button
            variant="secondary"
            type="button"
            onClick={() => handleAddDropdownOption(index)}
        >
            Add Option
        </Button>
    </>
)}
        </>
    );
}