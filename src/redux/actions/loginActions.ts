import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH } from "../../config";
import { RootState } from "../app/store";
import { setToken } from "../slicers/tokenSlice";
import { clearErrors, handleErrors } from "../slicers/loginSlice";

export const loginAsync = createAsyncThunk<void, string, { state: RootState }>(
    'login/loginAsync',
    async (url, { rejectWithValue, dispatch, getState }) => {
        try {
          const { login } = getState().loginSlice;
          const response = await axios.post(AUTH + url, login);
          console.log(response.data.token);
          dispatch(setToken(response.data.token));
          dispatch(clearErrors());
        } catch (e) {
          console.log(e);
          if (axios.isAxiosError(e) && e?.response?.data.errors) {
              dispatch(handleErrors(e.response.data.errors));
            return;
          } else {
            if (e instanceof Error) {
              return rejectWithValue(e.message);
            } else {
              return rejectWithValue('An unknown error occurred.');
            }
          }
        }
      }
);