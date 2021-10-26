import React, { useState } from "react";
import FormInputWithButton from "./FormInputWithButton";
import Joi from "joi";
import useMessage from "../hooks/useMessage";
import { joiResolver } from "@hookform/resolvers/joi";
import { FormProvider, useForm } from "react-hook-form";
import useAlert, { AlertProvider } from "../hooks/useAlert";

type QuickMessageForm = {
  message: string;
};

const messageFormSchema = Joi.object({
  message: Joi.string().min(5).max(500).required(),
});

const QuickMessageFrom = () => {
  const [isSending, setIsSending] = useState(false);
  const { sendMessage } = useMessage();
  const alert: AlertProvider = useAlert();

  const methods = useForm<QuickMessageForm>({
    resolver: joiResolver(messageFormSchema),
    defaultValues: { message: "" },
  });

  const onSubmit = ({ message }) => {
    setIsSending(true);
    sendMessage((success: boolean) => {
      setIsSending(false);
      if (success) {
        methods.reset();
        alert.success("Your message has been sent.");
      } else {
        alert.error("Error occurred sending your message. Please try again.");
      }
    }, message);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="shadow max-w-2xl p-5 rounded-lg border separator">
          <h2 className="text-xl">For Your Quick thoughts ...</h2>
          <FormInputWithButton
            inputName="message"
            inputPlaceholder="Your Message"
            btnLabel="Send"
            className="mt-3"
            isLoading={isSending}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default QuickMessageFrom;
