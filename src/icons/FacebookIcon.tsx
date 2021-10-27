import React from "react";

const FacebookIcon: React.FC = () => {
  return (
    <>
      <span className="h-6 w-6 text-gray-500 dark:text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          height="100%"
          width="100%"
          viewBox="0 0 3333 3333"
        >
          <path
            fill="currentColor"
            d="M1667 0c460 0 877 187 1179 488 302 302 488 718 488 1179 0 460-187 877-488 1179-302 302-718 488-1179 488-460 0-877-187-1179-488C186 2544 0 2128 0 1667c0-460 187-877 488-1179C790 186 1206 0 1667 0zm181 1137h301V776h-301c-232 0-421 189-421 421v181h-241v361h241v963h361v-963h301l60-361h-361v-181c0-33 28-60 60-60zm913-563c-280-280-666-453-1093-453S854 294 575 574c-280 280-453 666-453 1093s173 814 453 1093c280 280 666 453 1093 453s814-173 1093-453c280-280 453-666 453-1093s-173-814-453-1093z"
            fillRule="nonzero"
          />
        </svg>
      </span>
    </>
  );
};

export default FacebookIcon;
