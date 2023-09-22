import { createSlice } from "@reduxjs/toolkit";

const localStorageKey = "myFavourites";
// localStorage.removeItem(localStorageKey)
if(!localStorage.getItem(localStorageKey)){
  localStorage.setItem(localStorageKey, JSON.stringify({}));
}

const initialState = {
  favourites: JSON.parse(localStorage.getItem(localStorageKey)) || {},
  movies: [],
  searchQuery: "",
  pages: 1,
  flippedCards: [],
};

export const favouriteSlice = createSlice({
  name: "fav",
  initialState: initialState.favourites,
  reducers: {
    addToFav: (state, action) => {
      const payloadClone = { ...action.payload }; // Create a shallow clone
      payloadClone.addButtonActivated = true; // Add the property to the clone
      action.payload = payloadClone; // Assign the modified clone back to the action
      state[action.payload.id] = action.payload;
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    },
    removeFromFav: (state, action) => {
      const idToRemove = action.payload;
      delete state[idToRemove];
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(state)
      );
    },
  },
});

export const moviesSlice = createSlice({
  name: "Movie",
  initialState: initialState.movies,
  reducers: {
    loadMovie: (state, action) => {
        const array = [...action.payload]
        const favObj = JSON.parse(localStorage.getItem("myFavourites"))
        let newArray = [];
        // console.log(favObj);
        array.forEach(item => {
            if(favObj.hasOwnProperty(item.id)){
                const itemClone = {...item}
                itemClone.addButtonActivated = true;
                item = itemClone;
                newArray.push(item)
                console.log(item);
            }else{
                const itemClone = {...item}
                itemClone.addButtonActivated = false;
                item = itemClone;
                newArray.push(item)
            }
            
          });
      return [...newArray];
    },
  },
});

export const searchQuerySlice = createSlice({
  name: "searchQuery",
  initialState: initialState.searchQuery,
  reducers: {
    setSearchQuery: (state, action) => {
      return action.payload;
    },
  },
});

export const pageUpdateSlice = createSlice({
  name: "pageUpdate",
  initialState: initialState.pages,
  reducers: {
    updatePage: (state, action) => {
      return action.payload;
    },
  },
});

export const flippedCardsSlice = createSlice({
  name: "isFlipped",
  initialState: initialState.flippedCards,
  reducers: {
    getFlippedCards: (state, action) => {
      // return action.payload;
      console.log(state.includes(action.payload));
      const flippedCards = state.includes(action.payload) ? state.filter(id=> id !== action.payload) : [...state,action.payload];
      return flippedCards;
    },
  },
});


export const { addToFav, removeFromFav } = favouriteSlice.actions;

export const { loadMovie } = moviesSlice.actions;

export const { setSearchQuery } = searchQuerySlice.actions;

export const { updatePage } = pageUpdateSlice.actions;

export const { getFlippedCards } = flippedCardsSlice.actions;

// export default favouriteSlice.reducer;
