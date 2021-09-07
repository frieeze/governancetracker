import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Voter } from "types";
import { RootState } from "../../app/store";
import { getVoters } from "./homeAPI";

export interface HomeState {
    uniswap: Voter[];
    twitterLinkFilter: boolean;
    status: "loading" | "idle" | "failed";
}

const initialState: HomeState = {
    uniswap: [],
    twitterLinkFilter: false,
    status: "loading",
};

export const getUniVoters = createAsyncThunk("home/getVoters", async () => {
    return await getVoters("uniswap");
});

export const HomeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        switchTwitterFilter: (state) => {
            state.twitterLinkFilter = !state.twitterLinkFilter;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUniVoters.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getUniVoters.fulfilled, (state, action) => {
                state.status = "idle";
                state.uniswap = action.payload;
            });
    },
});

export const { switchTwitterFilter } = HomeSlice.actions;

export const selectUniVoters = (state: RootState) => state.voters.uniswap;
export const selectStatus = (state: RootState) => state.voters.status;
export const selectTwitterFilter = (state: RootState) =>
    state.voters.twitterLinkFilter;

export default HomeSlice.reducer;
