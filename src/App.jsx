import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EntryForm from "./view/EntryForm";
import Questionnaire from "./view/Questionnaire";
import Results from "./view/Results";
import { QuestionsContextProvider } from "./context/questions.context";

import "./style.scss";

function App() {

  return (
    <BrowserRouter>
      <QuestionsContextProvider>
        <Routes>
          <Route path="/" element={<EntryForm />} />
          <Route path="/questions" element={<Questionnaire />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </QuestionsContextProvider>
    </BrowserRouter>
  )
}

export default App
