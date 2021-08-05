import IconButton from "./IconButton";
import {
  FacebookIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  TelegramIcon,
} from "../icons";

const Footer = () => {
  return (
    <footer className="flex justify-center border-t dark:border-gray-700">
      <div className="flex flex-grow max-w-[960px] py-8 px-3 sm:px-6">
        <div className="flex flex-col flex-1 border-r pr-4">
          <div className="flex justify-end items-center">
            <p className="text-xs">Kalkidan Betre</p>
          </div>
          <div className="flex justify-end items-center">
            <IconButton>
              <GitHubIcon />
            </IconButton>
            <IconButton>
              <LinkedInIcon />
            </IconButton>
            <IconButton>
              <TelegramIcon />
            </IconButton>
            <IconButton>
              <MailIcon />
            </IconButton>
            <IconButton>
              <FacebookIcon />
            </IconButton>
          </div>
        </div>
        <div className="flex flex-col flex-1 justify-center pl-4">
          <div className="">
            <p className="text-xs">Copyright (c) 2021 BeranaByte</p>
          </div>
          <div className="mt-2">
            <p className="text-[10px]">
              Social Media Icons by{" "}
              <a className="text-brand" href="http://icons8.com">
                icons8.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
