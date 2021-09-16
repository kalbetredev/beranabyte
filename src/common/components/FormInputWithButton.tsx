import React from "react";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import FormErrorMessage from "./FormErrorMessage";

interface FormInputWithButtonProps {
  inputType?: string;
  inputName: string;
  inputPlaceholder?: string;
  btnLabel: string;
  className?: string;
  validationSchema?: Joi.ObjectSchema<any>;
  onSubmit: (data) => void;
}

const FormInputWithButton: React.FC<FormInputWithButtonProps> = (
  props: FormInputWithButtonProps
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: props.validationSchema
      ? joiResolver(props.validationSchema)
      : null,
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <div className={"relative " + props.className}>
        <div>
          <input
            type={props.inputType}
            placeholder={props.inputPlaceholder}
            {...register(props.inputName)}
            className={
              "w-full form-input pr-28 md:pr-36" +
              (errors[props.inputName] ? " error-ring" : "")
            }
          />
        </div>
        <div className="absolute right-0 top-0">
          <button
            type="submit"
            className="w-24 sm:w-32 flex capitalize justify-center py-2 px-4 my-0 border border-gray-300 dark:border-gray-600 rounded-md rounded-l-none text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 outline-none"
          >
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
    </form>
  );
};

FormInputWithButton.defaultProps = {
  inputType: "text",
  className: "",
};

export default FormInputWithButton;
