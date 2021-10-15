import { UserIcon } from "@heroicons/react/outline";
import React from "react";
import SpinnerIcon from "../../icons/SpinnerIcon";
import useAuth, { AuthProvider } from "../../modules/auth/hooks/useAuth";
import useUser from "../hooks/useUser";
import IconButtonError from "./IconButtonError";

type AvatarSize = "small" | "default";

interface UserAvatarProps {
  userId?: string;
  size?: AvatarSize;
}

const UserAvatar: React.FC<UserAvatarProps> = (props: UserAvatarProps) => {
  const sizeClasses =
    props.size == "small" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm";

  const loadUser = (id: string) => {
    const { user, isLoading, error } = useUser(id);

    if (isLoading) return <SpinnerIcon />;
    if (error) return <IconButtonError />;
    return user.email.substring(0, 2).toUpperCase();
  };

  let avatar;

  if (props.userId) {
    avatar = loadUser(props.userId);
  } else {
    const auth: AuthProvider = useAuth();
    avatar = auth.user ? (
      loadUser(auth.user._id)
    ) : (
      <UserIcon className="h-5 w-5" />
    );
  }

  return (
    <div
      className={
        sizeClasses +
        " m-1 rounded-full border bg-gray-100 dark:bg-gray-600 cursor-default border-gray-300 dark:border-gray-500 flex justify-center items-center text-gray-600 dark:text-gray-300"
      }
    >
      {avatar}
    </div>
  );
};

UserAvatar.defaultProps = {
  size: "default",
};

export default UserAvatar;
