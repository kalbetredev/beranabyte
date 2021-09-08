import React, { useState } from "react";
import Page from "../common/layouts/Page";
import Logo from "../common/components/Logo";
import {
  REGISTER_PAGE_SLUG,
  SEND_PASSWORD_RESET,
} from "../common/constants/page-slugs";
import Link from "next/link";
import LinkButton from "../common/components/LinkButton";
import { isEmailValid } from "../common/utils/input-validation";
import FormErrorMessage from "../common/components/FormErrorMessage";

interface SingInForm {
  email: string;
  password: string;
}

interface FormError {
  email: boolean;
  password: boolean;
}

const SignInPage = () => {
  const [formState, setFormState] = useState<SingInForm>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<FormError>({
    email: false,
    password: false,
  });

  const [validateOnChange, setValidateOnChange] = useState(false);

  const handelEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    const email = event.currentTarget.value;
    setFormState((state) => ({ ...state, email: email }));
    if (validateOnChange)
      setError((state) => ({
        ...state,
        email: !isEmailValid(email),
      }));
  };

  const handelPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    const password = event.currentTarget.value;
    setFormState((state) => ({ ...state, password: password }));
    if (validateOnChange)
      setError((state) => ({
        ...state,
        password: password.toString().length == 0,
      }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let inputError = false;

    if (!isEmailValid(formState.email)) {
      setError((state) => ({
        ...state,
        email: true,
      }));
      setValidateOnChange(true);
      inputError = true;
    }

    if (formState.password.length == 0) {
      setError((state) => ({
        ...state,
        password: true,
      }));
      setValidateOnChange(true);
      inputError = true;
    }

    if (!inputError) {
      setError({ email: false, password: false });
      setValidateOnChange(false);

      //TODO : Submit Email & Password To Server
      console.log(formState.email, formState.password);
    }
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
            <form method="POST" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="form-label">
                  email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={handelEmailChange}
                    autoComplete="off"
                    className={
                      "form-input w-full" + (error.email ? " error-ring" : "")
                    }
                  />
                  {error.email ? (
                    <div className="mt-3">
                      <FormErrorMessage message="Invalid Email Address" />
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
                    value={formState.password}
                    onChange={handelPasswordChange}
                    autoComplete="off"
                    className={
                      "form-input w-full" +
                      (error.password ? " error-ring" : "")
                    }
                  />
                  {error.password ? (
                    <div className="mt-3">
                      <FormErrorMessage message="Password can not be empty" />
                    </div>
                  ) : null}
                </div>
              </div>
              <button type="submit" className="w-full primary-btn">
                Sign In
              </button>
              <div className="flex justify-end my-4">
                <Link href={SEND_PASSWORD_RESET}>
                  <a className="text-sm text-brand dark:text-brand-light hover:text-gray-400 dark:hover:text-gray-300">
                    Forgot Your Password ?
                  </a>
                </Link>
              </div>
              <div className="border-t border-gray-300 dark:border-gray-600 mt-4 pt-4">
                <LinkButton label="Create Account" slug={REGISTER_PAGE_SLUG} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SignInPage;
