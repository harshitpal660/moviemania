import {configureStore, combineReducers} from "@reduxjs/toolkit";
import { favouriteSlice, moviesSlice, searchQuerySlice, pageUpdateSlice,flippedCardsSlice } from "../Reducers/MovieReducer";
const rootReducer = combineReducers({
    favourites: favouriteSlice.reducer,
    movies: moviesSlice.reducer,
    searchQuery: searchQuerySlice.reducer,
    pages: pageUpdateSlice.reducer,
    flippedCards:flippedCardsSlice.reducer,
});

export const store = configureStore({
    reducer:rootReducer,
})