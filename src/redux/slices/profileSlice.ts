import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  profile: { email: string; name: string; role: string } | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  profile: null,
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: UserState["profile"]; token: string }>
    ) => {
      state.profile = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.profile = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
