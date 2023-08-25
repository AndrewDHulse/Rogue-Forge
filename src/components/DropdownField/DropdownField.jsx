export default function DropdownField({ label, value, options, onChange, disabled }) {

    const handleChange = (evt) => {
        if (!disabled) {
            onChange(evt.target.value);
        }
    }
    return (
        <div>
            <label>{label}</label>
            <select value={value} onChange={handleChange} disabled={disabled}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}