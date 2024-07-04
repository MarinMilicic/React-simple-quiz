import { createContext, useEffect, useState } from 'react'

const QuestionsContext = createContext(null)

function QuestionsContextProvider({ children }) {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/questions").then(prom => prom.json()).then(res => {
            setQuestions(res)
            // console.log("Context: useEffect");
        })

    }, [])


    return (
        <QuestionsContext.Provider value={{ questions }}>{children}</QuestionsContext.Provider>
    )
}

export { QuestionsContext, QuestionsContextProvider }