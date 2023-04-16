import { createSlice } from "@reduxjs/toolkit";
import { ITodo } from "../../interfaces/interface";

interface ITodoState {
    values: {
    title: string;
    description: string;
  };
  todos:ITodo[]
}

const initialState: ITodoState = {
  values: {
    title: '',
    description: ''
  },
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    handleTodoValues(state, action) {
      state.values = action.payload;
    },
    handleTodos(state,action){
      state.todos = action.payload
    }
  },
});

export const { handleTodoValues,handleTodos } = todoSlice.actions;
export default todoSlice.reducer;
