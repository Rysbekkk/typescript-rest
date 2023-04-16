import { createSlice } from "@reduxjs/toolkit";

// Define the state type
interface InfoState {
    toggle:boolean
}

// Define the initial state with the correct type
const initialState: InfoState = {
    toggle:false
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleToggle(state) {
      state.toggle = !state.toggle
    },
  },
});

export const { handleToggle } = modalSlice.actions;
export default modalSlice.reducer;
