function SelectFormElement({ name, error }) {
    return (
        <select className={`interactive-element-base ${error && "interactive-element-base--invalid"} m-b-10`} id={name} name={name} defaultValue="">
            <option value="" hidden>Odaberite spol</option>
            <option value="male">Muški</option>
            <option value="female">Ženski</option>
        </select>
    )
}

export default SelectFormElement