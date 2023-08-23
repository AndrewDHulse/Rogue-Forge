export default function NumberField({ label }) {
    return (
        <div>
            <label>
                {label}
                <input type="number" />
            </label>
        </div>
    );
}