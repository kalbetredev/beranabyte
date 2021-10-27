import React from "react";
import { useFormContext } from "react-hook-form";
import SpinnerIcon from "../../icons/SpinnerIcon";
import FormErrorMessage from "./FormErrorMessage";

interface FormInputWithButtonProps {
  inputType?: string;
  inputName: string;
  inputPlaceholder?: string;
  btnLabel: string;
  className?: string;
  isLoading?: boolean;
}

const FormInputWithButton: React.FC<FormInputWithButtonProps> = (
  props: FormInputWithButtonProps
) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className={"relative " + props.className}>
        <div>
          <input
            type={props.inputType}
            autoComplete="off"
            placeholder={props.inputPlaceholder}
            {...register(props.inputName)}
            className={
              "w-full form-input pr-28 md:pr-36" +
              (errors[props.inputName] ? " error-ring" : "")
            }
            disabled={props.isLoading}
          />
        </div>
        <div className="absolute right-0 top-0">
          <button
            type="submit"
            className={
              "w-24 sm:w-32 flex capitalize justify-center items-center py-2 px-4 my-0 border separator rounded-md rounded-l-none text-sm font-medium outline-none" +
              (props.isLoading
                ? " text-gray-400 cursor-not-allowed bg-gray-200 dark:bg-gray-600"
                : " bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 ")
            }
            disabled={props.isLoading}
          >
            {props.isLoading ? (
              <div className="mr-1 w-4 h-4">
                <SpinnerIcon />
              </div>
            ) : null}
            {props.btnLabel}
          </button>
        </div>
      </div>
      {errors[props.inputName] ? (
        <div className="mt-3">
          <FormErrorMessage
            message={errors[props.inputName].message.replace(/['"]+/g, "")}
          />
        </div>
      ) : null}
    </div>
  );
};

FormInputWithButton.defaultProps = {
  inputType: "text",
  className: "",
  isLoading: false,
};

export default FormInputWithButton;
