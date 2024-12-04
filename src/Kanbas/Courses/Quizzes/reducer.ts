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
        (q: any) => q._id !== quizId);
    },
    updateQuiz(state, {payload: quiz}) {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      ) as any;
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, setQuizzes } = quizSlice.actions;
export default quizSlice.reducer;