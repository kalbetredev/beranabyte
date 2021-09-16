import React, { useState } from "react";
import Page from "../common/layouts/Page";
import Logo from "../common/components/Logo";
import {
  REGISTER_PAGE_SLUG,
  SEND_PASSWORD_RESET,
} from "../common/constants/page-slugs";
import Link from "next/link";
import LinkButton from "../common/components/LinkButton";
import FormErrorMessage from "../common/components/FormErrorMessage";
import useAuth, { AuthProvider } from "../modules/auth/hooks/useAuth";
import { useRouter } from "next/router";
import useAlert, { AlertProvider } from "../common/hooks/useAlert";
import APIError from "../api/models/APIError";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

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

const SignInPage: React.FC = () => {
  const router = useRouter();
  const { continue_to } = router.query;
  const continuePath = continue_to?.toString() || "";

  const auth: AuthProvider = useAuth();
  if (auth.user) router.replace("/" + continuePath);

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
        router.replace("/" + continuePath);
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
    <Page>
      <div className="mt-20 mb-40 mx-auto w-full max-w-sm">
        <div className="p-4 sm:p-6 shadow rounded-md border border-gray-100 dark:border-gray-700 dark:bg-gray-700 dark:bg-opacity-80">
          <div className="flex flex-col justify-center items-center mb-5">
            <div className="w-36 h-10 mb-1">
              <Logo />
            </div>
          </div>
          <div className="">
            <form onSubmit={handleSubmit(signIn)}>
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
              <button
                type="submit"
                disabled={loading}
                className={
                  "w-full " + (loading ? "disabled-btn" : "primary-btn")
                }
              >
                Sign In
              </button>
              <div className="flex justify-end my-4 text-sm">
                {loading ? (
                  <p className="text-gray-400 cursor-not-allowed">
                    Forgot Your Password ?
                  </p>
                ) : (
                  <Link href={SEND_PASSWORD_RESET}>
                    <a className="text-brand dark:text-brand-light hover:text-gray-400 dark:hover:text-gray-300">
                      Forgot Your Password ?
                    </a>
                  </Link>
                )}
              </div>
              <div className="border-t border-gray-300 dark:border-gray-600 mt-4 pt-4">
                {loading ? (
                  <button disabled className="w-full disabled-btn">
                    Create Account
                  </button>
                ) : (
                  <LinkButton
                    label="Create Account"
                    slug={REGISTER_PAGE_SLUG}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SignInPage;
