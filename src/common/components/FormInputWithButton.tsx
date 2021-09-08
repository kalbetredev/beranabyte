import React from "react";

interface FormInputWithButtonProps {
  inputType?: string;
  inputValue?: string;
  inputOnChange?: React.ChangeEventHandler<HTMLInputElement>;
  inputPlaceholder?: string;
  btnType?: "button" | "submit" | "reset" | null;
  btnLabel: string;
  btnOnClick?: () => void;
  className?: string;
}

const FormInputWithButton: React.FC<FormInputWithButtonProps> = (
  props: FormInputWithButtonProps
) => {
  return (
    <div className={"relative " + props.className}>
      <div className="">
        <input
          type={props.inputType}
          value={props.inputValue}
          onChange={props.inputOnChange}
          placeholder={props.inputPlaceholder}
          className="w-full form-input pr-28 md:pr-36"
        />
      </div>
      <div className="absolute right-0 top-0">
        <button
          type={props.btnType}
          onClick={props.btnOnClick}
          className="w-24 sm:w-32 flex capitalize justify-center py-2 px-4 my-0 border border-gray-300 dark:border-gray-600 rounded-md rounded-l-none text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 outline-none"
        >
          {props.btnLabel}
        </button>
      </div>
    </div>
  );
};

FormInputWithButton.defaultProps = {
  inputType: "text",
  inputPlaceholder: "",
  className: "",
  btnType: "button",
};

export default FormInputWithButton;
