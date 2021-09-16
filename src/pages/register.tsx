import React, { useState } from "react";
import Page from "../common/layouts/Page";
import Logo from "../common/components/Logo";
import { SIGNIN_PAGE_SLUG } from "../common/constants/page-slugs";
import LinkButton from "../common/components/LinkButton";
import FormErrorMessage from "../common/components/FormErrorMessage";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useRouter } from "next/router";
import useAuth, { AuthProvider } from "../modules/auth/hooks/useAuth";
import useAlert, { AlertProvider } from "../common/hooks/useAlert";
import APIError from "../api/models/APIError";

const registerFormSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(3).max(30).required(),
  repeat_password: Joi.ref("password"),
});

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth: AuthProvider = useAuth();
  if (auth.user) router.replace("/");

  const alert: AlertProvider = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(registerFormSchema),
  });

  const signUp = ({ email, password }) => {
    setLoading(true);
    auth
      .signUp(email, password)
      .then(() => {
        alert.success("Your account has been created.");
        router.replace("/");
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
    <Page>
      <div className="mt-20 mb-40 mx-auto w-full max-w-sm">
        <div className="p-4 sm:p-6 shadow rounded-md border border-gray-100 dark:border-gray-700 dark:bg-gray-700 dark:bg-opacity-80">
          <div className="flex flex-col justify-center items-center mb-5">
            <div className="w-36 h-10 mb-1">
              <Logo />
            </div>
          </div>
          <div className="">
            <form onSubmit={handleSubmit(signUp)}>
              <div className="mb-6">
                <label htmlFor="email" className="form-label">
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
                <label htmlFor="password" className="form-label">
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
                      "form-input w-full" +
                      (errors.password ? " error-ring" : "")
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
              <div className="border-t border-gray-300 dark:border-gray-600 mt-4 pt-4">
                <LinkButton label="Sign In" slug={SIGNIN_PAGE_SLUG} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default RegisterPage;
