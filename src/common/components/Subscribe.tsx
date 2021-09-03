import React from "react";
import FormInputWithButton from "./FormInputWithButton";

const Subscribe = () => {
  return (
    <div className="shadow max-w-2xl p-5 rounded-lg border dark:border-gray-700 bg-brand-light bg-opacity-5 dark:bg-brand-dark dark:bg-opacity-20">
      <h2 className="text-xl">Subscribe</h2>
      <p className="text-sm text-gray-400">
        Subscribe to receive notifications when new articles are published
      </p>
      <FormInputWithButton
        type="email"
        name="subscribe"
        id="subscriber_email"
        placeholder="Please Enter Your Email"
        label="subscribe"
        className="mt-3"
      />
    </div>
  );
};

export default Subscribe;
