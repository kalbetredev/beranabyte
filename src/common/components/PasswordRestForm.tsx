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

type PasswordRestFormData = {
  email: string;
  password: string;
};

const passwordRestFormSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

interface PasswordRestFormProps {
  onSuccess: () => void;
  continuePath?: string;
}

const PasswordRestForm: React.FC<PasswordRestFormProps> = (
  props: PasswordRestFormProps
) => {
  const { onSuccess, continuePath } = props;
  const router = useRouter();
  const { continue_to } = router.query;

  const auth: AuthProvider = useAuth();
  if (auth.user) router.replace("/" + continuePath);

  const alert: AlertProvider = useAlert();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRestFormData>({
    resolver: joiResolver(passwordRestFormSchema),
  });

  const sendPasswordResetLink = ({ email }: PasswordRestFormData) => {
    setLoading(true);
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert.success("Password Reset Link Sent. Please check your email");
        onSuccess();
        setLoading(false);
      })
      .catch((error) => {
        let message =
          error instanceof APIError
            ? error.message
            : "An error has occurred processing your request. Please try again.";

        alert.error(message);
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
      <div className="">
        <form onSubmit={handleSubmit(sendPasswordResetLink)}>
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
          <button
            type="submit"
            disabled={loading}
            className={"w-full " + (loading ? "disabled-btn" : "primary-btn")}
          >
            Send Password Reset Link
          </button>
          <div className="border-t form-separator mt-4 pt-2">
            {loading ? (
              <>
                <button disabled className="w-full disabled-btn">
                  Sign In
                </button>
                <button disabled className="w-full disabled-btn">
                  Create Account
                </button>
              </>
            ) : (
              <>
                <LinkButton
                  label="Sign In"
                  slug={pageSlugs.signInPageSlug(continuePath)}
                />
                <LinkButton
                  label="Create Account"
                  slug={pageSlugs.signUpPageSlug(continuePath)}
                  className="mt-2"
                />
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

PasswordRestForm.defaultProps = {
  continuePath: "/",
};

export default PasswordRestForm;
