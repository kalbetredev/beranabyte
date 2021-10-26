import { MESSAGE_API_ENDPOINT } from "../../api/endpoints";
import axiosInstance from "../utils/axiosInstance";

const useMessage = () => {
  const sendMessage = (
    callback: (success: boolean) => void,
    content: string,
    email?: string
  ) => {
    axiosInstance
      .post(MESSAGE_API_ENDPOINT, {
        email: email ? email : "anonymous@beranabyte.com",
        content: content,
      })
      .then(() => {
        callback(true);
      })
      .catch(() => {
        callback(false);
      });
  };

  return {
    sendMessage: sendMessage,
  };
};

export default useMessage;
