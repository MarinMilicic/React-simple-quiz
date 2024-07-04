import { useEffect, useState } from "react"
import Header from "../../components/Header"
import FormElement from "../../components/FormElement"
import InputFormElement from "../../components/FormElement/InputFormElement"
import SelectFormElement from "../../components/FormElement/SelectFormElement"
import { SECURITY_CODE, USER_LOGIN_INFORMATION } from "../../constants/generic.constants"
import { useNavigate } from "react-router-dom"

export default function EntryForm() {

    const INITIAL_ERROR = {
        name: "",
        surname: "",
        sex: "",
        password: "",
    }

    const [error, setError] = useState(INITIAL_ERROR)
    const [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate()

    const formHandler = (event) => {
        event.preventDefault()

        setError(INITIAL_ERROR)

        const data = Object.fromEntries(new FormData(event.target))
        // console.log("Data", data);

        for (const key in data) {
            const validator = validators[key]

            switch (true) {
                case validator?.required && data[key].trim() === "":
                    setError(prevState => ({ ...prevState, [key]: "Polje ne smije biti prazno!" }))
                    break;
                case validator?.maxLength && data[key].length > validator.maxLength:
                    setError(prevState => ({ ...prevState, [key]: `Smije biti maksimalno ${validator.maxLength} znakova!` }))
                    break;
                case validator?.match && data[key] !== validator.match:
                    setError(prevState => ({ ...prevState, [key]: `Neispravan kod!` }))
                    break;
                default:
                    break;
            }
        }
        setUserInfo(data)
    }

    const validators = {
        name: {
            required: true,
            maxLength: 12,
        },
        surname: {
            required: true,
            maxLength: 14,
        },
        sex: {
            required: true,
        },
        password: {
            required: true,
            match: SECURITY_CODE,
        },
    }

    useEffect(() => {
        if (JSON.stringify(error) === JSON.stringify(INITIAL_ERROR) && Object.keys(userInfo).length) {
            localStorage.setItem(USER_LOGIN_INFORMATION, JSON.stringify(userInfo))
        }

        if (localStorage.getItem(USER_LOGIN_INFORMATION)) {
            navigate("/questions")
        }
    }, [userInfo])

    // console.log("userInfo", userInfo);
    // console.log("Error", error);

    return (
        <>
            <Header>Prijavna forma</Header>
            <main className="flex flex-column flex-ai-center">
                <form className="flex flex-column w-260" onSubmit={formHandler}>
                    <FormElement className="m-b-20" name="name" label="Ime" error={error.name}>
                        <InputFormElement type="text" />
                    </FormElement>
                    <FormElement className="m-b-20" name="surname" label="Prezime" error={error.surname}>
                        <InputFormElement type="text" />
                    </FormElement>
                    <FormElement className="m-b-20" name="sex" label="Spol" error={error.sex}>
                        <SelectFormElement />
                    </FormElement>
                    <FormElement className="m-b-40" name="password" label="Sigurnosni kod" error={error.password}>
                        <InputFormElement type="password" />
                    </FormElement>
                    <button className="interactive-element-base button bold" type="submit">Kreni</button>
                </form>
            </main>
        </>

    )
}
