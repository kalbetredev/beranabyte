import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import FontSizes from "../constants/fontsizes";
import { PageGroup } from "../shared/lib/model/PageGroup";
import Page from "../shared/lib/model/Page";

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
    },
    link: {
      cursor: "pointer",
      fontSize: FontSizes.footerLink,
      textDecoration: "none",
      color: theme.palette.text.secondary,
      "&:hover": {
        textDecoration: "none",
        fontWeight: "bold",
        color: theme.palette.primary.main,
      },
    },
  })
);

interface LinkGroupProps {
  pageGroup: PageGroup;
  showOutline?: boolean;
}

const LinkGroup = (props: LinkGroupProps) => {
  const classes = useStyles();
  const showOutline = props.showOutline ?? false;

  return (
    <Box className={showOutline ? classes.rootOutlined : classes.root}>
      <Typography component="h2" gutterBottom className={classes.groupHeader}>
        {props.pageGroup.headerLabel}
      </Typography>
      {props.pageGroup.children.length > 0 ? (
        <ul className={classes.ul}>
          {props.pageGroup.children.map((page: Page, index) => (
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
