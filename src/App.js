import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./components/pages/home-page/home-page";
import QuizPage from "./components/pages/quiz-page/quiz-page";
import ResultPage from "./components/pages/result-page/result-page";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </div>
  );
}

export default App;
