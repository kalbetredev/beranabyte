import {
  Typography,
  FormControl,
  InputBase,
  InputAdornment,
  IconButton,
  FormHelperText,
  Grid,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { Cancel, Error } from "@material-ui/icons";
import { useRef } from "react";
import { RegisterOptions, UseFormMethods } from "react-hook-form";
import FontSizes from "../constants/fontsizes";

type InputType = "password" | "email" | "name";

const passwordFieldOptions: RegisterOptions = {
  required: {
    value: true,
    message: "Password is required",
  },
  minLength: {
    value: 6,
    message: "Min Length should be 6",
  },
};

const emailFieldOptions: RegisterOptions = {
  required: {
    value: true,
    message: "Email is required",
  },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid Email Address",
  },
};

const nameFieldOptions: RegisterOptions = {
  required: {
    value: true,
    message: "User Name is required",
  },
  minLength: {
    value: 4,
    message: "Min Length should be 4",
  },
};

const getOptions = (type: InputType): RegisterOptions => {
  if (type === "password") return passwordFieldOptions;
  else if (type === "email") return emailFieldOptions;
  else return nameFieldOptions;
};

interface FormInputProps {
  label: string;
  name: string;
  placeholder: string;
  type: InputType;
  useFormMethods: UseFormMethods<Record<string, any>>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formLabel: {
      fontSize: FontSizes.subtitle,
    },
    cancelBtn: {
      padding: 5,
    },
    input: {
      flex: 1,
      fontSize: FontSizes.input,
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: 6,
      padding: "3px 0 3px 7px",
      marginTop: 3,
      "&:hover": {
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
  })
);

const FormInput = (props: FormInputProps) => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const { label, name, placeholder, type, useFormMethods } = props;
  const { register, errors, clearErrors } = useFormMethods;

  const handleClearInput = () => {
    inputRef.current.value = "";
    inputRef.current.focus();
    clearErrors(name);
  };

  return (
    <>
      <Typography
        className={classes.formLabel}
        component="label"
        htmlFor={name}
      >
        {label}
      </Typography>
      <FormControl fullWidth>
        <InputBase
          className={classes.input}
          aria-label={label}
          name={name}
          type={type === "password" ? "password" : "text"}
          placeholder={placeholder}
          inputRef={(e) => {
            register(e, getOptions(type));
            inputRef.current = e;
          }}
          inputProps={{ autoComplete: "off" }}
          endAdornment={
            <InputAdornment position="end">
              {inputRef.current && inputRef.current.value.length > 0 ? (
                <IconButton
                  size="medium"
                  className={classes.cancelBtn}
                  onClick={handleClearInput}
                >
                  <Cancel fontSize="small" />
                </IconButton>
              ) : (
                <span />
              )}
            </InputAdornment>
          }
        />
        <FormHelperText component="div" error>
          {errors[name] && (
            <Grid container justify="flex-start" alignItems="center">
              <Error fontSize="small" style={{ paddingRight: 3 }} />
              {errors[name] && errors[name].message}
            </Grid>
          )}
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default FormInput;
