import {
  Card,
  CardContent,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Link from "next/link";
import Bullet from "./Bullet";
import { format } from "date-fns";
import numberFormat from "number-format.js";
import useSWR from "swr";
import FrontMatter from "../shared/lib/types/FrontMatter";
import FontSizes from "../constants/fontsizes";
import fetcher from "../shared/lib/utils/fetcher";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:last-child": {
        paddingBottom: 0,
      },
      background: theme.palette.background.default,
    },
    description: {
      fontSize: FontSizes.subtitle,
      color: theme.palette.text.secondary,
    },
    title: {
      display: "block",
      fontSize: FontSizes.header,
      lineHeight: FontSizes.header,
      color: theme.palette.text.primary,
      cursor: "pointer",
      "&:hover": {
        textDecoration: "none",
        color: theme.palette.primary.main,
      },
    },
    subheader: {
      fontSize: FontSizes.caption,
      color: theme.palette.text.secondary,
      paddingBottom: 5,
    },
  })
);

const contentStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(0),
      "&:last-child": {
        paddingBottom: 15,
      },
    },
  })
);

interface BlogSummaryCardProps {
  blogFrontMatter: FrontMatter;
}

const BlogSummary = (props: BlogSummaryCardProps) => {
  const { data } = useSWR(`/api/views/${props.blogFrontMatter.uuid}`, fetcher);
  const views = data?.total;
  const viewsMessage = views
    ? `${numberFormat("#,###.", views)} views`
    : "Just Published";

  const classes = useStyles();
  const contentClasses = contentStyles();

  return (
    <Card elevation={0} className={classes.root}>
      <CardContent classes={contentClasses}>
        <Link
          href={`/blog/${props.blogFrontMatter.category}/${props.blogFrontMatter.slug}`}
        >
          <Typography className={classes.title} component="a">
            {props.blogFrontMatter.title}
          </Typography>
        </Link>

        <Typography className={classes.subheader}>
          {format(new Date(props.blogFrontMatter.publishedAt), "MMM d, yyyy")}
          {<Bullet />} {viewsMessage}
        </Typography>

        <Typography className={classes.description}>
          {props.blogFrontMatter.summary}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogSummary;
