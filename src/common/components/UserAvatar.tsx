import React from "react";
import useSWR from "swr";
import { USERS_API_ENDPOINT } from "../../api/endpoints";
import SpinnerIcon from "../../icons/SpinnerIcon";
import IconButtonError from "./IconButtonError";

type AvatarSize = "small" | "default";

interface UserAvatarProps {
  userId: string;
  size?: AvatarSize;
  hideOnError?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = (props: UserAvatarProps) => {
  if (props.userId == "") return null;

  const { data, error } = useSWR(USERS_API_ENDPOINT + "/" + props.userId);
  const isLoading = !error && !data;

  if (error) return props.hideOnError ? null : <IconButtonError />;

  const sizeClasses =
    props.size == "small" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm";

  return (
    <div
      className={
        sizeClasses +
        " mt-1 mr-1 rounded-full border bg-gray-100 dark:bg-gray-600 cursor-default border-gray-300 dark:border-gray-500 flex justify-center items-center text-gray-600 dark:text-gray-300"
      }
    >
      {isLoading ? (
        <SpinnerIcon />
      ) : (
        data.user.email.substring(0, 2).toUpperCase()
      )}
    </div>
  );
};

UserAvatar.defaultProps = {
  size: "default",
  hideOnError: true,
};

export default UserAvatar;
