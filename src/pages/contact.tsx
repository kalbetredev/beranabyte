import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormErrorMessage from "../common/components/FormErrorMessage";
import MarkdownFormEditor from "../common/components/MarkdownEditor";
import SocialMediaLinks from "../common/components/SocialMediaLinks";
import useAlert, { AlertProvider } from "../common/hooks/useAlert";
import useMessage from "../common/hooks/useMessage";
import Page from "../common/layouts/Page";
import SpinnerIcon from "../icons/SpinnerIcon";

type ContactForm = {
  email: string;
  markdown: string;
};

const contactFormSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  markdown: Joi.string().min(10).max(1000).required(),
});

const ContactPage = () => {
  const [isSending, setIsSending] = useState(false);
  const alert: AlertProvider = useAlert();

  const { sendMessage } = useMessage();

  const methods = useForm<ContactForm>({
    resolver: joiResolver(contactFormSchema),
    defaultValues: { email: "", markdown: "" },
  });

  const onSubmit = ({ email, markdown }: ContactForm) => {
    setIsSending(true);
    sendMessage(
      (success: boolean) => {
        setIsSending(false);
        if (success) {
          methods.reset();
          alert.success("Your message has been sent.");
        } else {
          alert.error("Error occurred sending your message. Please try again.");
        }
      },
      markdown,
      email
    );
  };

  return (
    <Page>
      <div className="w-full mt-20 mb-8">
        <h1 className="w-full text-3xl font-medium">
          Contact <span className="text-brand">Kalkidan</span>
        </h1>
        <h2 className="mt-5">Use Social Media</h2>
        <div className="flex mt-3 mb-10 pb-6 border-b separator">
          <SocialMediaLinks />
        </div>
        <h2 className="mt-5">You Can Also Leave a message</h2>
        <div className="mt-5">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} name="contactForm">
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className={"form-label" + (isSending ? " text-gray-400" : "")}
                >
                  email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    disabled={isSending}
                    autoComplete="off"
                    {...methods.register("email")}
                    className={
                      "form-input w-full" +
                      (methods.formState.errors.email ? " error-ring" : "")
                    }
                  />
                  {methods.formState.errors.email ? (
                    <div className="mt-3">
                      <FormErrorMessage
                        message={methods.formState.errors.email.message.replace(
                          /['"]+/g,
                          ""
                        )}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className={"form-label" + (isSending ? " text-gray-400" : "")}
                >
                  Message
                </label>
                <div className="mt-1">
                  <MarkdownFormEditor
                    placeholder="Your Comment ...."
                    fromName="commentForm"
                    disabled={isSending}
                  />
                </div>
              </div>
              <div className="flex justify-end items-center">
                <button
                  type="submit"
                  className={
                    "w-32 h-8 mb-1 flex justify-center items-center py-0 my-0 " +
                    (isSending ? "disabled-btn" : "primary-btn")
                  }
                  disabled={isSending}
                >
                  {isSending ? (
                    <div className="m-1 w-4 h-4">
                      <SpinnerIcon />
                    </div>
                  ) : null}
                  Send
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </Page>
  );
};

export default ContactPage;
