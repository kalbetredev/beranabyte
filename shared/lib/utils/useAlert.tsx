import MuiSnackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { createContext, useCallback, useContext, useState } from "react";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type Severity = "error" | "warning" | "info" | "success";

interface AlertState {
  isOpen: boolean;
  severity: Severity;
  message: string;
  duration: number;
}

const AlertContext = createContext(null);

export const ProvideAlert = ({ children }) => {
  const [state, setState] = useState<AlertState>({
    isOpen: false,
    severity: "success",
    message: "",
    duration: 3000,
  });

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setState({
      ...state,
      isOpen: false,
    });
  };

  const alert = useCallback(
    ({
      severity,
      message,
      duration,
    }: {
      severity: Severity;
      message: string;
      duration: number;
    }) => {
      console.log(severity, message, duration);
      setState({
        isOpen: true,
        severity: severity,
        message: message,
        duration: duration,
      });
    },
    [setState]
  );

  return (
    <AlertContext.Provider value={alert}>
      <MuiSnackbar
        open={state.isOpen}
        autoHideDuration={state.duration}
        onClose={handleClose}
      >
        <Alert severity={state.severity} onClose={handleClose}>
          {state.message}
        </Alert>
      </MuiSnackbar>
      {children}
    </AlertContext.Provider>
  );
};

const useAlert = () => {
  return useContext(AlertContext);
};

export default useAlert;
