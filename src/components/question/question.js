import "./question.css";

const Question = ({ body, possibleAnswers, handleSelection }) => {
  return (
    <div className="question">
      <h2>{body}</h2>
      <ul className="answers">
        {possibleAnswers.map((answer, i) => {
          return (
            <li
              key={answer + i}
              className="answer-box"
              onChange={handleSelection}
            >
              <input id={i} type="radio" name="answers" value={answer} />
              <label htmlFor={i}>{answer}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Question;
