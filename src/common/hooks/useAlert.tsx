import React, { createContext, useContext, useState } from "react";
import Alert, { AlertProps, Severity } from "../components/Alert";
import Snackbar from "../components/Snackbar";

const AlertContext = createContext(null);

export interface AlertOptions {
  disableAutoHide?: boolean;
  autoHideDuration?: number;
}

const defaultOptions: AlertOptions = {
  disableAutoHide: false,
  autoHideDuration: 2000,
};

interface AlertState extends AlertProps {
  isOpen: boolean;
  disableAutoHide: boolean;
  autoHideDuration: number;
}

type AlertMethod = (message: string, options?: AlertOptions) => void;

export interface AlertProvider {
  success: AlertMethod;
  error: AlertMethod;
  warning: AlertMethod;
  information: AlertMethod;
}

export const ProvideAlert = ({ children }) => {
  const [state, setState] = useState<AlertState>({
    isOpen: false,
    severity: "info",
    message: "",
    disableAutoHide: defaultOptions.disableAutoHide,
    autoHideDuration: defaultOptions.autoHideDuration,
  });

  const handleClose = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };

  const alert = (
    message: string,
    severity: Severity,
    disableAutoHide: boolean,
    autoHideDuration: number
  ) => {
    setState({
      isOpen: true,
      severity: severity,
      message: message,
      disableAutoHide: disableAutoHide,
      autoHideDuration: autoHideDuration,
    });
  };

  const alertValue: AlertProvider = useAlertProvider(alert);

  return (
    <AlertContext.Provider value={alertValue}>
      <Snackbar
        isOpen={state.isOpen}
        onClose={handleClose}
        autoHideDuration={state.disableAutoHide ? null : state.autoHideDuration}
      >
        <Alert
          message={state.message}
          severity={state.severity}
          onClose={handleClose}
        />
      </Snackbar>
      {children}
    </AlertContext.Provider>
  );
};

const useAlert = () => {
  return useContext(AlertContext);
};

function useAlertProvider(
  alert: (
    message: string,
    severity: Severity,
    disableAutoHide: boolean,
    autoHideDuration: number
  ) => void
): AlertProvider {
  const getOptions = (options?: AlertOptions): AlertOptions => {
    const disableAutoHide =
      options?.disableAutoHide || defaultOptions.disableAutoHide;
    const autoHideDuration =
      options?.autoHideDuration || defaultOptions.autoHideDuration;
    return { disableAutoHide, autoHideDuration };
  };

  const success = (message: string, options?: AlertOptions) => {
    const { disableAutoHide, autoHideDuration } = getOptions(options);
    alert(message, "success", disableAutoHide, autoHideDuration);
  };

  const error = (message: string, options?: AlertOptions) => {
    const { disableAutoHide, autoHideDuration } = getOptions(options);
    alert(message, "error", disableAutoHide, autoHideDuration);
  };

  const warning = (message: string, options?: AlertOptions) => {
    const { disableAutoHide, autoHideDuration } = getOptions(options);
    alert(message, "warning", disableAutoHide, autoHideDuration);
  };

  const information = (message: string, options?: AlertOptions) => {
    const { disableAutoHide, autoHideDuration } = getOptions(options);
    alert(message, "info", disableAutoHide, autoHideDuration);
  };

  return {
    success,
    error,
    warning,
    information,
  };
}

export default useAlert;
