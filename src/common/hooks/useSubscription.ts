import { SUBSCRIBE_API_ENDPOINT } from "../../api/endpoints";
import axiosInstance from "../utils/axiosInstance";

const useSubscription = () => {
  const subscribe = (callback: (success: boolean) => void, email: string) => {
    axiosInstance
      .post(SUBSCRIBE_API_ENDPOINT, {
        email: email,
      })
      .then(() => {
        callback(true);
      })
      .catch(() => {
        callback(false);
      });
  };

  return {
    subscribe: subscribe,
  };
};

export default useSubscription;
