const BASE_LINK = "https://www.beranabyte.com/";

export const generateFacebookShareLink = (link: string): string => {
  return `https://www.facebook.com/sharer/sharer.php?u=${BASE_LINK}${link}`;
};

export const generateLinkedInShareLink = (link: string): string => {
  return `https://www.linkedin.com/shareArticle?mini=true&url=${BASE_LINK}${link}`;
};
