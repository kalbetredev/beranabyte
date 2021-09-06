import React from "react";
import SocialMediaLinks from "./SocialMediaLinks";

const Footer = () => {
  return (
    <footer className="w-full border-t dark:border-gray-700">
      <div className="flex mx-auto flex-col sm:flex-row flex-grow max-w-[960px] sm:px-6 mt-4">
        <div className="sm:w-1/2 flex flex-col items-center sm:items-end justify-center pr-4 py-2 sm:border-r sm:border-gray-600 text-gray-400">
          <div className="flex items-center flex-wrap">
            <SocialMediaLinks />
          </div>
          <div className="flex items-center mb-2">
            <p className="text-xs">Kalkidan Betre</p>
          </div>
        </div>
        <div className="sm:w-1/2 flex flex-col items-center sm:items-start justify-center pl-4 py-2 text-gray-400">
          <p className="text-[10px] ">
            Icons by{" "}
            <a
              href="https://heroicons.com/"
              target="_blank"
              className="font-bold text-xs uppercase text-brand hover:text-brand-light"
            >
              HeroIcons
            </a>
          </p>
          <p className="text-[10px]">
            Social Media Icons & Brand Logos by{" "}
            <a
              href="http://icons8.com"
              target="_blank"
              className="font-bold text-xs uppercase text-brand hover:text-brand-light"
            >
              Icons8
            </a>
          </p>
        </div>
      </div>
      <p className="text-xs text-center mx-auto my-3">
        Copyright (c) 2021 BeranaByte
      </p>
    </footer>
  );
};

export default Footer;
