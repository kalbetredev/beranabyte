import React from "react";
import Page from "../common/layouts/Page";
import FormInput from "../common/components/FormInput";
import FormLabel from "../common/components/FormLabel";
import PrimaryButton from "../common/components/PrimaryButton";
import Logo from "../common/components/Logo";
import SecondaryButton from "../common/components/SecondaryButton";
import {
  REGISTER_PAGE_SLUG,
  SEND_PASSWORD_RESET,
} from "../common/constants/page-slugs";
import Link from "next/link";

const SignIn = () => {
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
              <div className="mb-6">
                <FormLabel for="password" label="password" />
                <div className="mt-1">
                  <FormInput
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
              <PrimaryButton type="submit" label="Sign In" />
              <div className="flex justify-end my-4">
                <Link href={SEND_PASSWORD_RESET}>
                  <a className="text-sm text-brand dark:text-brand-light hover:text-gray-400 dark:hover:text-gray-300">
                    Forgot Your Password ?
                  </a>
                </Link>
              </div>
              <div className="border-t border-gray-600 mt-4 pt-2">
                <SecondaryButton
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

export default SignIn;
