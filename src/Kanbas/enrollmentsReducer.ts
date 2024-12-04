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
    deleteEnrollment(state, {payload: enrollmentId}) {
      state.enrollments = state.enrollments.filter(
        (e: any) => e._id !== enrollmentId);
    },
  },
});

export const { addEnrollment, deleteEnrollment, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;