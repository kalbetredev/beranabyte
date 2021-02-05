import { Button, Typography, Box, Grid, ButtonProps } from "@material-ui/core";
import Page from "../shared/lib/model/Page";
import Link from "next/link";
import FontSizes from "../constants/fontsizes";
import { useRouter } from "next/router";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import SubMenuContainer from "../menu/SubMenuContainer";

interface NavButtonProps {
  pages: Page[];
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    activeText: {
      fontSize: FontSizes.navigationButton,
      fontWeight: "bold",
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
    inActiveText: {
      fontSize: FontSizes.navigationButton,
    },
    link: {
      "&:hover": {
        color: theme.palette.primary.main,
      },
      "&:focus": {
        outline: "none !important",
      },
    },
    submenu: {
      margin: 10,
    },
  })
);

const NavButton: React.FC<NavButtonProps> = (props: NavButtonProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const linkButtonProps: ButtonProps = {
    disableTouchRipple: true,
    disableElevation: true,
    disableFocusRipple: true,
    disableRipple: true,
    size: "small",
    variant: "text",
    className: classes.link,
  };

  return (
    <>
      {props.pages.length > 1 ? (
        <Box onMouseLeave={handleClose} style={{ position: "relative" }}>
          <Button
            {...linkButtonProps}
            onMouseEnter={handleOpen}
            onClick={handleOpen}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
          >
            <Typography
              className={
                router.pathname
                  .toLowerCase()
                  .includes(props.pages[0].category.toLowerCase())
                  ? classes.activeText
                  : classes.inActiveText
              }
            >
              {props.children}
            </Typography>
          </Button>

          <div
            style={{
              height: 20,
              width: "100%",
              position: "absolute",
            }}
          />

          <SubMenuContainer open={open} anchorRef={anchorRef}>
            <Box className={classes.submenu}>
              <Grid container>
                {props.pages.map((page, index) => (
                  <Grid key={index} item xs={props.pages.length > 5 ? 6 : 12}>
                    <Link key={index} href={page.href} passHref>
                      <Button
                        {...linkButtonProps}
                        startIcon={page.icon}
                        onClick={handleClose}
                        style={{
                          justifyContent: "flex-start",
                          textTransform: "capitalize",
                          margin: 3,
                        }}
                      >
                        <Typography
                          align="left"
                          className={classes.inActiveText}
                          noWrap
                        >
                          {page.label}
                        </Typography>
                      </Button>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </SubMenuContainer>
        </Box>
      ) : (
        <Link href={props.pages.length > 1 ? "" : props.pages[0].href} passHref>
          <Button {...linkButtonProps}>
            <Typography
              className={
                router.pathname.toLowerCase() ===
                props.pages[0].href.toLowerCase()
                  ? classes.activeText
                  : classes.inActiveText
              }
            >
              {props.children}
            </Typography>
          </Button>
        </Link>
      )}
    </>
  );
};

export default NavButton;
