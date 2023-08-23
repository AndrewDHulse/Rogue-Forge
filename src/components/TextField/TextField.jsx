export default function TextField({ label }) {
    return (
        <div>
            <label>
                {label}
                <input type="text" />
            </label>
        </div>
    );
}