import React from "react";
import FormInput, { FormInputProps } from "./FormInput";
import SecondaryButton, { SecondaryButtonProps } from "./SecondaryButton";

interface FormInputWithButtonProps
  extends FormInputProps,
    SecondaryButtonProps {}

const FormInputWithButton: React.FC<FormInputWithButtonProps> = (
  props: FormInputWithButtonProps
) => {
  return (
    <div className={"relative " + props.className}>
      <div className="">
        <FormInput
          type={props.type}
          name={props.name}
          id={props.id}
          placeholder={props.placeholder}
          className="pr-28 md:pr-36"
        />
      </div>
      <div className="absolute right-0 top-0">
        <SecondaryButton
          label={props.label}
          className="my-0 rounded-l-none w-24 sm:w-32 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 focus:ring-0 focus:ring-offset-0"
        />
      </div>
    </div>
  );
};

FormInputWithButton.defaultProps = {
  type: "text",
  name: "",
  id: "",
  required: false,
  autoComplete: "off",
  placeholder: "",
  className: "",
};

export default FormInputWithButton;
