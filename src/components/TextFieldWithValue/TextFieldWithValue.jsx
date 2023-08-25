export default function TextFieldWithValue({ label, value }) {
    return (
        <div>
            <label>
                {label}
                <input type="text" value={value}/>
            </label>
        </div>
    );
}