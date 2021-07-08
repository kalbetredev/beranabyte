import {
  Box,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Button,
  IconButton,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import React, { useRef, useState } from "react";
import Yamde from "yamde";
import { AddPhotoAlternate, RemoveCircle } from "@material-ui/icons";
import useSWR from "swr";
import fetcher from "../shared/lib/utils/fetcher";
import { BLOG_IMAGES, BLOG_IMAGE_URL } from "../shared/lib/api/constants";
import Blog from "../shared/lib/models/Blog";
import useAlert from "../shared/lib/utils/useAlert";
import {
  deleteImage,
  saveBlog,
  uploadImage,
} from "../shared/lib/api/beranabtyeApi";

interface BlogEditorProps {
  blog: Blog;
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
    singleLineTextInput: {
      marginBottom: theme.spacing(3),
    },
    summary: {
      marginBottom: theme.spacing(3),
    },
    saveButton: {
      marginRight: theme.spacing(1),
      width: 120,
    },
    closeButton: {
      width: 120,
    },
    fileInput: {
      display: "none",
    },
    uploadImageButton: {
      backgroundColor:
        theme.palette.type === "dark"
          ? "rgb(255,255,255, 0.03)"
          : "rgb(255,255,255, 1)",
      "&:focus": {
        outline: "none !important",
      },
      "&:hover": {
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
    imagesCard: {
      border: `1px solid ${
        theme.palette.type === "dark"
          ? "rgb(255,255,255, 0.2)"
          : "rgb(0,0,0, 0.2)"
      } `,
      borderRadius: 5,
      height: 140,
      width: 140,
      overflow: "hidden",
      position: "relative",
    },
    imagePreview: {
      height: 140,
      width: 140,
      objectFit: "cover",
    },
    deleteButton: {
      position: "absolute",
      left: 0,
      top: 0,
    },
    iconButtonWrapper: {
      position: "relative",
    },
    progress: {
      position: "absolute",
      zIndex: 1,
      top: 0,
      left: 0,
    },
    deleteProgress: {
      position: "absolute",
      zIndex: 1,
      top: 0,
      left: 0,
      color: theme.palette.error.main,
    },
  })
);

const BlogEditor = (props: BlogEditorProps) => {
  const { blog } = props;
  const classes = useStyles();
  const theme = useTheme();
  const alert = useAlert();
  const formRef = useRef(null);
  const [title, setTitle] = useState(blog.title);
  const [category, setCategory] = useState(blog.category);
  const [bannerImg, setBannerImg] = useState(blog.imageUrl);
  const [summary, setSummary] = useState(blog.summary);
  const [mdx, setMdx] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [fileOnDeletion, setFileOnDeletion] = useState("");

  const { data, mutate } = useSWR(BLOG_IMAGES(blog._id), fetcher);
  const imageFileNames: string[] = data?.images ?? [];

  const onSave = async () => {
    blog.title = title;
    blog.category = category;
    blog.imageUrl = bannerImg;
    blog.summary = summary;
    blog.mdx = mdx;
    const response = await saveBlog(blog);
    if (response) {
      alert({
        severity: "success",
        message: "Blog Saved Successfully.",
        duration: 2000,
      });
    } else {
      alert({
        severity: "error",
        message: "Failed to Save Your blog",
        duration: 2000,
      });
    }
  };

  const onClose = () => {};

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      formRef.current.reset();
      setIsUploading(true);
      const blogImage = await uploadImage(file, blog._id);
      mutate();
      setIsUploading(false);
      if (blogImage) {
        alert({
          severity: "success",
          message: "Image Uploaded Successfully.",
          duration: 2000,
        });
      } else {
        alert({
          severity: "error",
          message: "Failed to Upload Image",
          duration: 2000,
        });
      }
    }
  };

  const handleFileDelete = (fileName: string) => {
    return async (event) => {
      setFileOnDeletion(fileName);
      const success = await deleteImage(fileName, blog._id);
      mutate();
      setFileOnDeletion("");
      if (success) {
        alert({
          severity: "success",
          message: "Image Deleted Successfully.",
          duration: 2000,
        });
      } else {
        alert({
          severity: "error",
          message: "Failed to Delete Image",
          duration: 2000,
        });
      }
    };
  };

  return (
    <Box className={classes.root}>
      <Box p={1} display="flex" justifyContent="flex-end">
        <Button
          className={classes.saveButton}
          variant="outlined"
          size="small"
          disableElevation
          onClick={onSave}
        >
          Save
        </Button>
        <Button
          className={classes.closeButton}
          variant="outlined"
          size="small"
          disableElevation
          onClick={onClose}
        >
          Close
        </Button>
      </Box>
      <Box>
        <TextField
          className={classes.singleLineTextInput}
          id="blog_title"
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          className={classes.singleLineTextInput}
          fullWidth
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          className={classes.singleLineTextInput}
          fullWidth
          label="Banner"
          value={bannerImg}
          onChange={(e) => setBannerImg(e.target.value)}
        />
        <TextField
          className={classes.summary}
          id="blog_summary"
          size="medium"
          fullWidth
          multiline
          rowsMax={4}
          label="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <Grid container spacing={1}>
          {imageFileNames.map((fileName, index) => (
            <Grid item key={index}>
              <Box className={classes.imagesCard}>
                <Box className={classes.deleteButton}>
                  <div className={classes.iconButtonWrapper}>
                    <IconButton
                      className={classes.deleteButton}
                      onClick={handleFileDelete(fileName)}
                      disabled={fileOnDeletion !== ""}
                    >
                      <RemoveCircle
                        color={fileOnDeletion !== "" ? "secondary" : "error"}
                      />
                    </IconButton>
                    {fileOnDeletion === fileName && (
                      <CircularProgress
                        size={48}
                        className={classes.deleteProgress}
                      />
                    )}
                  </div>
                </Box>
                <img
                  className={classes.imagePreview}
                  src={BLOG_IMAGE_URL(blog._id, fileName)}
                />
              </Box>
            </Grid>
          ))}

          <Grid item>
            <Box
              className={classes.imagesCard}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <form ref={formRef}>
                <input
                  type="file"
                  id="image_upload_btn"
                  className={classes.fileInput}
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
                <label htmlFor="image_upload_btn">
                  <div className={classes.iconButtonWrapper}>
                    <IconButton
                      component="span"
                      className={classes.uploadImageButton}
                      disabled={isUploading}
                    >
                      <AddPhotoAlternate />
                    </IconButton>
                    {isUploading && (
                      <CircularProgress
                        size={48}
                        className={classes.progress}
                      />
                    )}
                  </div>
                </label>
              </form>
            </Box>
          </Grid>
        </Grid>
        <Yamde value={mdx} handler={setMdx} theme={theme.palette.type} />
      </Box>
    </Box>
  );
};

export default BlogEditor;
