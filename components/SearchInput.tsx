import React, { useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FontSizes from "../constants/fontsizes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: "100%",
      backgroundColor: theme.palette.background.default,
    },
    input: {
      marginLeft: theme.spacing(1),
      fontSize: FontSizes.paragraph,
      flex: 1,
    },
    iconButton: {
      padding: 2,
      "&:focus": {
        outline: "none !important",
      },
    },
  })
);

const onSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  console.log("Submit");
};

const SearchInput = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [focus, setFocus] = useState(false);

  const borderColor = focus
    ? theme.palette.primary.main
    : theme.palette.secondary.main;

  return (
    <Paper
      component="form"
      className={classes.root}
      elevation={focus ? 1 : 0}
      style={{ border: `1px solid ${borderColor}` }}
    >
      <InputBase
        className={classes.input}
        placeholder="Search blogs"
        inputProps={{ "aria-label": "search blogs" }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onSubmit={onSubmit}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={onSubmit}
      >
        <SearchIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
