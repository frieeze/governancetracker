import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import homeReducer from "components/Home/homeSlice";
import queryReducer from "components/Query/querySlice";

export const store = configureStore({
    reducer: {
        voters: homeReducer,
        query: queryReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
