import {
  makeStyles,
  Theme,
  createStyles,
  Avatar,
  Box,
  Grid,
  Typography,
  IconButton,
  Divider,
} from "@material-ui/core";
import React, { useState } from "react";
import FontSizes from "../constants/fontsizes";
import Bullet from "./Bullet";
import { format } from "date-fns";
import TextField from "@material-ui/core/TextField";
import { Close, Reply, Send } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Comment from "../shared/lib/model/Comment";

interface CommentItemProps {
  comment: Comment;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: 20,
      height: 20,
    },
    avatarContainer: {
      width: 28,
    },
    avatarText: {
      fontSize: 14,
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
    name: {
      fontSize: FontSizes.caption,
      color: theme.palette.text.secondary,
    },
    commentText: {
      fontSize: FontSizes.subtitle,
    },
    repliesContainer: {
      marginTop: 12,
    },
    iconButton: {
      marginLeft: theme.spacing(1),
      "&:focus": {
        outline: "none !important",
      },
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
  const [toggleReply, setToggleReply] = useState(false);
  const { comment } = props;

  const authorAvatar = (name: string) => (
    <Grid item className={classes.avatarContainer} container justify="center">
      <Avatar className={classes.avatar}>
        <Typography className={classes.avatarText}>{name[0]}</Typography>
      </Avatar>
    </Grid>
  );

  const commentContent = (author: string, text: string, date: string) => (
    <>
      <Typography className={classes.name}>
        {author} {<Bullet />}
        {format(new Date(date), "MMM d, yyyy")}
      </Typography>
      <Typography className={classes.commentText}>{text}</Typography>
    </>
  );

  return (
    <Grid container>
      {authorAvatar(comment.author)}
      <Grid item className={classes.commentContainer}>
        <Box className={classes.comment}>
          <Grid container>
            <Grid item xs={12} container>
              <Grid item xs={12}>
                {commentContent(comment.author, comment.text, comment.date)}
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
                        inputProps={{
                          style: {
                            fontSize: FontSizes.comment,
                          },
                        }}
                        placeholder="Reply to this comment"
                      />
                    </Grid>
                    <Grid item>
                      <IconButton className={classes.iconButton}>
                        <Send fontSize="small" />
                      </IconButton>
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
                  {authorAvatar(reply.author)}
                  <Grid item className={classes.commentContainer}>
                    <Box className={classes.comment}>
                      {commentContent(reply.author, reply.text, reply.date)}
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

export default CommentItem;
