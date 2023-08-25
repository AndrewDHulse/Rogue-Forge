export default function NumberFieldWithValue({ label, value}) {
    return (
        <div>
            <label>
                {label}
                <input type="number" value={value} />
            </label>
        </div>
    );
}