import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Quiz } from '../../../types';

interface QuizState {
  quizzes: Quiz[];
}

const initialState: QuizState = {
  quizzes: [],
};

const quizSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    setQuizzes(state, action: PayloadAction<Quiz[]>) {
      const quizzes = action.payload;
      state.quizzes = quizzes;
    },
    addQuiz(state, action: PayloadAction<Quiz>) {
      const quiz = action.payload;
      console.log(quiz);
      state.quizzes = [...state.quizzes, quiz];
    },
    deleteQuiz(state, action: PayloadAction<string>) {
      const quizId = action.payload;
      state.quizzes = state.quizzes.filter(
        (q: any) => q._id !== quizId);
    },
    updateQuiz(state, action: PayloadAction<Quiz>) {
      const quiz = action.payload;
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      ) as any;
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, setQuizzes } = quizSlice.actions;
export default quizSlice.reducer;