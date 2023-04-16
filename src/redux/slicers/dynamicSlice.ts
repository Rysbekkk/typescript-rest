import { createSlice, AsyncThunk, PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { deleteTodoAsync, doneTodoAsync } from "../actions/updateActions";

interface IDynamicState {
  loading: Record<string, Record<string, boolean>>;
  error: Record<string, Record<string, string | null>>;
}

const handleAsyncCases = (
  builder: ActionReducerMapBuilder<IDynamicState>,
  action: AsyncThunk<any, any, any>,
  actionType: string
) => {
  builder.addMatcher(
    (a: any) => a.type === action.pending.type,
    (state, action: PayloadAction<any, string, any>) => {
      const itemId = action.meta.arg;
      state.loading[actionType] = { ...state.loading[actionType], [itemId]: true };
    }
  );
  builder.addMatcher(
    (a: any) => a.type === action.fulfilled.type,
    (state, action: PayloadAction<any, string, any>) => {
      const itemId = action.meta.arg;
      state.loading[actionType] = { ...state.loading[actionType], [itemId]: false };
      state.error[actionType] = { ...state.error[actionType], [itemId]: null };
    }
  );
  builder.addMatcher(
    (a: any) => a.type === action.rejected.type,
    (state, action: PayloadAction<any, string, any, Error>) => {
      const itemId = action.meta.arg;
      state.loading[actionType] = { ...state.loading[actionType], [itemId]: false };
      state.error[actionType] = { ...state.error[actionType], [itemId]: action.error.message };
    }
  );
};

const dynamicSlice = createSlice({
  name: "dynamic",
  initialState: {
    loading: {
      doneTodo: {},
      deleteTodo: {},
    },
    error: {
      doneTodo: {},
      deleteTodo: {},
    },
  } as IDynamicState,
  reducers: {},
  extraReducers: (builder) => {
    const asyncActions = [
      { action: doneTodoAsync, type: "doneTodo" },
      { action: deleteTodoAsync, type: "deleteTodo" },
    ];
    asyncActions.forEach(({ action, type }) =>
      handleAsyncCases(builder, action, type)
    );
  },
});

export default dynamicSlice.reducer;
