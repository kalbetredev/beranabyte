import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { format } from "date-fns";
import React from "react";
import useSWR from "swr";
import FontSizes from "../constants/fontsizes";
import fetcher from "../shared/lib/utils/fetcher";
import Bullet from "./Bullet";

interface CommentContentProps {
  author: string;
  text: string;
  date: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    name: {
      fontSize: FontSizes.caption,
      color: theme.palette.text.secondary,
    },
    commentText: {
      fontSize: FontSizes.subtitle,
    },
  })
);

const CommentContent = (props: CommentContentProps) => {
  const classes = useStyles();
  const { data } = useSWR([`/api/users/${props.author}`], fetcher);
  const authorName = data?.username ?? "---";

  return (
    <>
      <Typography className={classes.name}>
        {authorName} {<Bullet />}
        {format(new Date(props.date), "MMM d, yyyy")}
      </Typography>
      <Typography className={classes.commentText}>{props.text}</Typography>
    </>
  );
};

export default CommentContent;
