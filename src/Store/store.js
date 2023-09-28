import {configureStore, combineReducers} from "@reduxjs/toolkit";
import { favouriteSlice, moviesSlice, searchQuerySlice, pageUpdateSlice,flippedCardsSlice, playButtonClickedSlice, TrailersSlice, modalWarningSlice,showAdultSlice,cardsOnScreenSlice,showCategoriesSlice,movieDetailPageSlice} from "../Reducers/MovieReducer";
import { totalPageSlice,totalResultSlice } from "../Reducers/ResultCountReducer";
import { similarSlice,detailSlice,reviewSlice } from "../Reducers/CardDetailsReducer";
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
    showCategories: showCategoriesSlice.reducer,
    movieDetailPage: movieDetailPageSlice.reducer,
    totalResults: totalResultSlice.reducer,
    totalPages:totalPageSlice.reducer,
    similar:similarSlice.reducer,
    review:reviewSlice.reducer,
    details:detailSlice.reducer,
});

export const store = configureStore({
    reducer:rootReducer,
})