import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import FontSizes from "../constants/fontsizes";
import { PageGroup } from "../shared/lib/models/PageGroup";
import Page from "../shared/lib/models/Page";
import SingleLineLoading from "./LoadingPlaceholders/SingleLineLoading";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    rootOutlined: {
      borderLeft: `1.5px solid ${theme.palette.secondary.main}`,
      paddingLeft: 15,
      borderRadius: 9,
    },
    ul: {
      marginBottom: 32,
      listStyle: "none",
      margin: 0,
      padding: 0,
      "& li": {
        padding: "5px 0",
      },
    },
    groupHeader: {
      fontSize: FontSizes.footerGroupHeader,
      fontWeight: 700,
    },
    link: {
      cursor: "pointer",
      fontSize: FontSizes.footerLink,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "none",
        color: theme.palette.primary.main,
      },
    },
  })
);

interface LinkGroupProps {
  pageGroup: PageGroup;
  showOutline?: boolean;
  placeHolderCount?: number;
}

const LinkGroup = (props: LinkGroupProps) => {
  const classes = useStyles();
  const showOutline = props.showOutline ?? false;

  const getPlaceholders = () => {
    const count = props.placeHolderCount ?? 3;
    const placeHolders = [];
    for (let i = 0; i < count; i++) {
      placeHolders.push(
        <li>
          <SingleLineLoading />
        </li>
      );
    }

    return placeHolders;
  };

  return (
    <Box className={showOutline ? classes.rootOutlined : classes.root}>
      <Typography component="h2" gutterBottom className={classes.groupHeader}>
        {props.pageGroup.headerLabel}
      </Typography>
      {props.pageGroup.children.length > 0 ? (
        <ul className={classes.ul}>
          {props.pageGroup.children.length != 0
            ? getPlaceholders()
            : props.pageGroup.children.map((page: Page, index) => (
                <li key={index}>
                  {page.href &&
                  (page.href.startsWith("/") || page.href.startsWith("#")) ? (
                    <Link href={page.href}>
                      <Typography component="a" className={classes.link}>
                        {page.label}
                      </Typography>
                    </Link>
                  ) : (
                    <a
                      className={classes.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={page.href}
                    >
                      {page.label}
                    </a>
                  )}
                </li>
              ))}
        </ul>
      ) : null}
    </Box>
  );
};

export default LinkGroup;
