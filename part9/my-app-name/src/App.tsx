import { CoursePart } from "./types";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => value;

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",

      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,

      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",

      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",

      kind: "background",
    },
  ];

  return (
    <>
      <h2>{courseName}</h2>
      {courseParts.map((val) => (
        <div>
          {val.name} {val.exerciseCount}
          {val.kind === "basic" ? (
            <div>{val.description}</div>
          ) : val.kind === "group" ? (
            <div>{val.groupProjectCount}</div>
          ) : val.kind === "background" ? (
            <div>{val.backgroundMaterial}</div>
          ) : (
            assertNever(val)
          )}
        </div>
      ))}
    </>
  );
};

export default App;
