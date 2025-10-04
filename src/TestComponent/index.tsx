import React, { useState } from "react";

const TestComponent = () => {
  const [count, setCount] = useState(0);

  // Increment counter
  const increment = () => {
    setCount(count + 1);
    console.log("Increment clicked"); // AI might suggest removing this
  };
  console.log("Component rendered");
  // Decrement counter
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Counter App</h1>
      <p>Current count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default TestComponent;
