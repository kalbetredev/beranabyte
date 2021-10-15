import React from "react";
import SpinnerIcon from "../../icons/SpinnerIcon";
import useUser from "../hooks/useUser";
import IconButtonError from "./IconButtonError";

type AvatarSize = "small" | "default";

interface UserAvatarProps {
  userId: string;
  size?: AvatarSize;
  hideOnError?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = (props: UserAvatarProps) => {
  if (props.userId == "") return null;
  const { user, isLoading, error } = useUser(props.userId);

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
      {isLoading ? <SpinnerIcon /> : user.email.substring(0, 2).toUpperCase()}
    </div>
  );
};

UserAvatar.defaultProps = {
  size: "default",
  hideOnError: true,
};

export default UserAvatar;
