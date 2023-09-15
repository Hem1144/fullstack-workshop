import { createRoot } from "react-dom/client";
import { createStore, combineReducers } from "redux";
import App from "./App";
import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";
import { Provider } from "react-redux";

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});

const store = createStore(reducer);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
