import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";

interface SnackbarProps {
  isOpen: boolean;
  onClose: () => void;
  autoHideDuration?: number;
  children?: React.ReactNode;
}

const Snackbar: React.FC<SnackbarProps> = (props: SnackbarProps) => {
  let autoHideTimer;
  const { isOpen, onClose, autoHideDuration, children } = props;

  const handleEnter = () => {
    if (autoHideDuration) setAutoHideTimer();
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const setAutoHideTimer = () => {
    window.clearTimeout(autoHideTimer);
    autoHideTimer = window.setTimeout(handleClose, autoHideDuration);
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(autoHideTimer);
    };
  }, []);

  return (
    <CSSTransition
      in={isOpen}
      timeout={500}
      appear
      unmountOnExit
      classNames="zoom"
      onEnter={handleEnter}
      onExit={handleClose}
    >
      <div className="fixed bottom-12 w-full p-6 z-50">{children}</div>
    </CSSTransition>
  );
};

export default Snackbar;
