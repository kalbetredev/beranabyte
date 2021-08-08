import { makeStyles, Theme, createStyles } from "@material-ui/core";

const baseDarkColor = "rgba(42,42,42,1)";
const animDarkColor = "rgba(52,52,52,1)";

const baseLightColor = "rgba(238,238,238,1)";
const animLightColor = "rgba(248,248,248,1)";

interface LoadingPlaceholderProps {
  borderRadius?: number;
}

const useStyles = (styles: LoadingPlaceholderProps) =>
  makeStyles((theme: Theme) =>
    createStyles({
      loadingBar: {
        height: "100%",
        width: "100%",
        borderRadius: styles.borderRadius ?? 2.5,
        backgroundColor: `${
          theme.palette.type == "dark" ? baseDarkColor : baseLightColor
        }`,
        background: `${
          theme.palette.type == "dark"
            ? `linear-gradient(90deg, ${baseDarkColor} 0%, ${animDarkColor} 7%, ${animDarkColor} 13%, ${baseDarkColor} 25%)`
            : `linear-gradient(90deg, ${baseLightColor} 0%, ${animLightColor} 7%, ${animLightColor} 13%, ${baseLightColor} 25%)`
        }`,
        backgroundSize: "900%",
        backgroundPosition: "100% 0%",
        animation: `$animation 4.0s ${theme.transitions.easing.easeInOut}`,
        animationIterationCount: "infinite",
      },
      "@keyframes animation": {
        "0%": {
          backgroundPosition: "100% 0%",
        },
        "99.99%": {
          backgroundPosition: "-30% 0%",
        },
        "100%": {
          backgroundPosition: "100% 0%",
        },
      },
    })
  );

const LoadingPlaceholder = (props: LoadingPlaceholderProps) => {
  const classes = useStyles(props)();
  return <div className={classes.loadingBar}></div>;
};

export default LoadingPlaceholder;
