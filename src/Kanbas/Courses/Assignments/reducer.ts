import { createSlice } from '@reduxjs/toolkit';
import { assignments } from '../../Database';

const initialState = {
  assignments: assignments,
};

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    addAssignment(state, {payload: assignment}) {
      console.log(assignment);
      state.assignments = [...state.assignments, assignment]
    },
    deleteAssignment(state, {payload: assignmentId}) {
      state.assignments = state.assignments.filter(
        (m: any) => m._id !== assignmentId);
    },
    updateAssignment(state, {payload: assignment}) {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;