import useSWR from "swr";
import { REPLIES_API_ENDPOINT } from "../../api/endpoints";
import axiosInstance from "../utils/axiosInstance";
import { throwError } from "../utils/error";
import { getToken } from "../utils/token";

const useReply = (commentId: string) => {
  const { data, error, mutate } = useSWR(REPLIES_API_ENDPOINT(commentId));

  const sendReply = (
    commentId: string,
    text: string,
    callback: (success: boolean) => void
  ) => {
    const token = getToken();

    if (token) {
      let config = {
        headers: {
          "x-auth-token": token,
        },
      };

      axiosInstance
        .post(
          REPLIES_API_ENDPOINT(commentId),
          {
            text: text,
          },
          config
        )
        .then((response: any) => {
          mutate();
          callback(true);
        })
        .catch((error) => {
          callback(false);
          throwError(error);
        });
    }
  };

  return {
    replies: data ? data.replies : data,
    isLoading: !error && !data,
    isError: error,
    sendReply: sendReply,
  };
};

export default useReply;
