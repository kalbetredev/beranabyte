import {
  Box,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import Blog from "../shared/lib/models/Blog";
import useAlert from "../shared/lib/utils/useAlert";
import { createBlog } from "../shared/lib/api/beranabtyeApi";

interface BlogEditorProps {
  onCreateCallback: (blog: Blog) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& textArea": {
        height: 500,
      },
      "& pre": {
        overflow: "scroll",
      },
    },
    title: {
      marginBottom: theme.spacing(3),
    },
    category: {
      marginBottom: theme.spacing(3),
    },
    saveButton: {
      marginRight: theme.spacing(1),
      width: 120,
    },
    closeButton: {
      width: 120,
    },
  })
);

const CreateBlog = (props: BlogEditorProps) => {
  const classes = useStyles();
  const alert = useAlert();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const onCreate = async () => {
    const blog = await createBlog(title, category);
    if (blog) {
      props.onCreateCallback(blog);
      alert({
        severity: "success",
        message: "Blog Created Successfully.",
        duration: 2000,
      });
    } else {
      alert({
        severity: "error",
        message: "Failed to Create Your blog",
        duration: 2000,
      });
    }
  };

  return (
    <Box className={classes.root}>
      <Box p={1} display="flex" justifyContent="flex-end">
        <Button
          className={classes.closeButton}
          variant="outlined"
          color="primary"
          size="small"
          disableElevation
          onClick={onCreate}
        >
          Create
        </Button>
      </Box>
      <Box>
        <TextField
          className={classes.title}
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          className={classes.category}
          fullWidth
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default CreateBlog;
