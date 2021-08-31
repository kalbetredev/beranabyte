interface FormInputProps {
  type: string;
  name: string;
  id: string;
  required?: boolean;
  autoComplete?: string;
}

const FormInput: React.FC<FormInputProps> = (props: FormInputProps) => {
  return (
    <input
      type={props.type}
      name={props.name}
      id={props.id}
      autoComplete={props.autoComplete ?? ""}
      required={props.required ?? false}
      className="w-full text-sm border-gray-300 dark:border-gray-500 rounded-md shadow-sm dark:bg-gray-700 focus:border-brand focus:border-opacity-25 focus:ring-brand focus:ring-opacity-50"
    />
  );
};

export default FormInput;
