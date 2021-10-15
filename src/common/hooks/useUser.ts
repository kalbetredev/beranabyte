import useSWR from "swr";
import { USERS_API_ENDPOINT } from "../../api/endpoints";

const useUser = (userId: string) => {
  const { data, error } = useSWR(USERS_API_ENDPOINT + "/" + userId);

  return {
    user: data ? data.user : data,
    isLoading: !error && !data,
    error: error,
  };
};

export default useUser;
