import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { loginAsync } from "../actions/loginActions";
import { createTodoAsync } from "../actions/todoActions";
import { getTodosAsync } from "../actions/todoActions";

interface IExtra {
  loading: {
    login: boolean;
    createTodo:boolean;
    getTodosAsync:boolean;
    [key: string]: boolean;
  };
  error: {
    login: string | undefined;
    createTodo: string | undefined;
    getTodosAsync: string | undefined;
    [key: string]: string | undefined;
  };
}

const initialState: IExtra = {
  loading: {
    login: false,
    createTodo:false,
    getTodosAsync:false
  },
  error: {
    login: undefined,
    createTodo:  undefined,
    getTodosAsync:undefined
  },
};

const asyncActions = [
  { action: loginAsync, type: "login" },
  { action:createTodoAsync,type:"createTodo"},
  { action:getTodosAsync,type:"getTodo"},
];

const extraSlice = createSlice({
  name: "extra",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    asyncActions.forEach(({ action, type }) => {
      builder
        .addMatcher(
          (a: any) => a.type === action.pending.type,
          (state: IExtra) => {
            state.loading[type] = true;
          }
        )
        .addMatcher(
          (a: any) => a.type === action.fulfilled.type,
          (state: IExtra) => {
            state.loading[type] = false;
            state.error[type] = undefined;
          }
        )
        .addMatcher(
          (a: any) => a.type === action.rejected.type,
          (state: IExtra, action: PayloadAction<any, string, any, SerializedError>) => {
            state.loading[type] = false;
            state.error[type] = action.error.message;
          }
        );
    });
  },
});

export default extraSlice.reducer;