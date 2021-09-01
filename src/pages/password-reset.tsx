import React from "react";
import Page from "../common/layouts/Page";
import FormInput from "../common/components/FormInput";
import FormLabel from "../common/components/FormLabel";
import PrimaryButton from "../common/components/PrimaryButton";
import Logo from "../common/components/Logo";
import SecondaryButton from "../common/components/SecondaryButton";
import {
  REGISTER_PAGE_SLUG,
  SIGNIN_PAGE_SLUG,
} from "../common/constants/page-slugs";

const PasswordReset = () => {
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
                <FormLabel for="email" label="email" />
                <div className="mt-1">
                  <FormInput
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
              <PrimaryButton type="submit" label="Send Password Reset Link" />
              <div className="border-t border-gray-600 mt-4 pt-2">
                <SecondaryButton label="Sign In" slug={SIGNIN_PAGE_SLUG} />
                <SecondaryButton
                  label="Create Account"
                  slug={REGISTER_PAGE_SLUG}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default PasswordReset;
