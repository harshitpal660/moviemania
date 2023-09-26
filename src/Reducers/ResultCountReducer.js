import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalResults: 0,
  totalPages: 0,
};

export const totalResultSlice = createSlice({
  name: "totalResult",
  initialState: initialState.totalResults,
  reducers: {
    setTotalResults: (state, action) => {
      return action.payload;
    },
  },
});

export const totalPageSlice = createSlice({
  name: "totalPage",
  initialState: initialState.totalPages,
  reducers: {
    setTotalPages: (state, action) => {
      return action.payload;
    },
  },
});

export const {setTotalResults} = totalResultSlice.actions;

export const {setTotalPages} = totalPageSlice.actions;
