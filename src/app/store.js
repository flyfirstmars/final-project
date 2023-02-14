import { configureStore } from '@reduxjs/toolkit';

import quizReducer from '../features/quiz/quizSlice';
import resultReducer from '../features/result/resultSlice';

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    result: resultReducer,
  },
});
