import React from "react";
import { XIcon } from "@heroicons/react/outline";

export type Severity = "error" | "warning" | "info" | "success";

export interface AlertProps {
  message: string;
  severity: Severity;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = (props: AlertProps) => {
  const { message, severity, onClose } = props;

  const styles = {
    error: {
      div: "bg-red-500 dark:bg-red-700",
      btn: "hover:bg-red-400 dark:hover:bg-red-600",
    },
    warning: {
      div: "bg-yellow-500 dark:bg-yellow-600",
      btn: "hover:bg-yellow-400 dark:hover:bg-yellow-500",
    },
    info: {
      div: "bg-blue-500 dark:bg-blue-700",
      btn: "hover:bg-blue-400 dark:hover:bg-blue-600",
    },
    success: {
      div: "bg-green-500 dark:bg-green-700",
      btn: "hover:bg-green-400 dark:hover:bg-green-600",
    },
  };

  return (
    <div className={`p-3 mx-auto max-w-md rounded-md ${styles[severity].div}`}>
      <div className="flex justify-center items-center text-white">
        <p className="flex-1 text-sm">{message}</p>
        <button
          className={`rounded-full w-7 h-7 flex justify-center items-center ${styles[severity].btn}`}
          onClick={onClose}
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Alert;
