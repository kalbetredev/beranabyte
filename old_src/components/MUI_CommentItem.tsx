import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Grid,
  IconButton,
  Divider,
} from "@material-ui/core";
import React, { useState, useRef } from "react";
import FontSizes from "../constants/fontsizes";
import TextField from "@material-ui/core/TextField";
import { Close, Reply as ReplyIcon, Send } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Comment from "../shared/lib/models/Comment";
import { withAuthDialog } from "./MUI_Authentication";
import useAuth, { AuthProvider } from "../src/common/hooks/useAuth";
import CircularProgress from "@material-ui/core/CircularProgress";
import CommentContent from "./MUI_CommentContent";
import UserAvatar from "./MUI_UserAvatar";
import fetcher from "../shared/lib/utils/fetcher";
import { REPLIES_API_ROUTE } from "../shared/lib/api/constants";
import useSWR from "swr";
import { sendReply } from "../../src/api/beranabtyeApi";
import Reply from "../shared/lib/models/Reply";

interface CommentItemProps {
  comment: Comment;
  mutate: () => Promise<any>;
  openAuthDialog?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatarContainer: {
      width: 28,
    },
    commentContainer: {
      width: "calc(100% - 32px)",
      paddingLeft: 5,
    },
    comment: {
      borderLeft: `1.5px solid ${theme.palette.secondary.main}`,
      borderRadius: 5,
      paddingLeft: 10,
    },
    repliesContainer: {
      marginTop: 12,
    },
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
    replyButton: {
      padding: "0 5px",
      margin: 0,
      marginTop: 5,
      fontSize: FontSizes.subtitle,
      textTransform: "capitalize",
    },
  })
);

const CommentItem = (props: CommentItemProps) => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const [sending, setSending] = useState(false);

  const auth: AuthProvider = useAuth();
  const [toggleReply, setToggleReply] = useState(false);
  const { comment } = props;

  const { data, mutate } = useSWR(
    REPLIES_API_ROUTE(props.comment._id),
    fetcher
  );
  const replies: Reply[] = data?.replies ?? [];

  const onSendComment = async () => {
    if (!auth.user) props.openAuthDialog();
    else if (inputRef.current.value != "") {
      setSending(true);
      sendReply(props.comment._id, inputRef.current.value)
        .then(() => {
          mutate();
          setSending(false);
          inputRef.current.value = "";
        })
        .catch(() => {
          alert({
            severity: "error",
            message: "Error Occurred Sending Your Reply. Please Try Again",
            duration: 3000,
          });
          setSending(false);
        });
    }
  };

  return (
    <Grid container>
      <Grid item className={classes.avatarContainer} container justify="center">
        <UserAvatar userUid={comment.authorId} />
      </Grid>
      <Grid item className={classes.commentContainer}>
        <Box className={classes.comment}>
          <Grid container>
            <Grid item xs={12} container>
              <Grid item xs={12}>
                <CommentContent
                  authorId={comment.authorId}
                  text={comment.text}
                  date={comment.date}
                />
              </Grid>
              <Grid item xs={12}>
                {toggleReply ? (
                  <Button
                    startIcon={<Close />}
                    className={classes.replyButton}
                    onClick={() => setToggleReply(!toggleReply)}
                    size="small"
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    startIcon={<ReplyIcon />}
                    className={classes.replyButton}
                    onClick={() => setToggleReply(!toggleReply)}
                    size="small"
                    variant="outlined"
                  >
                    Reply
                  </Button>
                )}
              </Grid>
            </Grid>
            {toggleReply ? (
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
                        placeholder="Reply to this comment"
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
                          <CircularProgress
                            size={44}
                            className={classes.progress}
                          />
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            ) : null}

            {replies && replies.length > 0 ? (
              <Grid item xs={12}>
                <Divider style={{ marginTop: 7 }} />
              </Grid>
            ) : null}
          </Grid>

          {replies && replies.length > 0 ? (
            <Grid container className={classes.repliesContainer} spacing={1}>
              {replies.map((reply: Reply, index) => (
                <Grid key={index} item container>
                  <Grid
                    item
                    className={classes.avatarContainer}
                    container
                    justify="center"
                  >
                    <UserAvatar userUid={reply.authorId} />
                  </Grid>
                  <Grid item className={classes.commentContainer}>
                    <Box className={classes.comment}>
                      <CommentContent
                        authorId={reply.authorId}
                        text={reply.text}
                        date={reply.date}
                      />
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          ) : null}
        </Box>
      </Grid>
    </Grid>
  );
};

export default withAuthDialog(CommentItem);
