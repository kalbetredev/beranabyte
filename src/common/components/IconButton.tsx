interface IconButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps) => {
  return (
    <button
      className="rounded-full w-9 h-9 hover:bg-gray-400 dark:hover:bg-gray-700 hover:bg-opacity-10 hover:text-brand flex justify-center items-center"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default IconButton;
