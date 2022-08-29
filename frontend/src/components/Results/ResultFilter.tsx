interface ResultFilterProps{
    handleChange : (value : string) => void
    selected : string
    options : string[]
    texts : string[]
}

export default function ResultFilter({handleChange,selected,options,texts}:ResultFilterProps){
    return(
        <div className="nes-select">
            <select required id="default_select" defaultValue={selected} onChange={ev => handleChange(ev.target.value)}>
                {
                    options.map((o,i) => <option value={o}>{texts[i]}</option>)
                }
            </select>
        </div>
    )
}