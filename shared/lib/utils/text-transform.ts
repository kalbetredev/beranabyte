export const capitalize = (text: string): string => {
  let subStrings = text.split(" ");
  subStrings = subStrings.map(
    (subString) => subString.charAt(0).toUpperCase() + subString.slice(1)
  );
  return subStrings.join(" ");
};

export const removeNonAlphaNumeric = (text: string): string => {
  return text.replace(/\W/gi, " ");
};
