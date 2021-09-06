import React from "react";
import LoadingIcon from "../../icons/LoadingIcon";

const IconButtonLoading = () => {
  return (
    <div className="rounded-full w-9 h-9 flex justify-center items-center">
      <span className="rounded-full h-8 w-8 border text-gray-500 border-gray-500 border-opacity-40 flex justify-center items-center">
        <LoadingIcon />
      </span>
    </div>
  );
};

export default IconButtonLoading;
