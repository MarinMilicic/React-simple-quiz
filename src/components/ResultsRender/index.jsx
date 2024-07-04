import React from 'react'

function ResultsRender({ questions, userAnswers }) {
  const results = userAnswers.map((answer, index) => {
    return <li key={index}>Korisnikov odgovor: {answer} | Točan odgovor: {questions[index]?.correctAnswer}</li>
  })

  return (
    <ul className='m-b-40'>{results}</ul>
  )
}

export default ResultsRender