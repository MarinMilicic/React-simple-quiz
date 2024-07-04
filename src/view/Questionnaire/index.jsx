import { useContext, useEffect, useState } from "react"
import Header from "../../components/Header"
import Answers from "../../components/Answers"
import { USER_ANSWERS, USER_LOGIN_INFORMATION } from "../../constants/generic.constants"
import { useNavigate } from "react-router-dom"
import { ArrFromLS, unCheckRadio } from "../../functions/generic.functions"
import { QuestionsContext } from "../../context/questions.context"

export default function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState({})
  const navigate = useNavigate()
  const { questions } = useContext(QuestionsContext)

  const answerHandler = (event) => {
    event.preventDefault()

    const selectedAnswer = +Object.values(Object.fromEntries(new FormData(event.target)))
    // console.log("selectedAnswer", selectedAnswer);

    if (!selectedAnswer) {
      alert("Odaberite odgovor!")
      return
    }

    const currentUserAnswers = ArrFromLS(USER_ANSWERS)
    currentUserAnswers.push(selectedAnswer)

    localStorage.setItem(USER_ANSWERS, currentUserAnswers)

    if (currentUserAnswers.length === questions.length) {
      navigate("/results")
    }

    setCurrentQuestion(questions[currentUserAnswers.length])

    unCheckRadio()
  }

  useEffect(() => {
    if (!localStorage.getItem(USER_LOGIN_INFORMATION)) {
      navigate("/")
    }

    // console.log("Questionnaire: useEffect", questions);

    const currentUserAnswers = ArrFromLS(USER_ANSWERS)

    if (currentUserAnswers.length === questions.length && questions.length) {
      navigate("/results")
    }

    setCurrentQuestion(questions[currentUserAnswers.length])
  }, [questions])

  // console.log("questions", questions);
  // console.log("currentQuestion", currentQuestion);

  return (
    <>
      <Header>Pitanje</Header>
      <main className="flex flex-column flex-ai-center">
        <form className="flex flex-column w-460" onSubmit={answerHandler}>
          <h2 className="m-b-40">{+currentQuestion?.id + 1}. pitanje</h2>
          <fieldset className="m-b-10">
            <legend className="m-b-20">{currentQuestion?.question}</legend>
            <Answers answers={currentQuestion?.answers} renderAnswers={(answer, index) => (
              <div key={index} className="flex m-b-10">
                <input type="radio" className="m-r-10" name={`question-${+currentQuestion.id + 1}`} id={`answer-${index + 1}`} value={index + 1} />
                <label className="bold" htmlFor={`answer-${index + 1}`}>{answer}</label>
              </div>
            )} />
          </fieldset>
          <button type="submit" className="interactive-element-base button bold">Sljedece pitanje</button>
        </form>
      </main>
    </>
  )
}
