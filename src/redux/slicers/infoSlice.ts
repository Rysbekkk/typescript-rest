import { createSlice } from "@reduxjs/toolkit";

// Define the state type
interface InfoState {
  info: {
    name: string | null;
    email: string | null;
    verified: boolean | null;
  };
}

// Define the initial state with the correct type
const initialState: InfoState = {
  info: {
    name: null,
    email: null,
    verified: null,
  },
};

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    handleInfo(state, action) {
      state.info = action.payload;
    },
  },
});

export const { handleInfo } = infoSlice.actions;
export default infoSlice.reducer;
