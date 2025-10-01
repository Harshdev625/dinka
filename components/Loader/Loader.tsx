import React from "react";

export const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}>
      <div
        style={{
          display: "inline-block",
          width: "50px",
          height: "50px",
          border: "3px solid rgba(0,0,0,0.1)",
          borderRadius: "50%",
          borderTopColor: "#3498db",
          animation: "spin 1s ease-in-out infinite",
        }}
      />
    </div>
  );
};
