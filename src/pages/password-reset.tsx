import React, { useState } from "react";
import Page from "../common/layouts/Page";
import Logo from "../common/components/Logo";
import {
  REGISTER_PAGE_SLUG,
  SIGNIN_PAGE_SLUG,
} from "../common/constants/page-slugs";
import LinkButton from "../common/components/LinkButton";
import { isEmailValid } from "../common/utils/input-validation";
import FormErrorMessage from "../common/components/FormErrorMessage";

const PasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [validateOnChange, setValidateOnChange] = useState(false);

  const handelInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
    if (validateOnChange) setError(!isEmailValid(event.currentTarget.value));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isEmailValid(email)) {
      setError(true);
      setValidateOnChange(true);
    } else {
      setError(false);
      setValidateOnChange(false);

      //TODO : Submit Email To Server
      console.log(email);
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
                    value={email}
                    onChange={handelInputChange}
                    placeholder="Enter Your Email"
                    autoComplete="off"
                    className="form-input w-full"
                  />
                  {error ? (
                    <div className="mt-3">
                      <FormErrorMessage message="Invalid Email Address" />
                    </div>
                  ) : null}
                </div>
              </div>
              <button type="submit" className="w-full primary-btn">
                Send Password Reset Link
              </button>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <LinkButton label="Sign In" slug={SIGNIN_PAGE_SLUG} />
                <LinkButton
                  label="Create Account"
                  slug={REGISTER_PAGE_SLUG}
                  className="mt-2"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default PasswordResetPage;
