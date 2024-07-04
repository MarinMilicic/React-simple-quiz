function Answers({ answers, renderAnswers }) {

    const answersList = answers?.map(renderAnswers)

    return (
        <>{answersList}</>
    )
}

export default Answers