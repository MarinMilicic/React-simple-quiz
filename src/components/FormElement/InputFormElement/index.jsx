function InputFormElement({ type, name, label, error }) {
    return <input
        className={`interactive-element-base ${error && "interactive-element-base--invalid"} m-b-10`}
        type={type} id={name} name={name} placeholder={label} autoComplete="off"
    />
}

export default InputFormElement