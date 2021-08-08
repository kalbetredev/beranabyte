import { Box, Paper, Popper, Zoom } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { RefObject, useEffect, useRef, useState } from "react";

interface SubMenuContainerProps {
  open: boolean;
  anchorRef: React.RefObject<HTMLButtonElement>;
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: 400,
      overflow: "auto",
      borderTop: `2px solid ${theme.palette.primary.main}`,
    },
    popper: {
      marginTop: 20,
      zIndex: 1,
      '&[x-placement*="bottom"] $arrow': {
        top: 0,
        left: 0,
        marginTop: "-0.9em",
        width: "3em",
        height: "1em",
        "&::before": {
          borderWidth: "0 1em 1em 1em",
          borderColor: `transparent transparent ${theme.palette.primary.main} transparent`,
        },
      },
      '&[x-placement*="top"] $arrow': {
        bottom: 0,
        left: 0,
        marginBottom: "-0.9em",
        width: "3em",
        height: "1em",
        "&::before": {
          borderWidth: "1em 1em 0 1em",
          borderColor: `${theme.palette.primary.main} transparent transparent transparent`,
        },
      },
      '&[x-placement*="right"] $arrow': {
        left: 0,
        marginLeft: "-0.9em",
        height: "3em",
        width: "1em",
        "&::before": {
          borderWidth: "1em 1em 1em 0",
          borderColor: `transparent ${theme.palette.primary.main} transparent transparent`,
        },
      },
      '&[x-placement*="left"] $arrow': {
        right: 0,
        marginRight: "-0.9em",
        height: "3em",
        width: "1em",
        "&::before": {
          borderWidth: "1em 0 1em 1em",
          borderColor: `transparent transparent transparent ${theme.palette.primary.main}`,
        },
      },
    },
    arrow: {
      position: "absolute",
      fontSize: 7,
      width: "3em",
      height: "3em",
      "&::before": {
        content: '""',
        margin: "auto",
        display: "block",
        width: 0,
        height: 0,
        borderStyle: "solid",
      },
    },
  })
);

const SubMenuContainer: React.FC<SubMenuContainerProps> = (
  props: SubMenuContainerProps
) => {
  const classes = useStyles();
  const [arrowRef, setArrowRef] = useState(null);

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(props.open);
  useEffect(() => {
    if (prevOpen.current === true && props.open === false) {
      props.anchorRef.current!.focus();
    }

    prevOpen.current = props.open;
  }, [open]);

  return (
    <Popper
      open={props.open}
      anchorEl={props.anchorRef.current}
      className={classes.popper}
      modifiers={{
        arrow: {
          enabled: true,
          element: arrowRef,
        },
      }}
      transition
    >
      {({ TransitionProps, placement }) => (
        <>
          <Zoom
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
            timeout={400}
          >
            <Box>
              <span className={classes.arrow} ref={setArrowRef} />
              <Paper className={classes.paper} elevation={5}>
                {props.children}
              </Paper>
            </Box>
          </Zoom>
        </>
      )}
    </Popper>
  );
};

export default SubMenuContainer;
