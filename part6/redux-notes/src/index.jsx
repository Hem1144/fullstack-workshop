import { createRoot } from "react-dom/client";
import App from "./ReactQueryApp";
// import { Provider } from "react-redux";
// import store from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
