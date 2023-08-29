export default function DropdownFieldWithValues({ label, value, options, onChange, disabled }) {
    console.log('DropdownField options:', options);
    const handleChange = (evt) => {
        if (!disabled) {
            onChange(evt.target.value);
        }
    };

    const selectedValue = value !== null && value !== undefined ? value : '';

    return (
        <div>
            <label>{label}</label>
            <select style={{ width: '200px' }} value={selectedValue} onChange={handleChange} disabled={disabled}>
                {options.map((option, index) => (
                    <option key={index} value={index}>
                        {console.log('Dropdown component Option Label:', option.label)}
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}