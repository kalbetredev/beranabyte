export const isEmailValid = (email: string): boolean => {
  const pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const result = pattern.test(email);
  return result;
};

export const isShortMessageValid = (message: string): boolean => {
  return message.length >= 5;
};
