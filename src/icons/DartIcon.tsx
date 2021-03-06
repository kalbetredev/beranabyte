import React from "react";

const DartIcon = () => {
  return (
    <span className="w-12 h-12 flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        fillRule="evenodd"
        clipRule="evenodd"
        height="100%"
        width="100%"
        viewBox="0 0 48 48"
      >
        <path
          fill="#1565c0"
          d="m10 12 3 25-8.019-8.019a4 4 0 0 1-.796-4.52L10 12z"
        />
        <path
          fill="#42a5f5"
          d="M27.319 6.319A4.502 4.502 0 0 0 22 5.538L10 12v20.343c0 1.061.421 2.078 1.172 2.828L13 37h22v-5l7-11L27.319 6.319z"
        />
        <path
          fill="#1565c0"
          d="M10 12h21.343c1.061 0 2.078.421 2.828 1.172L42 21v16h-7L10 12z"
        />
        <path fill="#85cbf8" d="M35 37H13l6 6h16z" />
      </svg>
    </span>
  );
};

export default DartIcon;
