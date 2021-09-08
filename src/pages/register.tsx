import React, { useState } from "react";
import Page from "../common/layouts/Page";
import Logo from "../common/components/Logo";
import { SIGNIN_PAGE_SLUG } from "../common/constants/page-slugs";
import LinkButton from "../common/components/LinkButton";
import { isEmailValid } from "../common/utils/input-validation";
import FormErrorMessage from "../common/components/FormErrorMessage";

interface RegisterForm {
  email: string;
  password: string;
  reptPassword: string;
}

interface FormError {
  email: boolean;
  password: boolean;
  reptPassword: boolean;
}

const RegisterPage = () => {
  const [formState, setFormState] = useState<RegisterForm>({
    email: "",
    password: "",
    reptPassword: "",
  });

  const [error, setError] = useState<FormError>({
    email: false,
    password: false,
    reptPassword: false,
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

  const handelReptPasswordChange = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const password = event.currentTarget.value;
    setFormState((state) => ({ ...state, reptPassword: password }));
    if (validateOnChange)
      setError((state) => ({
        ...state,
        reptPassword:
          password != formState.password || password.toString().length == 0,
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

    if (!(formState.password.length > 0)) {
      setError((state) => ({
        ...state,
        password: true,
      }));
      setValidateOnChange(true);
      inputError = true;
    }

    if (
      formState.reptPassword != formState.password ||
      formState.reptPassword.length == 0
    ) {
      setError((state) => ({
        ...state,
        reptPassword: true,
      }));
      setValidateOnChange(true);
      inputError = true;
    }

    if (!inputError) {
      setError({ email: false, password: false, reptPassword: false });
      setValidateOnChange(false);

      //TODO : Submit Email, Password & reptPassword To Server
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
                    autoComplete="off"
                    value={formState.email}
                    onChange={handelEmailChange}
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
                    autoComplete="off"
                    value={formState.password}
                    onChange={handelPasswordChange}
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
              <div className="mb-6">
                <label htmlFor="rept_password" className="form-label">
                  repeat password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    id="rept_password"
                    autoComplete="off"
                    value={formState.reptPassword}
                    onChange={handelReptPasswordChange}
                    className={
                      "form-input w-full" +
                      (error.reptPassword ? " error-ring" : "")
                    }
                  />
                  {error.reptPassword ? (
                    <div className="mt-3">
                      <FormErrorMessage message="Passwords must match and should not not be empty" />
                    </div>
                  ) : null}
                </div>
              </div>
              <button type="submit" className="w-full primary-btn">
                Sign Up
              </button>
              <div className="border-t border-gray-600 mt-4 pt-4">
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
