import { useCounterDispatch } from "./CounterContex";

const CounterButton = (props) => {
  const dispatch = useCounterDispatch();

  return (
    <>
      <button
        onClick={() => {
          dispatch({ type: props.type });
        }}
      >
        {props.label}
      </button>
    </>
  );
};

export default CounterButton;
