import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Delegation } from "types";
import { RootState } from "../../app/store";
import { getDelegations } from "./queryAPI";

export interface QueryState {
    address: string;
    delegations: Delegation[];
    status: "idle" | "loading" | "failed";
}

const initialState: QueryState = {
    address: "",
    delegations: [],
    status: "idle",
};

export const getDelegationsHistory = createAsyncThunk(
    "query/getDelegationsHistory",
    async (p: { address: string; from?: number; to?: number }) => {
        return await getDelegations(p.address, p.from, p.to);
    }
);

export const QuerySlice = createSlice({
    name: "query",
    initialState,
    reducers: {
        setAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
        setStatus: (
            state,
            action: PayloadAction<"idle" | "loading" | "failed">
        ) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDelegationsHistory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getDelegationsHistory.fulfilled, (state, action) => {
                state.status = "idle";
                state.delegations = action.payload;
            })
            .addCase(getDelegationsHistory.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const { setAddress } = QuerySlice.actions;

export const selectAddress = (state: RootState) => state.query.address;
export const selectDelegation = (state: RootState) => state.query.delegations;
export const selectStatus = (state: RootState) => state.query.status;

export default QuerySlice.reducer;
