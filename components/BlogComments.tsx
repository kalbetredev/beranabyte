import classes from "*.module.css";
import {
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
import React from "react";
import useSWR from "swr";
import FontSizes from "../constants/fontsizes";
import fetcher from "../shared/lib/utils/fetcher";
import CommentItem from "./CommentItem";

interface BlogCommentsProps {
  blogId: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButton: {
      marginLeft: theme.spacing(1),
      "&:focus": {
        outline: "none !important",
      },
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
  const { data } = useSWR([`/api/blogs-meta/${props.blogId}`], fetcher);
  const comments = data?.comments ?? [];

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
              <CommentItem comment={comment} />
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
                inputProps={{
                  style: {
                    fontSize: FontSizes.comment,
                  },
                }}
                placeholder="Write Your Comment"
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
    </Grid>
  );
};

export default BlogComments;