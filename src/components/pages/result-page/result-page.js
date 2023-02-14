import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ResultPage = () => {
  const score = useSelector((state) => state.result.score);
  const time = useSelector((state) => state.result.time);

  return (
    <div className="page">
      <h1>Result:</h1>
      <p>Score: {score}</p>
      <p>Time elapsed: {time}s</p>
      <NavLink className="button" to="/">
        Quiz again!
      </NavLink>
    </div>
  );
};

export default ResultPage;
