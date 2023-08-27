export default function DropdownField({ label, value, options, onChange, disabled }) {
    console.log('DropdownField options:', options);
    const handleChange = (evt) => {
        if (!disabled) {
            onChange(evt.target.value);
        }
    }
    return (
        <div>
            <label>{label}</label>
            <select style={{ width: '200px' }} value={value} onChange={handleChange} disabled={disabled}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {console.log('Dropdown component Option Label:', option.label)}
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}