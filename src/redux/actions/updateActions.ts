import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TODOS } from "../../config";
import { RootState } from "../app/store";
import { getTodosAsync } from "./todoActions";


export const deleteTodoAsync = createAsyncThunk<void, string, { state: RootState }>(
    'todo/deleteTodoAsync',
    async (id, { rejectWithValue, dispatch, getState }) => {
        try {
            const { token } = getState().tokenSlice;
            const response = await axios.delete(`${TODOS}/delete-todo/${id}`, {
                headers: {
                    'x-access-token': token
                }
            });
            console.log(response.data);
            dispatch(getTodosAsync())
        } catch (e) {
            console.log(e);
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            } else {
                return rejectWithValue('An unknown error occurred.');
            }
        }
    }
);


export const doneTodoAsync = createAsyncThunk<void, string, { state: RootState }>(
    'todo/doneTodoAsync',
    async (id, { rejectWithValue, dispatch, getState }) => {
        try {
            const { token } = getState().tokenSlice;
            const response = await axios.patch(`${TODOS}/done-todo/${id}`,null, {
                headers: {
                    'x-access-token': token
                }
            });
            console.log(response.data);
            dispatch(getTodosAsync())
        } catch (e) {
            console.log(e);
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            } else {
                return rejectWithValue('An unknown error occurred.');
            }
        }
    }
);


export const editTodoAsync = createAsyncThunk<void, void, { state: RootState }>(
    'todo/editTodoAsync',
    async (_, { rejectWithValue, dispatch, getState }) => {
      
        try {
            const {saveId,editValues} = getState().editValuesSlice
            const { token } = getState().tokenSlice;
            const response = await axios.put(`${TODOS}/edit-todo/${saveId}`,editValues, {
                headers: {
                    'x-access-token': token
                }
            });
            console.log(response);
            dispatch(getTodosAsync())
        } catch (e) {
            console.log(e);
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            } else {
                return rejectWithValue('An unknown error occurred.');
            }
        }
    }
);