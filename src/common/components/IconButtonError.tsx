import { ExclamationIcon } from "@heroicons/react/solid";
import React from "react";

const IconButtonError = () => {
  return (
    <div className="rounded-full w-9 h-9 flex justify-center items-center">
      <span className="rounded-full h-8 w-8 border border-red-300 border-opacity-40 flex justify-center items-center ">
        <ExclamationIcon className="w-4 h-4 text-red-400" />
      </span>
    </div>
  );
};

export default IconButtonError;
