import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../common/components/FormErrorMessage";
import SocialMediaLinks from "../common/components/SocialMediaLinks";
import Page from "../common/layouts/Page";

type ContactForm = {
  email: string;
  message: string;
};

const contactFormSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  message: Joi.string().min(10).max(1000).required(),
});

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: joiResolver(contactFormSchema),
  });

  const onSubmit = ({ email, message }: ContactForm) => {
    console.log(email, message);
  };

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
          <form onSubmit={handleSubmit(onSubmit)} name="contactForm">
            <div className="mb-6">
              <label
                htmlFor="email"
                className={"form-label" + (loading ? " text-gray-400" : "")}
              >
                email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  disabled={loading}
                  autoComplete="off"
                  {...register("email")}
                  className={
                    "form-input w-full" + (errors.email ? " error-ring" : "")
                  }
                />
                {errors.email ? (
                  <div className="mt-3">
                    <FormErrorMessage
                      message={errors.email.message.replace(/['"]+/g, "")}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className={"form-label" + (loading ? " text-gray-400" : "")}
              >
                Message
              </label>
              <div className="mt-1">
                <textarea
                  form="contactForm"
                  id="message"
                  placeholder="Your Message"
                  {...register("message")}
                  className={
                    "w-full text-sm border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 focus:border-brand focus:border-opacity-25 focus:ring-brand focus:ring-opacity-50" +
                    (errors.message ? " error-ring" : "")
                  }
                  rows={10}
                ></textarea>
                {errors.message ? (
                  <div className="mt-3">
                    <FormErrorMessage
                      message={errors.message.message.replace(/['"]+/g, "")}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-end items-center">
              <div className="w-full max-w-[200px]">
                <button type="submit" className="w-full primary-btn">
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default ContactPage;
