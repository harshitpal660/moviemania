import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  similar:{},
  details:{},
  review:{},
};

export const similarSlice = createSlice({
  name: "similar",
  initialState: initialState.similar,
  reducers: {
    setSimilar: (state, action) => {
      return action.payload;
    },
  },
});

export const detailSlice = createSlice({
  name: "detail",
  initialState: initialState.details,
  reducers: {
    setDetails: (state, action) => {
      return action.payload;
    },
  },
});

export const reviewSlice = createSlice({
    name: "review",
    initialState: initialState.review,
    reducers: {
      setReview: (state, action) => {
        return action.payload;
      },
    },
  });

export const {setSimilar} = similarSlice.actions;

export const {setDetails} = detailSlice.actions

export const {setReview} = reviewSlice.actions;
