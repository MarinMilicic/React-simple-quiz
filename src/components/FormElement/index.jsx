import { cloneElement } from "react"

function FormElement({ children, className = "", name, label, error }) {
    return (
        <div className={`flex flex-column ${className}`} >
            <label className="bold m-b-10" htmlFor={name}>{label}:</label>
            {cloneElement(children, {
                name,
                label,
                error,
            })}
            <div className="error-msg bold">{error}</div>
        </div>
    )
}

export default FormElement