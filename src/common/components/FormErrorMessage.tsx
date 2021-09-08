import React from "react";

interface FormErrorMessageProps {
  message: string;
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = (
  props: FormErrorMessageProps
) => {
  return (
    <div className="rounded-lg p-2 text-red-900 bg-red-100 dark:text-red-200 dark:bg-red-900 dark:bg-opacity-30">
      <p className="text-xs leading-tight">{props.message}</p>
    </div>
  );
};

export default FormErrorMessage;
