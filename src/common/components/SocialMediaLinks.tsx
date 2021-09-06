import React from "react";
import { AtSymbolIcon } from "@heroicons/react/solid";
import {
  GitHubIcon,
  LinkedInIcon,
  TelegramIcon,
  FacebookIcon,
} from "../../icons";
import IconButton from "./IconButton";
import useSWR from "swr";
import { BIO_API_ENDPOINT } from "../../api/endpoints";
import { Bio } from "../types/Bio";
import IconButtonLoading from "./IconButtonLoading";
import IconButtonError from "./IconButtonError";

const SocialMediaLinks = () => {
  const { data, error } = useSWR(BIO_API_ENDPOINT);
  const myBio: Bio | null = data?.bio ?? null;
  const isLoading: boolean = !error && !data;

  if (isLoading)
    return (
      <>
        {[0, 1, 2, 3].map((index) => (
          <IconButtonLoading />
        ))}
      </>
    );

  if (error)
    return (
      <>
        {[0, 1, 2, 3].map((index) => (
          <IconButtonError />
        ))}
      </>
    );

  return (
    <>
      <IconButton slug={myBio.gitHubLink}>
        <GitHubIcon />
      </IconButton>
      <IconButton slug={myBio.linkedinLink}>
        <LinkedInIcon />
      </IconButton>
      <IconButton slug={myBio.telegramLink}>
        <TelegramIcon />
      </IconButton>
      <IconButton slug={myBio.email}>
        <AtSymbolIcon className="h-6 w-6 text-gray-500" />
      </IconButton>
      <IconButton slug={myBio.facebookLink}>
        <FacebookIcon />
      </IconButton>
    </>
  );
};

export default SocialMediaLinks;
