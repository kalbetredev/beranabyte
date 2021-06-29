import {
  CircularProgress,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Send } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import FontSizes from "../constants/fontsizes";
import { sendComment } from "../shared/lib/api/beranabtyeApi";
import { COMMENTS_API_ROUTE } from "../shared/lib/api/constants";
import fetcher from "../shared/lib/utils/fetcher";
import useAlert from "../shared/lib/utils/useAlert";
import useAuth, { AuthProvider } from "../shared/lib/utils/useAuth";
import { withAuthDialog } from "./Authentication";
import CommentItem from "./CommentItem";

interface BlogCommentsProps {
  blogId: string;
  openAuthDialog?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButtonWrapper: {
      marginLeft: theme.spacing(1),
      position: "relative",
    },
    iconButton: {
      "&:focus": {
        outline: "none !important",
      },
    },
    progress: {
      position: "absolute",
      zIndex: 1,
      top: 0,
      left: 0,
    },
    title: {
      marginTop: 24,
      fontSize: FontSizes.header,
      textTransform: "uppercase",
    },
  })
);

const BlogComments = (props: BlogCommentsProps) => {
  const classes = useStyles();
  const auth: AuthProvider = useAuth();
  const alert = useAlert();
  const inputRef = useRef(null);
  const [sending, setSending] = useState(false);

  const { data, mutate } = useSWR(COMMENTS_API_ROUTE(props.blogId), fetcher);

  const comments = data?.comments ?? [];

  const onSendComment = async (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (!auth.user) props.openAuthDialog();
    else if (inputRef.current.value != "") {
      setSending(true);
      sendComment(props.blogId, inputRef.current.value)
        .then(() => {
          mutate();
          setSending(false);
          inputRef.current.value = "";
        })
        .catch(() => {
          alert({
            severity: "error",
            message: "Error Occurred Sending Your Comment. Please Try Again",
            duration: 3000,
          });
          setSending(false);
        });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography className={classes.title}>COMMENTS</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      {comments.length > 0
        ? comments.map((comment, index) => (
            <Grid item xs={12} key={index}>
              <CommentItem comment={comment} mutate={mutate} />
            </Grid>
          ))
        : null}
      <Grid item xs={12}>
        <form noValidate autoComplete="off">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-end"
          >
            <Grid item xs>
              <TextField
                multiline
                variant="outlined"
                fullWidth
                margin="dense"
                inputRef={inputRef}
                inputProps={{
                  style: {
                    fontSize: FontSizes.comment,
                  },
                }}
                placeholder="Write Your Comment"
                disabled={sending}
              />
            </Grid>
            <Grid item>
              <div className={classes.iconButtonWrapper}>
                <IconButton
                  className={classes.iconButton}
                  onClick={onSendComment}
                  disabled={sending}
                >
                  <Send fontSize="small" />
                </IconButton>
                {sending && (
                  <CircularProgress size={44} className={classes.progress} />
                )}
              </div>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default withAuthDialog(BlogComments);
