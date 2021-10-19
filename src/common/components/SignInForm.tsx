import React, { useState } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import APIError from "../../api/models/APIError";
import BeranaByteIcon from "../../icons/BeranabyteIcon";
import useAuth, { AuthProvider } from "../../modules/auth/hooks/useAuth";
import pageSlugs from "../constants/page-slugs";
import useAlert, { AlertProvider } from "../hooks/useAlert";
import FormErrorMessage from "./FormErrorMessage";
import LinkButton from "./LinkButton";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(3).max(30).required(),
});

interface SignInFormProps {
  onSuccess: () => void;
  continuePath?: string;
}

const SignInForm: React.FC<SignInFormProps> = (props: SignInFormProps) => {
  const { onSuccess, continuePath } = props;
  const auth: AuthProvider = useAuth();

  const alert: AlertProvider = useAlert();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: joiResolver(signInFormSchema),
  });

  const signIn = ({ email, password }: SignInFormData) => {
    setLoading(true);
    auth
      .signIn(email, password)
      .then(() => {
        alert.success("Welcome Back!");
        onSuccess();
        setLoading(false);
      })
      .catch((error) => {
        let message =
          error instanceof APIError
            ? error.message
            : "An error has occurred authenticating your account. Please try again.";

        alert.error(message);
        setLoading(false);
      });
  };

  return (
    <div className="p-4 dark:bg-gray-700 dark:bg-opacity-80">
      <div className="flex flex-col justify-center items-center mb-5">
        <div className={"w-36" + (loading ? " animate-pulse" : "")}>
          <BeranaByteIcon />
        </div>
      </div>
      <form onSubmit={handleSubmit(signIn)}>
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
        <button
          type="submit"
          disabled={loading}
          className={"w-full " + (loading ? "disabled-btn" : "primary-btn")}
        >
          Sign In
        </button>
        <div className="flex justify-end my-4 text-sm">
          {loading ? (
            <p className="text-gray-400 cursor-not-allowed">
              Forgot Your Password ?
            </p>
          ) : (
            <Link href={pageSlugs.passwordRestPageSlug(continuePath)}>
              <a className="text-brand dark:text-brand-light hover:text-gray-400 dark:hover:text-gray-300">
                Forgot Your Password ?
              </a>
            </Link>
          )}
        </div>
        <div className="border-t form-separator mt-4 pt-2">
          {loading ? (
            <button disabled className="w-full disabled-btn">
              Create Account
            </button>
          ) : (
            <LinkButton
              label="Create Account"
              slug={pageSlugs.signUpPageSlug(continuePath)}
            />
          )}
        </div>
      </form>
    </div>
  );
};

SignInForm.defaultProps = {
  continuePath: "/",
};

export default SignInForm;
