export default function DropdownField({ label, options }) {
    return (
        <div>
            <label>{label}</label>
            <select>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}