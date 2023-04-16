import { createSlice } from "@reduxjs/toolkit";


interface ILoginState {
    login: {
        name:string
        email: string
        password: string
    },
    errors: {
        [key: string]: string[] | undefined;
    };
  }

const initialState:ILoginState = {
    login: {
        name: '',
        email: '',
        password: ''
    },
    errors: {},
}


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
      handleLogin(state, action) {
        state.login = action.payload;
      },
      clearErrors(state) {
        state.errors = {};
      },
      handleErrors(state, action) {
        if (action.payload && Array.isArray(action.payload)) {
          const errors = action.payload.reduce(
            (acc: { [key: string]: string[] }, error: { field: string; message: string }) => {
              if (!acc[error.field]) {
                acc[error.field] = [];
              }
              acc[error.field].push(error.message);
              return acc;
            }, {});
          state.errors = errors;
        }
      },
    },
  });

export const { handleLogin,clearErrors,handleErrors } = loginSlice.actions
export default loginSlice.reducer