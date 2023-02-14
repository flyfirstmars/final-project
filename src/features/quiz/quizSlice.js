import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  state: "idle",
  questions: [],
};

export const fetchQuestions = (difficulty, category) =>
  createAsyncThunk("quiz/fetchQuestions", async () => {
    let paramString = "";

    if (difficulty) {
      paramString += `difficulty=${difficulty}`;
      if (category) {
        paramString += "&";
      }
    }

    if (category) {
      paramString += `category=${category}`;
    }

    const questions = (
      await axios.get(`https://opentdb.com/api.php?${paramString}&amount=10&`)
    ).data.results.map((question) => {
      return {
        body: decode(question.question),
        correctAnswer: decode(question.correct_answer),
        possibleAnswers: [
          question.correct_answer,
          ...question.incorrect_answers,
        ]
          .sort(() => 0.5 - Math.random())
          .map((q) => decode(q)),
      };
    });

    return questions;
  });

const quizReducer = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions().pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions().fulfilled, (state, action) => {
        state.questions = action.payload;
        state.status = "idle";
      });
  },
});

export default quizReducer.reducer;

function decode(str) {
  let txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}
