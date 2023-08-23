export default function CheckboxField({ label }) {
    return (
        <div>
            <label>
                {label}
                <input type="checkbox" />
            </label>
        </div>
    );
}