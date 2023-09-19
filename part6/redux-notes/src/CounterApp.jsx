import CounterButton from "./CounterButton";
import { useCounterValue } from "/CounterContex";

const App = () => {
  const counter = useCounterValue();

  return (
    <div>
      <div>{counter}</div>
      <div>
        <CounterButton label="+" type="INC" />
        <CounterButton label="-" type="DEC" />
        <CounterButton label="0" type="ZERO" />
      </div>
    </div>
  );
};

export default App;
