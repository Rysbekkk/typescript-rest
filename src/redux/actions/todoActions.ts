import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TODOS } from "../../config";
import { RootState } from "../app/store";
import { handleTodos } from "../slicers/todoSlice";

export const createTodoAsync = createAsyncThunk<void, void, { state: RootState }>(
    'todo/createTodoAsync',
    async (_, { rejectWithValue, dispatch, getState }) => {
        try {
            const { token } = getState().tokenSlice;
            const { values } = getState().todoSlice
            const response = await axios.post(TODOS + '/create-todo',values, {
                headers: {
                    'x-access-token': token
                }
            });
            console.log(response.data,'CREATE TODO');
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

export const getTodosAsync = createAsyncThunk<void, void, { state: RootState }>(
    'todo/getTodosAsync',
    async (_, { rejectWithValue, dispatch, getState }) => {
        try {
            const { token } = getState().tokenSlice;
        
            const response = await axios.get(TODOS + '/get-all-todos', {
                headers: {
                    'x-access-token': token
                }
            });
            console.log(response)
            dispatch(handleTodos(response.data.todos))
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