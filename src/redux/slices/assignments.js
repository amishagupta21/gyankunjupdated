import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  error: null,
  data: [],
};

/*
data: {
  baseData: {
    id: "123456",
    assignment_name: "Essay on World History",
    subject: "History",
    unit: 4,
    class_no: 10,
    type: "CW",
    status: "draft",
    duration: 60,
  },
  questions: [],
  submissions: [],
}[];
*/

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      return { ...action.payload };
    },
    addAssignments: (state, action) => {
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    },
  },
});

export const { setAssignments, addAssignments } = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
