export const convertToSlug = (text: string) => {
  return text.toLowerCase().replace(" ", "-");
};

export const convertSlugToText = (slug: string) => {
  return slug.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
};
