export default function SessionNameField({value, onChange}){
    return(
        <>
            <label>Campaign Name:</label>
            <input
                type="text"
                value={value}
                onChange={(evt)=> onChange('campaignName', evt.target.value)}
            />
        </>
    )
}