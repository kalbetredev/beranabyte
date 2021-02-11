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
import { useState } from "react";
import { DeepMap, FieldError } from "react-hook-form";
import FontSizes from "../constants/fontsizes";

type InputType = "password" | "email" | "name";

interface FormInputProps {
  label: string;
  name: string;
  placeholder: string;
  type: InputType;
  errorMessage: string;
  register: any;
  errors: DeepMap<Record<string, any>, FieldError>;
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
  const { name, register, errors } = props;
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <Typography
        className={classes.formLabel}
        component="label"
        htmlFor={name}
      >
        {props.label}
      </Typography>
      <FormControl fullWidth>
        <InputBase
          className={classes.input}
          aria-label={props.label}
          name={name}
          type={props.type}
          value={inputValue}
          placeholder={props.placeholder}
          onChange={(e) => setInputValue(e.target.value)}
          inputRef={register({
            required: props.errorMessage,
          })}
          inputProps={{ autoComplete: "off" }}
          endAdornment={
            <InputAdornment position="end">
              {inputValue.length > 0 ? (
                <IconButton
                  size="medium"
                  className={classes.cancelBtn}
                  onClick={() => setInputValue("")}
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
