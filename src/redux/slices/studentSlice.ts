// slices/studentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StudentState {
  student: {
    DOB: string;
    citizenship: string;
    gender: string;
    educationLevel: "bachelors" | "masters";
    courseInterest: string;
    profile: string;
  } | null;
}

const initialState: StudentState = {
  student: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudent: (state, action: PayloadAction<StudentState["student"]>) => {
      state.student = action.payload;
    },
  },
});

export const { setStudent } = studentSlice.actions;

export default studentSlice.reducer;
