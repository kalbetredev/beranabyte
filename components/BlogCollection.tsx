import {
  Typography,
  Divider,
  Grid,
  makeStyles,
  createStyles,
  Theme,
  Grow,
} from "@material-ui/core";
import { ErrorTwoTone } from "@material-ui/icons";
import FontSizes from "../constants/fontsizes";
import Blog from "../shared/lib/models/Blog";
import { removeNonAlphaNumeric } from "../shared/lib/utils/text-transform";
import BlogSummary from "./BlogSummary";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: FontSizes.header,
      textTransform: "uppercase",
      fontWeight: 700,
    },
    emptyResult: {
      marginTop: 10,
    },
    errorIcon: {
      marginRight: 10,
      color: theme.palette.error.main,
    },
  })
);

interface BlogCollectionProps {
  title: string;
  blogs: Blog[];
  isSearching: boolean;
}

const BlogCollection = (props: BlogCollectionProps) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h1" className={classes.title} noWrap>
          {removeNonAlphaNumeric(props.title ?? props.blogs[0].category)}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>

      {props.isSearching && props.blogs.length === 0 ? (
        <Grid
          item
          container
          justify="flex-start"
          alignItems="center"
          className={classes.emptyResult}
        >
          <ErrorTwoTone color="secondary" className={classes.errorIcon} />
          <Typography color="textSecondary" variant="caption">
            No Blog found that matches your search
          </Typography>
        </Grid>
      ) : null}

      {props.blogs.map((blog, index) => (
        <Grow in timeout={400 * index} key={index}>
          <Grid item key={index} xs={12}>
            <BlogSummary blog={blog} />
          </Grid>
        </Grow>
      ))}
    </Grid>
  );
};

export default BlogCollection;
