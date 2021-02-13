import {
  Avatar,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import useSWR from "swr";
import fetcher from "../shared/lib/utils/fetcher";

type AvatarSize = "small" | "medium";

interface UserAvatarProps {
  userUid: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  size?: AvatarSize;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    small: {
      width: 20,
      height: 20,
    },
    medium: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    smallText: {
      fontSize: 14,
      textTransform: "uppercase",
    },
    mediumText: {
      fontSize: 18,
      textTransform: "uppercase",
    },
  })
);

const UserAvatar = (props: UserAvatarProps) => {
  const classes = useStyles();
  const { data } = useSWR([`/api/users/${props.userUid}`], fetcher);
  const userName = data?.username ?? "---";
  const size = props.size ?? "small";
  const avatarClassName = size == "small" ? classes.small : classes.medium;
  const textClassName =
    size == "small" ? classes.smallText : classes.mediumText;

  return (
    <Avatar className={avatarClassName} onClick={props.onClick}>
      <Typography className={textClassName}>{userName[0]}</Typography>
    </Avatar>
  );
};

export default UserAvatar;
