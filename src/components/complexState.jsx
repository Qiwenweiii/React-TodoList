import React, { useState } from "react";
import History from "./history";
import Button from "./button";

const ComplexState = () => {
  const [clicks, setClicks] = useState({ left: 0, right: 0 });
  const [allClicks, setAll] = useState([]);

  const handleLeft = () => {
    setAll([...allClicks, "L"]);
    setClicks({
      ...clicks,
      left: clicks.left + 1,
    });
  };

  const hadnleRight = () => {
    setAll([...allClicks, "R"]);
    setClicks({
      ...clicks,
      right: clicks.right + 1,
    });
  };

  return (
    <>
      {clicks.left}
      <Button onClick={handleLeft}>left</Button>
      <Button onClick={hadnleRight}>right</Button>
      {clicks.right}
      <History allClicks={allClicks} />
    </>
  );
};

export default ComplexState;
