import { MESSAGE_API_ENDPOINT } from "../../api/endpoints";
import axiosInstance from "../utils/axiosInstance";
import { throwError } from "../utils/error";

const useMessage = () => {
  const sendMessage = (
    callback: (success: boolean) => void,
    message: string,
    email?: string
  ) => {
    axiosInstance
      .post(MESSAGE_API_ENDPOINT, {
        email: email ? email : "anonymous",
        message: message,
      })
      .then(() => {
        callback(true);
      })
      .catch((error) => {
        callback(false);
        throwError(error);
      });
  };

  return {
    sendMessage: sendMessage,
  };
};

export default useMessage;
