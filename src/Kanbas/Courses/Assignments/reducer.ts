import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assignments: [] as any,
};

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    setAssignments(state, {payload: assignments}) {
      state.assignments = assignments;
    },
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

export const { addAssignment, deleteAssignment, updateAssignment, setAssignments } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;