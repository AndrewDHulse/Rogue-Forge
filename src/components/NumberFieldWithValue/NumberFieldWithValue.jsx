export default function NumberFieldWithValue({ label, value, onChange, disabled}) {
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