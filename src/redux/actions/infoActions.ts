import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TODOS } from "../../config";
import { RootState } from "../app/store";
import { handleInfo } from "../slicers/infoSlice";

export const getInfoAsync = createAsyncThunk<void, void, { state: RootState }>(
    'info/getInfoAsync',
    async (_, { rejectWithValue, dispatch, getState }) => {
        try {
            const { token } = getState().tokenSlice;
            const response = await axios.get(TODOS + '/get-info', {
                headers: {
                    'x-access-token': token
                }
            });
            console.log(response);
            dispatch(handleInfo(response.data));
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