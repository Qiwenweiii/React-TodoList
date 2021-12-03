import React, { useState } from "react";

import Display from "./display";
import Button from "./button";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);

  const handleReset = () => setCount(0);
  return (
    <>
      <Display counter={count} />
      <Button onClick={handleIncrement}>Plus</Button>
      <Button onClick={handleReset}>Zero</Button>
      <Button onClick={handleDecrement}>Minus</Button>
    </>
  );
};

export default Counter;
