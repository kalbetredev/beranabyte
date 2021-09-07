import React from "react";
import FormInput from "../common/components/FormInput";
import FormLabel from "../common/components/FormLabel";
import PrimaryButton from "../common/components/PrimaryButton";
import SocialMediaLinks from "../common/components/SocialMediaLinks";
import Page from "../common/layouts/Page";

const ContactPage = () => {
  return (
    <Page>
      <div className="w-full mt-20 mb-8">
        <h1 className="w-full text-3xl font-medium">
          Contact <span className="text-brand">Kalkidan</span>
        </h1>
        <h2 className="mt-5">Use Social Media</h2>
        <div className="flex mt-3 mb-10 pb-6 border-b border-gray-300 dark:border-gray-700">
          <SocialMediaLinks />
        </div>
        <h2 className="mt-5">You Can Also Leave a message</h2>
        <div className="mt-5">
          <form action="#" method="POST" id="contactForm" name="contactForm">
            <div className="mb-6">
              <FormLabel for="email" label="email" />
              <div className="mt-1 max-w-sm">
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
              <FormLabel for="message" label="message" />
              <div className="mt-1">
                <textarea
                  form="contactForm"
                  name="message"
                  id="message"
                  className="w-full text-sm border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 focus:border-brand focus:border-opacity-25 focus:ring-brand focus:ring-opacity-50"
                  rows={10}
                  required
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end items-center">
              <div className="w-full max-w-[200px]">
                <PrimaryButton type="submit" label="Send" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default ContactPage;
