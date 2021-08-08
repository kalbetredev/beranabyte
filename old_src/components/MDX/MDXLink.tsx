import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { InsertLink } from "@material-ui/icons";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: "underline",
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
    linkIcon: {
      display: "none",
      "&:hover": {
        display: "inline-block",
      },
    },
  })
);

const MDXLink = (props: any) => {
  const classes = useStyles();
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <>
        <Link href={href}>
          <a className={classes.link} {...props} />
        </Link>
        <InsertLink className={classes.linkIcon} />
      </>
    );
  }

  return (
    <a
      className={classes.link}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
};

export default MDXLink;
