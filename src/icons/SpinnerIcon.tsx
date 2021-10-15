import React from "react";

const SpinnerIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          r="35"
          strokeDasharray="164.93361431346415 56.97787143782138"
        />
      </svg>
    </>
  );
};

export default SpinnerIcon;
