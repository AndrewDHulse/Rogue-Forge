export default function TextFieldWithValue({ label, value, onChange, disabled  }) {
    const handleChange = (evt) => {
        if (!disabled) {
            onChange(evt.target.value);
        }
    }
    return (
        <div>
            <label>{label}</label>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                disabled={disabled}
            />
        </div>
    );
}