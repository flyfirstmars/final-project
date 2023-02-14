import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import Loader from "../../loader/loader";

import { fetchQuestions } from "../../../features/quiz/quizSlice";
import { testStarted } from "../../../features/result/resultSlice";

const HomePage = () => {
  const [status, setStatus] = useState("idle");
  const [categories, setCategories] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      setStatus("loading");
      setCategories(
        (await axios.get("https://opentdb.com/api_category.php")).data
          .trivia_categories
      );
      setStatus("idle");
    };

    dispatch(testStarted());
    getCategories();
  }, []);

  const handleSelection = (event) => {
    if (event.target.id === "difficulties") {
      setDifficulty(event.target.value);
      return;
    }

    setCategory(event.target.value);
  };

  if (status === "loading") {
    return (
      <div className="home-page">
        <Loader />
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Choose quiz:</h1>

      <label htmlFor="difficulties">Difficulty:</label>
      <select name="difficulties" id="difficulties" onChange={handleSelection}>
        <option value="">Any</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <label htmlFor="categories">Category:</label>
      <select name="categories" id="categories" onChange={handleSelection}>
        <option value="">Any</option>
        {categories.map((c, i) => {
          return (
            <option key={i} value={c.id}>
              {c.name}
            </option>
          );
        })}
      </select>

      <NavLink
        className="button"
        onClick={() => {
          dispatch(fetchQuestions(difficulty, category)());
        }}
        to="/quiz"
      >
        Start Quiz
      </NavLink>
    </div>
  );
};

export default HomePage;
