export default function NumberFieldWithValue({ label, value, onChange, disabled}) {
    const handleChange = (evt) => {
        if (!disabled) {
            onChange(evt.target.value);
        }
    }
    return (
        <div>
            <label>{label}</label>
            <input
                type="number"
                value={value}
                onChange={handleChange}
                disabled={disabled}
            />
        </div>

    );
}