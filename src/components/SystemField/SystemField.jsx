export default function SystemField({value, onChange}){
    return(
        <>
            <label>System:</label>
            <input
                type="text"
                value={value}
                onChange={(evt)=> onChange('system', evt.target.value)}
            />
        </>
    )
}