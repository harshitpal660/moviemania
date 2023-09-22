import {configureStore, combineReducers} from "@reduxjs/toolkit";
import { favouriteSlice, moviesSlice, searchQuerySlice, pageUpdateSlice } from "../Reducers/MovieReducer";
const rootReducer = combineReducers({
    favourites: favouriteSlice.reducer,
    movies: moviesSlice.reducer,
    searchQuery: searchQuerySlice.reducer,
    pages: pageUpdateSlice.reducer,
});

export const store = configureStore({
    reducer:rootReducer,
})