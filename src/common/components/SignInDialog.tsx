import { XIcon } from "@heroicons/react/outline";
import React from "react";
import SignInForm from "./SignInForm";

interface SignInDialogProps {
  onClose: () => void;
  onSuccess: () => void;
}

const SignInDialog: React.FC<SignInDialogProps> = (
  props: SignInDialogProps
) => {
  const { onClose, onSuccess } = props;

  const handleSuccess = () => {
    onSuccess();
    onClose();
  };

  return (
    <div className="relative">
      <button
        onClick={props.onClose}
        className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-700"
      >
        <XIcon className="w-5 h-5 text-red-400" />
      </button>
      <SignInForm onSuccess={handleSuccess} />
    </div>
  );
};

export default SignInDialog;
