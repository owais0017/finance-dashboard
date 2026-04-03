import { createSlice } from "@reduxjs/toolkit";
import { ROLES } from "../../data/mockData";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    role: ROLES.ADMIN,
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setRole } = authSlice.actions;
export default authSlice.reducer;