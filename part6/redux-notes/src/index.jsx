import { createRoot } from "react-dom/client";
import { createStore, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import App from "./App";
import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";
import { Provider } from "react-redux";

//! This code is for pure redux code
// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer,
// });

// const store = createStore(reducer);

//! This steps is for redux-toolkit
const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
