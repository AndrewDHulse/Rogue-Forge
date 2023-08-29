export default function DropdownFieldWithValues({ label, value, options, onChange, disabled }) {
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
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}