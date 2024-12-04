import { createSlice } from "@reduxjs/toolkit";
//import { enrollments, courses } from "../Database";
const initialState = {
  enrollments: [],
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    addEnrollment: (state, { payload: enrollment }) => {
      const newEnrollment: any = enrollment;
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    deleteEnrollment: (state, { payload: enrollmentId }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => e._id !== enrollmentId);
    },
  },
});
export const { setEnrollments, addEnrollment, deleteEnrollment } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;