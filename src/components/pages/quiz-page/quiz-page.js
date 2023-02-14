import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../loader/loader";
import Question from "../../question/question";

import { testFinished } from "../../../features/result/resultSlice";

const QuizPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [time] = useState(Date.now());
  const status = useSelector((state) => state.quiz.status);
  const questions = useSelector((state) => state.quiz.questions);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelection = (event) => {
    setAnswer(event.target.value);
  };

  if (status === "loading") {
    return (
      <div className="page">
        <Loader />
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="page">
        <p>Failed to get questions...</p>
        <NavLink className="button" to="/">
          Try again.
        </NavLink>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Quiz page</h1>
      <Question
        body={questions[currentIndex].body}
        possibleAnswers={questions[currentIndex].possibleAnswers}
        handleSelection={handleSelection}
      />
      <button
        className="button"
        disabled={!answer}
        onClick={() => {
          // If selected answer was coorrect increment score
          if (answer === questions[currentIndex].correctAnswer) {
            setScore(score + 1);
          }
          // Reset answer for next question
          setAnswer("");

          // If it was last question display results
          if (currentIndex === 9) {
            const timeInSeconds = Math.floor((Date.now() - time) / 1000);
            dispatch(testFinished({ time: timeInSeconds, score }));
            navigate("/result");
            return;
          }

          // Go to next question
          setCurrentIndex(currentIndex + 1);
        }}
      >
        Next
      </button>
      <div className="progress">
        <div
          style={{
            width: Math.floor((currentIndex * 100) / 9) + "%",
            height: "24px",
            backgroundColor: "#ff3d00",
            textAlign: "center",
          }}
        />
        <span className="progress-label">
          {currentIndex + 1} / {10}
        </span>
      </div>
    </div>
  );
};

export default QuizPage;
