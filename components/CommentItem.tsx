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
import { Close, Reply, Send } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Comment from "../shared/lib/model/Comment";
import { withAuthDialog } from "./Authentication";
import useAuth from "../shared/lib/utils/useAuth";
import CircularProgress from "@material-ui/core/CircularProgress";
import CommentContent from "./CommentContent";
import UserAvatar from "./UserAvatar";

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

  const auth = useAuth();
  const [toggleReply, setToggleReply] = useState(false);
  const { comment } = props;

  const onSendComment = async () => {
    if (!auth.user) props.openAuthDialog();
    else if (inputRef.current.value != "") {
      setSending(true);
      const idToken = await auth.getUserIdToken();
      if (idToken) {
        const blogId = props.comment.blogId;
        const commentId = props.comment.commentId;
        fetch(`/api/blogs-meta/${blogId}/comments/${commentId}`, {
          body: JSON.stringify({
            reply: inputRef.current.value,
            idToken: idToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        })
          .then(() => {
            props.mutate();
            setSending(false);
          })
          .catch(() => {
            alert({
              severity: "error",
              message: "Failed to verify your authentication. Please Try Again",
              duration: 3000,
            });
            setSending(false);
          });
      } else {
        alert({
          severity: "error",
          message: "Failed to verify your authentication. Please Try Again",
          duration: 3000,
        });
        setSending(false);
      }
      inputRef.current.value = "";
    }
  };

  return (
    <Grid container>
      <Grid item className={classes.avatarContainer} container justify="center">
        <UserAvatar userUid={comment.author} />
      </Grid>
      <Grid item className={classes.commentContainer}>
        <Box className={classes.comment}>
          <Grid container>
            <Grid item xs={12} container>
              <Grid item xs={12}>
                <CommentContent
                  author={comment.author}
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
                    startIcon={<Reply />}
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

            {comment.replies && comment.replies.length > 0 ? (
              <Grid item xs={12}>
                <Divider style={{ marginTop: 7 }} />
              </Grid>
            ) : null}
          </Grid>

          {comment.replies && comment.replies.length > 0 ? (
            <Grid container className={classes.repliesContainer} spacing={1}>
              {comment.replies.map((reply, index) => (
                <Grid key={index} item container>
                  <Grid
                    item
                    className={classes.avatarContainer}
                    container
                    justify="center"
                  >
                    <UserAvatar userUid={reply.author} />
                  </Grid>
                  <Grid item className={classes.commentContainer}>
                    <Box className={classes.comment}>
                      <CommentContent
                        author={reply.author}
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
