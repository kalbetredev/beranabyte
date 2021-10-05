import APIError from "../../api/models/APIError";

export const throwError = (error) => {
  const { msg } = error.response.data;
  if (msg) throw new APIError(error.response.data.msg);
  else throw new Error(error.message);
};
