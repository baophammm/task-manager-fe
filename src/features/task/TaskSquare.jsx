import React from "react";

function TaskSquare({ children }) {
  return (
    <div
      style={{
        border: "1px solid red",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}

export default TaskSquare;
