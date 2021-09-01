import SCREEN_TOGGLE from "../types/screen_toggle";

interface IconButtonProps {
  onClick?: () => void;
  screenToggle?: SCREEN_TOGGLE;
  children?: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps) => {
  let classes = "";

  if (props.screenToggle === SCREEN_TOGGLE.DESKTOP) classes = "hidden sm:block";
  else if (props.screenToggle === SCREEN_TOGGLE.MOBILE) classes = "sm:hidden";

  classes +=
    " rounded-full w-9 h-9 hover:bg-gray-400 dark:hover:bg-gray-700 hover:bg-opacity-10 hover:text-brand flex justify-center items-center";

  return (
    <button className={classes} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

IconButton.defaultProps = {
  screenToggle: SCREEN_TOGGLE.ALL,
};

export default IconButton;
