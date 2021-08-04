import SCREEN_TOGGLE from "../constants/types/screen_toggle";

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
    " rounded-full w-8 h-8 p-1 hover:bg-gray-400 hover:bg-opacity-10 hover:text-brand";

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
