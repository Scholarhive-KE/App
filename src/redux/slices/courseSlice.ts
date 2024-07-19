import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../types";

interface CourseState {
  courses: Course[];
}

const initialState: CourseState = {
  courses: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
  },
});

export const { setCourses } = courseSlice.actions;

export default courseSlice.reducer;
