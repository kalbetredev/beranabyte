interface FormLabelProps {
  label: string;
  for: string;
}

const FormLabel: React.FC<FormLabelProps> = (props: FormLabelProps) => {
  return (
    <label
      htmlFor={props.for}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize"
    >
      {props.label}
    </label>
  );
};

export default FormLabel;
