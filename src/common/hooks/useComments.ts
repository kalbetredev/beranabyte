import useSWR from "swr";
import {
  COMMENTS_API_ENDPOINT,
  REPLIES_API_ENDPOINT,
} from "../../api/endpoints";
import axiosInstance from "../utils/axiosInstance";
import { throwError } from "../utils/error";
import { getToken } from "../utils/token";

const useComments = (blogId: string) => {
  const { data, error, mutate } = useSWR(COMMENTS_API_ENDPOINT(blogId));

  const sendComment = (
    blogId: string,
    content: string,
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
          COMMENTS_API_ENDPOINT(blogId),
          {
            content: content,
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
    comments: data ? data.comments : data,
    isLoading: !error && !data,
    isError: error,
    sendComment: sendComment,
    sendReply: sendReply,
  };
};

export default useComments;
