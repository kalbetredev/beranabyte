import React, { useRef, useState } from "react";
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
import { Cancel, Close } from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";

interface SearchInputProps {
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSearchCleared: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: "100%",
      backgroundColor: theme.palette.background.default,
      marginTop: 10,
    },
    input: {
      marginLeft: theme.spacing(1),
      fontSize: FontSizes.searchInput,
      flex: 1,
    },
    iconButton: {
      padding: 2,
      "&:focus": {
        outline: "none !important",
      },
    },
    clearBtn: {
      width: 6,
      height: 6,
      color: theme.palette.secondary.main,
    },
  })
);

const SearchInput = (props: SearchInputProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const [focus, setFocus] = useState(false);
  const inputRef = useRef(null);
  const [showClearSearch, setShowClearSearch] = useState(false);

  const handleClearInput = () => {
    inputRef.current.value = "";
    inputRef.current.focus();
    setShowClearSearch(false);
    props.onSearchCleared();
  };

  const borderColor = focus
    ? theme.palette.primary.main
    : theme.palette.secondary.main;

  return (
    <Paper
      className={classes.root}
      elevation={focus ? 1 : 0}
      style={{ border: `1px solid ${borderColor}` }}
    >
      <SearchIcon fontSize="small" />
      <InputBase
        className={classes.input}
        placeholder="Search blogs"
        inputProps={{ "aria-label": "search blogs" }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        inputRef={inputRef}
        onChange={(e) => {
          if (e.target.value.length > 0) setShowClearSearch(true);
          else setShowClearSearch(false);
          props.onChange(e);
        }}
      />
      {showClearSearch ? (
        <IconButton
          size="medium"
          className={classes.clearBtn}
          onClick={handleClearInput}
        >
          <Cancel fontSize="small" />
        </IconButton>
      ) : (
        <span />
      )}
    </Paper>
  );
};

export default SearchInput;
