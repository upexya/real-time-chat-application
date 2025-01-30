import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const initialState: UserState = {
  id: "",
  name: "",
  email: "",
  avatar: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      Object.assign(state, action.payload);
    },
    clearUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
