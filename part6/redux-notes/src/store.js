import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";

//! This steps is for redux-toolkit
const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});

export default store;
