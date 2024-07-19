import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Scholarship } from "../types";

interface ScholarshipState {
  scholarships: Scholarship[];
}

const initialState: ScholarshipState = {
  scholarships: [],
};

const scholarshipSlice = createSlice({
  name: "scholarship",
  initialState,
  reducers: {
    setScholarships(state, action: PayloadAction<Scholarship[]>) {
      state.scholarships = action.payload;
    },
  },
});

export const { setScholarships } = scholarshipSlice.actions;

export default scholarshipSlice.reducer;
