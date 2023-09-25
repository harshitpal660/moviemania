import {configureStore, combineReducers} from "@reduxjs/toolkit";
import { favouriteSlice, moviesSlice, searchQuerySlice, pageUpdateSlice,flippedCardsSlice, playButtonClickedSlice, TrailersSlice, modalWarningSlice,showAdultSlice,cardsOnScreenSlice } from "../Reducers/MovieReducer";
const rootReducer = combineReducers({
    favourites: favouriteSlice.reducer,
    movies: moviesSlice.reducer,
    searchQuery: searchQuerySlice.reducer,
    pages: pageUpdateSlice.reducer,
    flippedCards:flippedCardsSlice.reducer,
    playButtonClicked:playButtonClickedSlice.reducer,
    allTrailers: TrailersSlice.reducer,
    modalWarning: modalWarningSlice.reducer,
    showAdult: showAdultSlice.reducer,
    cardsOnScreen: cardsOnScreenSlice.reducer,
});

export const store = configureStore({
    reducer:rootReducer,
})