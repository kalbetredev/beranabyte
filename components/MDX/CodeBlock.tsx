import React from "react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/vsDark";
import lightTheme from "prism-react-renderer/themes/github";

import {
  createStyles,
  Divider,
  makeStyles,
  Theme,
  Typography,
  useTheme,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {
  DarkCodeBackground,
  LightCodeBackground,
  DarkCodeHeader,
  LightCodeHeader,
} from "../../constants/colors";
import Box from "@material-ui/core/Box";
import FontSizes from "../../constants/fontsizes";
import { ThemeType } from "../../shared/theme/theme-type";

interface Props {
  themeType: ThemeType;
  children: string;
  className: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 5,
      marginBottom: 30,
    },
    header: {
      backgroundColor:
        theme.palette.type === "dark" ? DarkCodeHeader : LightCodeHeader,
    },
    title: {
      fontSize: FontSizes.title,
      color: theme.palette.text.secondary,
      padding: "5px 10px",
      width: "100%",
      textAlign: "right",
    },
  })
);

const CodeBlock = ({ children, className }: Props) => {
  const language: Language = className.replace(/language-/, "") as Language;
  const theme = useTheme();
  const isDarkThemeEnabled = theme.palette.type === "dark";
  const codeTheme = isDarkThemeEnabled ? darkTheme : lightTheme;
  const codeBackground = isDarkThemeEnabled
    ? DarkCodeBackground
    : LightCodeBackground;

  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.root}>
      <Box className={classes.header}>
        <Typography className={classes.title}>{language}</Typography>
      </Box>
      <Divider />
      <Highlight
        {...defaultProps}
        theme={codeTheme}
        code={children}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              padding: "15px",
              margin: 0,
              backgroundColor: codeBackground,
              overflow: "auto",
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </Paper>
  );
};

export default CodeBlock;
