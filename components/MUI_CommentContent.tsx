import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { format } from "date-fns";
import useSWR from "swr";
import FontSizes from "../constants/fontsizes";
import { USER_ACCOUNT_API_ROUTE } from "../shared/lib/api/constants";
import fetcher from "../shared/lib/utils/fetcher";
import Bullet from "./MUI_Bullet";

interface CommentContentProps {
  authorId: string;
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
  const { data } = useSWR(USER_ACCOUNT_API_ROUTE(props.authorId), fetcher);
  const authorName = data?.user.username ?? "---";

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
