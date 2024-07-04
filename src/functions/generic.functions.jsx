export function ArrFromLS(item) {
    const itemLS = localStorage.getItem(item) || ""
    return itemLS.split(",").filter(el => el && el != 0).map(el => +el)
}

export function unCheckRadio() {
    const allRadioInputs = document.querySelectorAll("input[type='radio']")
    allRadioInputs.forEach(item => item.checked = false)
}