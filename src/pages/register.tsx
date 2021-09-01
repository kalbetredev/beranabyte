import React from "react";
import Page from "../common/layouts/Page";
import PageMeta from "../common/types/PageMeta";
import FormInput from "../common/components/FormInput";
import FormLabel from "../common/components/FormLabel";
import PrimaryButton from "../common/components/PrimaryButton";
import Logo from "../common/components/Logo";
import SecondaryButton from "../common/components/SecondaryButton";
import { SIGNIN_PAGE_SLUG } from "../common/constants/page-slugs";

const register = () => {
  const meta: PageMeta = {
    title: "BeranaByte",
    description:
      "Blog / portfolio website where you can find blogs and projects on most recent technologies on software development and other tech things.",
    type: "website",
    image: "/static/images/banner.png",
  };

  return (
    <Page meta={meta}>
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
              <div className="mb-6">
                <FormLabel for="rept_password" label="repeat password" />
                <div className="mt-1">
                  <FormInput
                    type="password"
                    name="rept_password"
                    id="rept_password"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
              <PrimaryButton type="submit" label="Sign Up" />
              <div className="border-t border-gray-600 mt-4 pt-2">
                <SecondaryButton label="Sign In" slug={SIGNIN_PAGE_SLUG} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default register;
