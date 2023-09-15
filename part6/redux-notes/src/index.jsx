import { createRoot } from "react-dom/client";
import { createStore } from "redux";
import App from "./App";
import noteReducer from "./reducers/noteReducer";
import { Provider } from "react-redux";

const store = createStore(noteReducer);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
