import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quizzes: [] as any,
};

const quizSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    setQuizzes(state, {payload: quizzes}) {
      state.quizzes = quizzes;
    },
    addQuiz(state, {payload: quiz}) {
      console.log(quiz);
      state.quizzes = [...state.quizzes, quiz]
    },
    deleteQuiz(state, {payload: quizId}) {
      state.quizzes = state.quizzes.filter(
        (m: any) => m._id !== quizId);
    },
    updateQuiz(state, {payload: quiz}) {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quiz._id ? quiz : a
      ) as any;
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, setQuizzes } = quizSlice.actions;
export default quizSlice.reducer;