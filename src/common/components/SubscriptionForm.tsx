import React from "react";
import Joi from "joi";
import FormInputWithButton from "./FormInputWithButton";

const subscriptionFormSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

const SubscriptionForm = () => {
  const onSubmit = (data) => {
    console.log(data.email);
  };

  return (
    <div className="shadow max-w-2xl p-5 rounded-lg border dark:border-gray-700 bg-brand-light bg-opacity-5 dark:bg-brand-dark dark:bg-opacity-20">
      <h2 className="text-xl">Subscribe</h2>
      <p className="text-sm text-gray-400">
        Subscribe to receive notifications when new articles are published
      </p>
      <FormInputWithButton
        inputType="email"
        inputName="email"
        inputPlaceholder="Please Enter Your Email"
        btnLabel="subscribe"
        className="mt-3"
        onSubmit={onSubmit}
        validationSchema={subscriptionFormSchema}
      />
    </div>
  );
};

export default SubscriptionForm;
