import { useState } from "react";
import MyButton from "./MyButton";
import History from "./History";

const App = () => {
  let initialState = {
    left: 0,
    right: 0,
  };
  // let [left, setLeft] = useState(1);
  // let [right, setRight] = useState(1);
  let [clicks, setClicks] = useState(initialState);
  let [clickHistory, setHistory] = useState([]);
  let [totalClicks, setTotal] = useState(0);

  const increaseByOneLeft = () => {
    let newLeft = clicks.left + 1;
    let newState = {
      left: newLeft,
      right: clicks.right,
    };
    // console.log(clicks);
    setClicks(newState);
    // console.log(clicks);
    setHistory(clickHistory.concat("L"));
    setTotal(newLeft + clicks.right);
    //["R", "L"]
  };

  const increaseByOneRight = () => {
    let newRight = clicks.right + 1;
    setClicks({ left: clicks.left, right: newRight });
    let newLength = clickHistory.length + 1;
    setHistory([...clickHistory, "R"]);
    setTotal(newLength);
  };

  return (
    <div>
      {clicks.left}
      <MyButton someFunction={increaseByOneLeft} text={"left"} />
      {clicks.right}
      <MyButton someFunction={increaseByOneRight} text={"right"} />
      <History history={clickHistory} />
      <div>total clicks: {totalClicks}</div>
    </div>
  );
};

export default App;
