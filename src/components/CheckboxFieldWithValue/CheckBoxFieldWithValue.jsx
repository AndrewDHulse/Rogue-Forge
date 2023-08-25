export default function CheckboxFieldWithValue({ label, value, onChange, disabled }) {
    const handleChange = (evt) => {
        if (!disabled) {
            onChange(evt.target.checked);
        }
    }
    return (
        <div>
            <label>{label}</label>
            <input
                type="checkbox"
                checked={value}
                onChange={handleChange}
                disabled={disabled}
            />
        </div>
    );
}