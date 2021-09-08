import React from "react";
import Page from "../common/layouts/Page";
import Logo from "../common/components/Logo";
import { SIGNIN_PAGE_SLUG } from "../common/constants/page-slugs";
import LinkButton from "../common/components/LinkButton";

const RegisterPage = () => {
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
            <form action="#" method="POST">
              <div className="mb-6">
                <label htmlFor="email" className="form-label">
                  email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    autoComplete="off"
                    className="form-input w-full"
                  />
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
                    className="form-input w-full"
                  />
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
                    className="form-input w-full"
                  />
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
