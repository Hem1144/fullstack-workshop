import { useState } from "react";
import { createRoot } from "react-dom/client";
import { createStore } from "redux";

const counterReducer = (state = 100, action) => {
  console.log("Action is ", action);
  console.log("State is", state);
  if (action.type === "ADD") {
    const newState = state + 1;
    return newState;
  }
  return state;
};

const store = createStore(counterReducer);

const App = () => {
  const [counter, setCounter] = useState(10);

  const addCounter = () => {
    store.dispatch({ type: "ADD" });
    // setCounter(counter + 1);
  };

  const subtractCounter = () => {
    // setCounter(counter - 1);
  };

  const makeCounter = () => {
    setCounter(0);
  };
  return (
    <>
      {/* <div>{counter}</div> */}
      <div>{store.getState()}</div>
      <button onClick={addCounter}>Add</button>
      <button onClick={subtractCounter}>Subtract</button>
      <button onClick={makeCounter}>Zero</button>
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
store.subscribe(() => {
  root.render(<App />);
});
