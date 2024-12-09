import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enrollments: [] as any,
};

const enrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {
    setEnrollments(state, {payload: enrollments}) {
      state.enrollments = enrollments;
    },
    addEnrollment(state, {payload: enrollment}) {
      state.enrollments = [...state.enrollments, enrollment]
    },
    deleteEnrollment(state, {payload: { courseId, userId}}) {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.courseId === courseId && e.userId === userId));
    },
  },
});

export const { addEnrollment, deleteEnrollment, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;