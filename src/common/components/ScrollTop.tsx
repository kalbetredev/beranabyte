import React, { useEffect, useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/outline";

const ScrollTop = () => {
  const [showBtn, setShowBtn] = useState(false);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 500) setShowBtn(true);
      else setShowBtn(false);
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      <button
        className={
          "rounded-full w-12 h-12 transition duration-300 ease-in-out flex justify-center items-center bg-gray-300 hover:bg-gray-400 hover:text-gray-100 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-700" +
          (showBtn ? " scale-100" : " scale-0")
        }
        onClick={handleClick}
      >
        <ChevronUpIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ScrollTop;
