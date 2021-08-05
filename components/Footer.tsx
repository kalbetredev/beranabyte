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
      <div className="flex flex-col sm:flex-row flex-grow max-w-[960px] py-8 px-3 sm:px-6">
        <div className="flex flex-col sm:justify-center items-center sm:items-end flex-1 sm:border-r sm:pr-4">
          <div className="flex items-center">
            <p className="text-xs">Kalkidan Betre</p>
          </div>
          <div className="flex items-center flex-wrap">
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
        <div className="flex flex-col flex-1 sm:justify-center items-center mt-4 sm:mt-0 sm:items-start sm:pl-4">
          <div>
            <p className="text-xs">Copyright (c) 2021 BeranaByte</p>
          </div>
          <div className="mt-3">
            <p className="text-[10px]">
              Social Media Icons by{" "}
              <a
                className="border p-1 dark:border-gray-500 rounded-lg ml-1 uppercase"
                href="http://icons8.com"
              >
                icons8
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
