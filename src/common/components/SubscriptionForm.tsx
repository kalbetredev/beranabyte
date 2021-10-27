import React, { useState } from "react";
import Joi from "joi";
import FormInputWithButton from "./FormInputWithButton";
import { joiResolver } from "@hookform/resolvers/joi";
import { FormProvider, useForm } from "react-hook-form";
import useSubscription from "../hooks/useSubscription";
import useAlert, { AlertProvider } from "../hooks/useAlert";

type SubscriptionForm = {
  email: string;
};

const subscriptionFormSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

const SubscriptionForm = () => {
  const [isSending, setIsSending] = useState(false);
  const alert: AlertProvider = useAlert();
  const { subscribe } = useSubscription();

  const methods = useForm<SubscriptionForm>({
    resolver: joiResolver(subscriptionFormSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = ({ email }) => {
    setIsSending(true);
    subscribe((success: boolean) => {
      setIsSending(false);
      if (success) {
        methods.reset();
        alert.success("Congrats! Your have been successfully subscribed!");
      } else {
        alert.error("Error trying to subscribe you. Please try again.");
      }

      if (success) methods.reset();
    }, email);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="shadow max-w-2xl p-5 rounded-lg border separator bg-brand-light bg-opacity-5 dark:bg-brand-dark dark:bg-opacity-20">
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
            isLoading={isSending}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default SubscriptionForm;
