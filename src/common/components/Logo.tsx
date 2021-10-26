import React from "react";
import Link from "next/link";
import BeranaByteIcon from "../../icons/BeranaByteIcon";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <a className="h-[23.81px] w-[100px]">
        <BeranaByteIcon />
      </a>
    </Link>
  );
};

export default Logo;
