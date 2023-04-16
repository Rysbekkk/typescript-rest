import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from '../slicers/loginSlice';
import tokenSlice from '../slicers/tokenSlice';
import infoSlice from '../slicers/infoSlice';
import extraSlice from '../slicers/extraSlice';
import todoSlice from '../slicers/todoSlice';
import dynamicSlice from '../slicers/dynamicSlice';
import modalSlice from '../slicers/modalSlice';
import editValuesSlice from '../slicers/editValuesSlice';


export const rootReducer = combineReducers({
    loginSlice,
    tokenSlice,
    extraSlice,
    infoSlice,
    todoSlice,
    dynamicSlice,
    modalSlice,
    editValuesSlice
});