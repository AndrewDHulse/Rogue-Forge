export default function CheckboxFieldWithValue({ label, value}) {
    return (
        <div>
            <label>
                {label}
                <input type="checkbox" value={value} />
            </label>
        </div>
    );
}