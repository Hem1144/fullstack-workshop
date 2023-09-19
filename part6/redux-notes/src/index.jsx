import { createRoot } from "react-dom/client";
import App from "./CounterApp";
// import { Provider } from "react-redux";
// import store from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CounterContextProvider } from "./CounterContex";

//! This code is for pure redux code
// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer,
// });

// const store = createStore(reducer);

const container = document.getElementById("root");
const root = createRoot(container);

const queryClient = new QueryClient();

root.render(
  //! props.children type component
  <CounterContextProvider>
    <App />
  </CounterContextProvider>
);
