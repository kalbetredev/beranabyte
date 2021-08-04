import { useState, useEffect } from "react";
import { createStyles, Theme } from "@material-ui/core/styles";
import { makeStyles, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FontSizes from "../constants/fontsizes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootUl: {
      listStyleType: "none",
      margin: 0,
      padding: 0,
      "& ul": {
        padding: "0",
        listStyleType: "none",
        margin: 0,
        "& div": {
          paddingLeft: "20px",
        },
      },
      "& li": {
        margin: 0,
        padding: 0,
        lineHeight: 1.5,
        "&:hover": {
          cursor: "pointer",
        },
        "& div": {
          margin: 0,
          padding: "4px 0px 4px 5px",
          fontSize: "0.7em",
        },
      },
    },
    inactive: {
      color: theme.palette.text.secondary,
      borderLeft: "3px solid transparent",
      "&:hover": {
        borderLeft: "3px solid grey",
        color: theme.palette.text.primary,
      },
    },
    active: {
      color: theme.palette.text.primary,
      borderLeft: "3px solid teal",
    },
    root: {
      listStyleType: "none",
      margin: 0,
      padding: 0,
    },
    title: {
      fontSize: FontSizes.header,
      paddingLeft: 7,
    },
    toc: {
      width: "175px",
      top: "70px",
      height: "calc(100vh - 70px)",
      position: "sticky",
      overflowY: "auto",
      padding: "16px 16px 16px 0px",
      flexShrink: 0,
    },
  })
);

interface TOCProps {
  headers: HeaderLevelIdPair[];
}

const TwoLevelTableOfContent = (props: TOCProps) => {
  const classes = useStyles();
  const contents = buildTwoLevelTOCFromHeaders(props.headers);
  const headerIds = getHeaderIds(contents);
  const [activeId, setActiveId] = useState(headerIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    headerIds.map((id) => {
      const element = document.getElementById(`${id}`);
      if (element) observer.observe(element);
    });

    return () => {
      headerIds.map((id) => {
        const element = document.getElementById(`${id}`);
        if (element) observer.unobserve(element);
      });
    };
  }, [headerIds]);

  const handleClick = (id: string) => () => {
    const anchor = document.querySelector(`#${id}`);

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box component="nav" className={classes.toc}>
      <Typography className={classes.title}>Contents</Typography>
      <Typography component="ul" className={classes.rootUl}>
        {contents.map((mainLevel, index) => (
          <li key={index}>
            <div
              onClick={handleClick(mainLevel.id)}
              className={
                mainLevel.id == activeId ? classes.active : classes.inactive
              }
            >
              {mainLevel.label}
            </div>
            {mainLevel.children.length > 0 ? (
              <ul>
                {mainLevel.children.map((subLevel, index) => (
                  <li key={index}>
                    <div
                      onClick={handleClick(subLevel.id)}
                      className={
                        subLevel.id == activeId
                          ? classes.active
                          : classes.inactive
                      }
                    >
                      {subLevel.label}
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </Typography>
    </Box>
  );
};

interface TableOfContentItem {
  label: string;
  id: string;
  children: TableOfContentItem[];
}

function buildTwoLevelTOCFromHeaders(
  headers: HeaderLevelIdPair[]
): TableOfContentItem[] {
  const toc: TableOfContentItem[] = [];
  for (let i = 0; i < headers.length; i++) {
    if (headers[i].level === 2) {
      toc.push({
        label: headers[i].label,
        id: headers[i].id,
        children: [],
      });
    } else if (headers[i].level === 3) {
      if (!toc[toc.length - 1]) {
        throw new Error(`Missing parent level for: ${headers[i].id}`);
      }

      toc[toc.length - 1].children.push({
        label: headers[i].label,
        id: headers[i].id,
        children: [],
      });
    }
  }

  return toc;
}

function getHeaderIds(contents: TableOfContentItem[]): string[] {
  const headerIds: string[] = [];
  contents.forEach((tocItem) => {
    headerIds.push(tocItem.id);
    tocItem.children.forEach((tocSubItem) => {
      headerIds.push(tocSubItem.id);
    });
  });

  return headerIds;
}

export interface HeaderLevelIdPair {
  level: number;
  id: string;
  label: string;
}

export default TwoLevelTableOfContent;
