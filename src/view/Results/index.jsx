import { useContext, useEffect } from "react"
import Header from "../../components/Header"
import ResultsRender from "../../components/ResultsRender"
import { useNavigate } from "react-router-dom"
import { ArrFromLS } from "../../functions/generic.functions"
import { USER_ANSWERS, USER_LOGIN_INFORMATION } from "../../constants/generic.constants"
import { QuestionsContext } from "../../context/questions.context"

export default function Results() {

  const navigate = useNavigate()
  const { questions } = useContext(QuestionsContext)

  const userAnswers = ArrFromLS(USER_ANSWERS)
  const corAnsNum = userAnswers.filter((answer, index) => answer === questions[index]?.correctAnswer).length
  const corAnsPerc = corAnsNum / questions.length * 100

  const retryHandler = () => {
    localStorage.removeItem(USER_ANSWERS)
    navigate("/questions")
  }

  const finishHandler = () => {
    localStorage.removeItem(USER_LOGIN_INFORMATION)
    localStorage.removeItem(USER_ANSWERS)
    navigate("/")
  }


  useEffect(() => {
    if (!localStorage.getItem(USER_LOGIN_INFORMATION)) {
      navigate("/")
    }

    if (userAnswers.length < questions.length) {
      navigate("/questions")
    }

    // console.log("Results: useEffect");
  }, [questions])

// console.log("Results");

  return (
    <>
      <Header>Rezultati</Header>
      <main className="flex flex-column flex-ai-center">
        <div>Ukupan broj bodova: {corAnsNum}/{questions.length} - {corAnsPerc}%</div>
        <ResultsRender questions={questions} userAnswers={userAnswers} />
        <button type="button" className="interactive-element-base button bold w-300 m-b-20" onClick={retryHandler}>Pokušaj ponovno</button>
        <button type="button" className="interactive-element-base button bold w-300" onClick={finishHandler}>Završi</button>
      </main>
    </>
  )
}
