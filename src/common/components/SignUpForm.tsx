import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import APIError from "../../api/models/APIError";
import useAuth, { AuthProvider } from "../../modules/auth/hooks/useAuth";
import pageSlugs from "../constants/page-slugs";
import useAlert, { AlertProvider } from "../hooks/useAlert";
import FormErrorMessage from "./FormErrorMessage";
import LinkButton from "./LinkButton";
import Logo from "./Logo";

type SignUpFormData = {
  email: string;
  password: string;
  repeat_password: string;
};

const signUpFormSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(3).max(30).required(),
  repeat_password: Joi.ref("password"),
});

interface SignUpFormProps {
  onSuccess: () => void;
  continuePath?: string;
}

const SignUpForm: React.FC<SignUpFormProps> = (props: SignUpFormProps) => {
  const { onSuccess, continuePath } = props;
  const router = useRouter();
  const { continue_to } = router.query;

  const auth: AuthProvider = useAuth();
  if (auth.user) router.replace("/");

  const alert: AlertProvider = useAlert();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: joiResolver(signUpFormSchema),
  });

  const signUp = ({ email, password }: SignUpFormData) => {
    setLoading(true);
    auth
      .signUp(email, password)
      .then(() => {
        alert.success("Your account has been created.");
        onSuccess();
        setLoading(false);
      })
      .catch((error) => {
        let message =
          error instanceof APIError
            ? error.message
            : "An error has occurred creating your account. Please try again.";

        alert.error(message, { disableAutoHide: true });
        setLoading(false);
      });
  };

  return (
    <div className="p-4 dark:bg-gray-700 dark:bg-opacity-80">
      <div className="flex flex-col justify-center items-center mb-5">
        <div className={"w-36" + (loading ? " animate-pulse" : "")}>
          <Logo />
        </div>
      </div>
      <form onSubmit={handleSubmit(signUp)}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className={"form-label" + (loading ? " text-gray-400" : "")}
          >
            email
          </label>
          <div className="mt-1">
            <input
              type="email"
              id="email"
              disabled={loading}
              autoComplete="off"
              {...register("email")}
              className={
                "form-input w-full" + (errors.email ? " error-ring" : "")
              }
            />
            {errors.email ? (
              <div className="mt-3">
                <FormErrorMessage
                  message={errors.email.message.replace(/['"]+/g, "")}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className={"form-label" + (loading ? " text-gray-400" : "")}
          >
            password
          </label>
          <div className="mt-1">
            <input
              type="password"
              id="password"
              disabled={loading}
              autoComplete="off"
              {...register("password")}
              className={
                "form-input w-full" + (errors.password ? " error-ring" : "")
              }
            />
            {errors.password ? (
              <div className="mt-3">
                <FormErrorMessage
                  message={errors.password.message.replace(/['"]+/g, "")}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="repeat_password" className="form-label">
            repeat password
          </label>
          <div className="mt-1">
            <input
              type="password"
              id="repeat_password"
              disabled={loading}
              autoComplete="off"
              {...register("repeat_password")}
              className={
                "form-input w-full" +
                (errors.repeat_password ? " error-ring" : "")
              }
            />
            {errors.repeat_password ? (
              <div className="mt-3">
                <FormErrorMessage
                  message={errors.repeat_password.message
                    .replace(/['"]+/g, "")
                    .replace("repeat_password", "repeated password")
                    .replace("[ref:password]", "the same as password")}
                />
              </div>
            ) : null}
          </div>
        </div>
        <button type="submit" className="w-full primary-btn">
          Sign Up
        </button>
        <div className="border-t form-separator mt-4 pt-2">
          <LinkButton
            label="Sign In"
            slug={pageSlugs.signInPageSlug(continuePath)}
          />
        </div>
      </form>
    </div>
  );
};

SignUpForm.defaultProps = {
  continuePath: "/",
};

export default SignUpForm;
