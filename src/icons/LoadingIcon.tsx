import React from "react";

const LoadingIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      className="animate-spin"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <circle cx="12" cy="2" r="2" fill="#1A5A1A" />
      <circle cx="21" cy="17" r="2" fill="#A5A50C" />
      <circle cx="3" cy="17" r="2" fill="#730D0D" />
    </svg>
  );
};

export default LoadingIcon;
